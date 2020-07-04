import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataDAFAppDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-daf-app-card',
  templateUrl: './daf-app-card.component.html',
  styleUrls: ['./daf-app-card.component.scss']
})
export class DafAppCardComponent implements OnInit {
  //  Properties
  @Input('daf-application')
  public DAFApplication: DataDAFAppDetails;

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  //  Constructors
  constructor() {
    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public DAFAppSettingsClick() {
    this.DAFSettingsClicked.emit(this.DAFApplication);
  }

  //  Helpers
}
