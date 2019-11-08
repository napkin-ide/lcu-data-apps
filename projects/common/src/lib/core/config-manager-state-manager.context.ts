import { Injectable, Injector } from '@angular/core';
import { StateManagerContext, Application, DAFViewApplicationConfig, DAFApplicationConfig } from '@lcu-ide/common';
import { ConfigManagerState, DAFAppTypes } from './config-manager-state.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerStateManagerContext extends StateManagerContext<ConfigManagerState> {
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
      Type: 'save-app-view'
    });
  }

  public SaveDataApp(app: Application) {
    this.Execute({
      Arguments: {
        App: app
      },
      Type: 'save-data-app'
    });
  }

  public SetActiveApp(app: Application) {
    this.Execute({
      Arguments: {
        App: app
      },
      Type: 'set-active-app'
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
      Type: 'toggle-adding-app'
    });
  }

  //  Helpers
  protected defaultValue() {
    return <ConfigManagerState>{ Loading: true };
  }

  protected async loadStateKey() {
    return 'main';
  }

  protected async loadStateName() {
    return 'data-apps-config-manager';
  }
}
