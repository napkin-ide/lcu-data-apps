import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';
import { DAFApplicationConfig } from '@lcu/common';

@Component({
  selector: 'lcu-data-app-view',
  templateUrl: './data-app-view.component.html',
  styleUrls: ['./data-app-view.component.scss']
})
export class DataAppViewComponent implements OnInit {
  //  Properties
  @Input('application')
  public Application: DataAppDetails;

  @Input('daf-applications')
  public DAFApplications: DAFApplicationConfig[];

  @Output('back-click')
  public BackClicked: EventEmitter<{}>;

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DAFApplicationConfig>;

  //  Constructors
  constructor() {
    this.BackClicked = new EventEmitter<DataAppDetails>();

    this.DAFSettingsClicked = new EventEmitter<DAFApplicationConfig>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public BackClick() {
    this.BackClicked.emit(this.Application);
  }

  public DAFAppSettingsClick(dafApp: DAFApplicationConfig) {
    this.DAFSettingsClicked.emit(dafApp);
  }

  //  Helpers
}
