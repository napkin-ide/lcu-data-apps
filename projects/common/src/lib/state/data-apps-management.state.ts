import {
  Application,
  DAFAPIApplicationConfig,
  DAFApplicationConfig,
  Status,
  Icon,
} from '@lcu/common';

export class DataAppsManagementState {
  public AccessRightOptions: string[];

  public ActiveAppPathGroup: string;

  public Applications: DataAppDetails[];

  public DAFApplications: DAFApplicationConfig[];

  public DAFAppOptions: { [key: string]: string };

  public Loading?: boolean;
}

export class DataAppDetails {
  public AppIDs: { [appId: string]: string };

  public AppStati: DAFAppStatus[];

  public PathGroup: string;
}

export class DataAppDAFDetails {
  public Description: string;

  public Name: string;

  public Path: string;
}

export class DAFAppStatus extends Status {
  public AppCount: number;

  public Icon: Icon;

  public Name: string;
}
