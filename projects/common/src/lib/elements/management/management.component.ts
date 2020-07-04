import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { DataAppsManagementState, DataAppDetails, DataDAFAppDetails } from './../../state/data-apps-management.state';
import { DataAppsManagementStateContext } from './../../state/data-apps-management-state.context';

export class LcuDataAppsManagementElementState {}

export class LcuDataAppsManagementContext extends LCUElementContext<
  LcuDataAppsManagementElementState
> {}

export const SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT =
  'lcu-data-apps-management-element';

@Component({
  selector: SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT,
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class LcuDataAppsManagementElementComponent
  extends LcuElementComponent<LcuDataAppsManagementContext>
  implements OnInit {
  //  Fields

  //  Properties
  public get ActiveApp(): DataAppDetails {
    return this.State.ActiveAppPathGroup ? this.State.Applications.find(app => app.PathGroup === this.State.ActiveAppPathGroup) : null;
  }

  public get Loading(): boolean {
    return this.State.Loading && !this.State.ActiveAppPathGroup;
  }

  public State: DataAppsManagementState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected dataAppsCtxt: DataAppsManagementStateContext
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.dataAppsCtxt.Context.subscribe((state: DataAppsManagementState) => {
      this.State = state;

      if (this.State) {
        this.handleStateChanged();
      }
    });
  }

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDataApp(appDetails.PathGroup);
  }

  public BackClick() {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDataApp(null);
  }

  public DAFAppSettingsClick(dafApp: DataDAFAppDetails) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDAFApp(dafApp != null ? dafApp.ID : null);
  }

  public SetApplicationTab(appTab: number) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetApplicationTab(appTab);
  }

  //  Helpers
  protected handleStateChanged() {
    console.log('State: ', this.State);
  }
}
