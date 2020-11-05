import { Injectable, Injector } from '@angular/core';
import { StateContext } from '@lcu/common';
import { DataAppsManagementState, DataDAFAppDetails, ZipAppOption } from './data-apps-management.state';

@Injectable({
  providedIn: 'root'
})
export class DataAppsManagementStateContext extends StateContext<DataAppsManagementState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public DeleteDataDAFApp(appId: string, lookups: string[]) {
    this.Execute({
      Arguments: {
        ApplicationID: appId,
        Lookups: lookups
      },
      Type: 'DeleteDataDAFApp'
    });
  }

  public SaveDataDAFApp(dafApp: DataDAFAppDetails) {
    this.Execute({
      Arguments: {
        DAFApp: dafApp
      },
      Type: 'SaveDataDAFApp'
    });
  }

  public SetActiveDAFApp(dafAppId: string) {
    this.Execute({
      Arguments: {
        DAFAppID: dafAppId
      },
      Type: 'SetActiveDAFApp'
    });
  }

  public SetActiveDataApp(appPathGroup: string) {
    this.Execute({
      Arguments: {
        AppPathGroup: appPathGroup
      },
      Type: 'SetActiveDataApp'
    });
  }

  public SetApplicationTab(appTab: number) {
    this.Execute({
      Arguments: {
        ApplicationTab: appTab
      },
      Type: 'SetApplicationTab'
    });
  }

  public UploadZips(zipApps: ZipAppOption[]) {
    this.Execute({
      Arguments: {
        ZipApps: zipApps
      },
      Type: 'UploadZips'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <DataAppsManagementState>{ Loading: true };
  }

  protected loadStateKey() {
    return 'data-apps';
  }

  protected loadStateName() {
    return 'applicationmanagement';
  }
}
