import { Injectable, Injector } from '@angular/core';
import { StateContext, Application, DAFViewApplicationConfig, DAFApplicationConfig } from '@lcu/common';
import { DataAppsManagementState } from './data-apps-management.state';

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
  public SetActiveDataApp(appPathGroup: string) {
    this.Execute({
      Arguments: {
        AppPathGroup: appPathGroup
      },
      Type: 'SetActiveDataApp'
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
