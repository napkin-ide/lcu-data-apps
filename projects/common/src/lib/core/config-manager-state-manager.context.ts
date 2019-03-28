import { Injectable, Injector } from '@angular/core';
import { StateManagerContext, Application } from '@lcu-ide/common';
import { ConfigManagerState } from './config-manager-state.model';

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
  public SaveDataApp(visibility: string, app: Application) {
    this.Execute({
      Arguments: {
        App: app,
        Visibility: visibility
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

  public SetVisibilityFlow(flow: string) {
    this.Execute({
      Arguments: {
        Flow: flow
      },
      Type: 'set-visibility-flow'
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
