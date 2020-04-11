export interface IClientConfig {
  personApiOrigin: string;
}

function getEnv(key: string) {
  const value = process.env[key];

  if (typeof value !== 'string')
    throw new Error(`Couldn't find key ${key} on the environment variables.`);

  return value;
}

export default function getClientConfig(): IClientConfig {
  return {
    personApiOrigin: getEnv('REACT_APP_PERSON_API_ORIGIN'),
  };
}
