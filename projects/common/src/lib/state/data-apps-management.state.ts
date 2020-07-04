import {
  Application,
  Status,
  Icon,
} from '@lcu/common';

export class DataAppsManagementState {
  public AccessRightOptions: string[];

  public ActiveAppPathGroup: string;

  public ActiveDAFAppID: string;

  public Applications: DataAppDetails[];

  public CurrentApplicationTab: number;

  public DAFApplications: DataDAFAppDetails[];

  public DAFAppOptions: { [key: string]: string };

  public Loading?: boolean;
}

export class DataAppDetails {
  public AppIDs: { [appId: string]: string };

  public AppStati: DAFAppStatus[];

  public PathGroup: string;
}

export class DataDAFAppDetails {
  public Description: string;

  public ID: string;

  public Name: string;

  public Path: string;

  public Priority: string;
}

export class DAFAppStatus extends Status {
  public AppCount: number;

  public Icon: Icon;

  public Name: string;
}
