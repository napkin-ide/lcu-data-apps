import { Component, OnInit, Injector } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';

export class LcuDataAppsDataAppsManagementElementState {}

export class LcuDataAppsDataAppsManagementContext extends LCUElementContext<LcuDataAppsDataAppsManagementElementState> {}

export const SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT = 'lcu-data-apps-data-apps-management-element';

@Component({
  selector: SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT,
  templateUrl: './data-apps-management.component.html',
  styleUrls: ['./data-apps-management.component.scss']
})
export class LcuDataAppsDataAppsManagementElementComponent extends LcuElementComponent<LcuDataAppsDataAppsManagementContext> implements OnInit {
  //  Fields

  //  Properties

  //  Constructors
  constructor(protected injector: Injector) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();
  }

  //  API Methods

  //  Helpers
}
