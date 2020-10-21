import { Injectable, Injector } from '@angular/core';
import { StateContext, Application, DAFApplication } from '@lcu/common';
import { ConfigManagerState, DAFAppTypes } from './config-manager.state';

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
  public SaveDAFApp(dafApp: DAFApplication) {
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

  public ToggleAppAsDefault(appId: string) {
    this.Execute({
      Arguments: {
        AppID: appId
      },
      Type: 'ToggleAppAsDefault'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <ConfigManagerState>{ Loading: true };
  }

  protected loadStateKey() {
    return 'orig-apps';
  }

  protected loadStateName() {
    return 'applicationmanagement';
  }
}
