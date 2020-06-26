import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { DataAppsManagementState } from './../../state/data-apps-management.state';
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

  //  Helpers
  protected handleStateChanged() {
    console.log('State: ', this.State);
  }
}
