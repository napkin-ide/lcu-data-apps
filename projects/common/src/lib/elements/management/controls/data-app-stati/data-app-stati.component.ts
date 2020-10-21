import { Component, OnInit, Input } from '@angular/core';
import { DataDAFAppStatus } from './../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-stati',
  templateUrl: './data-app-stati.component.html',
  styleUrls: ['./data-app-stati.component.scss']
})
export class DataAppStatiComponent implements OnInit {
  //  Properties
  @Input('application-stati')
  public ApplicationStati: DataDAFAppStatus[];

  //  Constructors
  constructor() { }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public LoadAppStatusIconCSS(appStatus: DataDAFAppStatus) {
    const key = this.LoadAppStatusKey(appStatus);

    const css = {};

    css[`app-status-${key}`] = true;

    return css;
  }

  public LoadAppStatusKey(appStatus: DataDAFAppStatus) {
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

  //  Helpers
}
