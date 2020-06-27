import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-apps-list',
  templateUrl: './data-apps-list.component.html',
  styleUrls: ['./data-apps-list.component.scss']
})
export class DataAppsListComponent implements OnInit {
  //  Properties
  @Input('applications')
  public Applications: DataAppDetails[];

  @Output('settings-click')
  public SettingsClicked: EventEmitter<DataAppDetails>;

  //  Constructors
  constructor() {
    this.SettingsClicked = new EventEmitter<DataAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {
  }

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.SettingsClicked.emit(appDetails);
  }

  //  Helpers
}