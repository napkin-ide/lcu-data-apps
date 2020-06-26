import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  @Output('settings-click')
  public SettingsClicked: EventEmitter<DataAppDetails>;

  //  Constructors
  constructor() {
    this.SettingsClicked = new EventEmitter<DataAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public AppSettingsClick() {
    this.SettingsClicked.emit(this.Application);
  }

  //  Helpers
}
