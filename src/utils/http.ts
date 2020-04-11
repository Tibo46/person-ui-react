import * as t from 'io-ts';

export class HttpError extends Error {
  public readonly status: number;
  public readonly responseText: string;

  constructor(message: string, status: number = 500, responseText: string = '') {
    super(message);
    this.status = status;
    this.responseText = responseText;
  }
}

interface IHttpRequest {
  body?: BodyInit | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
  integrity?: string;
  keepalive?: boolean;
  method?: 'GET' | 'POST';
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
  url: string;
}

interface IPostRequest extends Omit<IHttpRequest, 'body'> {
  body?: {};
}

async function send<a>(
  type: t.Type<a, any, t.mixed>,
  { url, headers = {}, ...options }: IHttpRequest
): Promise<a> {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      'Content-Type': headers['Content-Type'] || 'application/json',
    },
  });

  if (!res.ok) {
    throw new HttpError(res.statusText, res.status, await res.clone().text());
  }

  let data;
  if (type.name !== 'void') {
    data = await res.clone().json();
  }

  return data;
}

export async function get<a>(type: t.Type<a, any, t.mixed>, request: IHttpRequest): Promise<a> {
  return send(type, {
    ...request,
    method: 'GET',
  });
}

export async function post<a>(type: t.Type<a, any, t.mixed>, request: IPostRequest): Promise<a> {
  return send(type, {
    ...request,
    body: request.body ? JSON.stringify(request.body) : undefined,
    method: 'POST',
  });
}
