import {
  Application,
  DAFAPIApplicationConfig,
  DAFApplicationConfig,
  Status,
  Icon,
} from "@lcu/common";

export class DataAppsManagementState {
  public AccessRightOptions: string[];

  public ActiveAppPath: string;

  public Applications: DataAppDetails[];

  public DAFApplications: { [appId: string]: DAFApplicationConfig[] };

  public DAFAppOptions: { [key: string]: string };

  public Loading?: boolean;
}

export class DataAppDetails {
  public AppIDs: { [appId: string]: string };

  public AppStati: DAFAppStatus[];

  public Description: string;

  public Name: string;

  public PathGroup: string;
}

export class DAFAppStatus extends Status {
  public AppCount: number;

  public Icon: Icon;

  public Name: string;
}
