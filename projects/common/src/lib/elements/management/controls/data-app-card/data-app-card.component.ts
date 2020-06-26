import { Component, OnInit, Input } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';
import { DAFAppStatus } from './../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-card',
  templateUrl: './data-app-card.component.html',
  styleUrls: ['./data-app-card.component.scss'],
})
export class DataAppCardComponent implements OnInit {
  //  Properties
  @Input('application')
  public Application: DataAppDetails;

  //  Constructors
  constructor() {}

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public LoadAppStatusKey(appStatus: DAFAppStatus) {
    switch (appStatus.Code) {
      case 0:
        return 'success';

      case 1:
        return 'error';

      case 100:
        return 'update';

      case 101:
        return 'warning';
    }
  }

  public LoadAppStatusIconCSS(appStatus: DAFAppStatus) {
    const key = this.LoadAppStatusKey(appStatus);

    const css = {};

    css[`app-status-${key}`] = true;

    return css;
  }

  //  Helpers
}
