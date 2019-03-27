import { Application } from '@lcu-ide/common';

export class ConfigManagerState {
  public ActiveApp: Application;

  public Applications: Application[];

  public AddingApp: boolean;

  public Loading?: boolean;

  public VisibilityFlow?: string;
}
