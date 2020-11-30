import { Application, Status, Icon } from '@lcu/common';

export class DataAppsManagementState {
  public AccessRightOptions: string[];

  public ActiveAppPathGroup: string;

  public ActiveDAFAppID: string;

  public Applications: DataAppDetails[];

  public CurrentApplicationTab: number;

  public DAFApplications: DataDAFAppDetails[];

  public DAFAppOptions: { [key: string]: string };

  public FixedApplications: DataAppDetails[];

  public GlobalAppSettings: GlobalApplicationSettings;

  public Loading?: boolean;

  public SupportedDAFAppTypes: DataDAFAppTypes[];

  public ZipAppOptions?: ZipAppOption[];

  public ZipLoading?: boolean;
}

export class DataAppDetails {
  public AppIDs: { [appId: string]: string };

  public AppStati: DataDAFAppStatus[];

  public Description: string;

  public DisplayName: string;

  public IsReadOnly: boolean;

  public PathGroup: string;
}

export class DataAppSecurityDetails {
  public AccessRights?: string[];

  public IsPrivate?: boolean;

  public Licenses?: string[];
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

  public Security: DataAppSecurityDetails;
}

export class DataDAFAppStatus extends Status {
  public AppCount: number;

  public Icon: Icon;

  public Name: string;
}

export class DataDAFAppDelete {
  public ApplicationID: string;

  public DisplayName: string;

  public Lookups: string[];
}

export class GlobalApplicationSettings {
  [key: string]: string;
}

export class ZipAppOption {
  public Data: string;

  public DisplayName: string;

  public File: string;
}

export enum DataDAFAppTypes {
  View = 'View',
  API = 'API',
  Redirect = 'Redirect',
  DAFAppPointer = 'DAFAppPointer',
  LCU = 'LCU',
}
