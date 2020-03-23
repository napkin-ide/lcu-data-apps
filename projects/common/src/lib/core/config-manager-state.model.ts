import { Application, DAFViewApplicationConfig } from '@lcu/common';

export class ConfigManagerState {
  public ActiveApp: Application;

  public ActiveView: DAFViewApplicationConfig;

  public AddingApp: boolean;

  public Applications: Application[];

  public Loading?: boolean;
}
