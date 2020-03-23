import { Application, DAFViewApplicationConfig } from '@lcu/common';

export class ConfigManagerState {
  public ActiveApp: Application;

  public ActiveDAFApp: DAFApplicationConfig;

  public ActiveDAFAPIs: DAFAPIApplicationConfig[];

  public ActiveHost: string;

  public AddingApp: boolean;

  public Applications: Application[];

  public AppType: DAFAppTypes;

  public HostOptions: string[];

  public Loading?: boolean;
}

export enum DAFAppTypes {
  View = 'View',
  API = 'API',
  Redirect = 'Redirect'
}

export enum AddNewTypes {
  None = 'None',
  App = 'App'
}
