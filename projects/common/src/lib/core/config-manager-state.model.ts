import { Application, DAFViewApplicationConfig, DAFApplicationConfig } from '@lcu/common';

export class ConfigManagerState {
  public ActiveApp: Application;

  public ActiveDAFApp: DAFApplicationConfig;

  public AddingApp: boolean;

  public Applications: Application[];

  public AppType: DAFAppTypes;

  public Loading?: boolean;
}

export enum DAFAppTypes {
  View = 'View',
  API = 'API',
  Redirect = 'Redirect'
}
