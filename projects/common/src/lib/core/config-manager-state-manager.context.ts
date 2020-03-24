import { Injectable, Injector } from '@angular/core';
import { StateManagerContext, Application, DAFViewApplicationConfig } from '@lcu/common';
import { ConfigManagerState } from './config-manager-state.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerStateManagerContext extends StateContext<ConfigManagerState> {
  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  API Methods
  public SaveDAFApp(dafApp: DAFApplicationConfig) {
    this.Execute({
      Arguments: {
        DAFApp: dafApp
      },
      Type: 'SaveDAFApp'
    });
  }

  public SaveDataApp(app: Application) {
    this.Execute({
      Arguments: {
        App: app
      },
      Type: 'SaveDataApp'
    });
  }

  public SetActiveApp(app: Application) {
    this.Execute({
      Arguments: {
        App: app
      },
      Type: 'SetActiveApp'
    });
  }

  public SetActiveDAFAPIApp(dafApiAppId: string) {
    this.Execute({
      Arguments: {
        DAFAPIAppID: dafApiAppId
      },
      Type: 'SetActiveDAFAPIApp'
    });
  }

  public SetViewType(appType: DAFAppTypes) {
    this.Execute({
      Arguments: {
        AppType: appType
      },
      Type: 'SetViewType'
    });
  }

  public ToggleAddingApp() {
    this.Execute({
      Arguments: {},
      Type: 'ToggleAddingApp'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <ConfigManagerState>{ Loading: true };
  }

  protected loadStateKey() {
    return 'main';
  }

  protected loadStateName() {
    return 'applicationmanagement';
  }
}
