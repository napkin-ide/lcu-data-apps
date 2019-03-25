import { Component, OnInit, Injector } from '@angular/core';
import { LcuElementComponent, LCUElementContext } from '@lcu-ide/common';

export class DataAppsConfigManagerElementState {}

export class DataAppsConfigManagerContext extends LCUElementContext<DataAppsConfigManagerElementState> {}

export const SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT = 'lcu-data-apps-config-manager-element';

@Component({
  selector: SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  templateUrl: './config-manager-element.component.html',
  styleUrls: ['./config-manager-element.component.scss']
})
export class DataAppsConfigManagerElementComponent extends LcuElementComponent<DataAppsConfigManagerContext> implements OnInit {
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
}
