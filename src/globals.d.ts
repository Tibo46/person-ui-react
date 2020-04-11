import { IClientConfig } from './utils/clientConfig';

declare global {
  // tslint:disable:interface-name
  interface Window {
    ENV_DATA: Readonly<IClientConfig>;
  }
}
