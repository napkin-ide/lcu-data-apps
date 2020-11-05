import { Application, DAFApplication, Status } from '@lcu/common';

export class ConfigManagerState {
  public AccessRightOptions: string[];

  public ActiveApp: Application;

  public ActiveDAFApp: DAFApplication;

  public ActiveDAFAPIs: DAFApplication[];

  public ActiveHost: string;

  public AddingApp: boolean;

  public Applications: Application[];

  public AppType: DAFAppTypes;

  public DAFAppOptions: { [key: string]: string };

  public DefaultApps: Application[];

  public DefaultAppsEnabled: Status;

  public HostOptions: string[];

  public Loading?: boolean;
}

export enum DAFAppTypes {
  View = 'View',
  API = 'API',
  Redirect = 'Redirect',
  DAFApp = 'DAFApp'
}

export enum AddNewTypes {
  None = 'None',
  App = 'App'
}
