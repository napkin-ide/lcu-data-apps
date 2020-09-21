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

  public AppStati: DataDAFAppStatus[];

  public PathGroup: string;
}

export class DataDAFAppDetails {
  public AppStatus?: DataDAFAppStatus;

  public Configs?: { [key: string]: { [key: string]: string } };

  public DAFAppType?: DataDAFAppTypes;

  public Description?: string;

  public ID?: string;

  public Name?: string;

  public Path?: string;

  public Priority?: string;
}

export class DataDAFAppStatus extends Status {
  public AppCount: number;

  public Icon: Icon;

  public Name: string;
}

export enum DataDAFAppTypes {
  View = 'View',
  API = 'API',
  Redirect = 'Redirect',
  DAFAppPointer = 'DAFAppPointer'
}
