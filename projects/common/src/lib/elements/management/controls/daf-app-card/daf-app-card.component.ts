import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DAFApplicationConfig } from '@lcu/common';

@Component({
  selector: 'lcu-daf-app-card',
  templateUrl: './daf-app-card.component.html',
  styleUrls: ['./daf-app-card.component.scss']
})
export class DafAppCardComponent implements OnInit {
  //  Properties
  @Input('daf-application')
  public DAFApplication: DAFApplicationConfig;

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DAFApplicationConfig>;

  //  Constructors
  constructor() {
    this.DAFSettingsClicked = new EventEmitter<DAFApplicationConfig>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public DAFAppSettingsClick() {
    this.DAFSettingsClicked.emit(this.DAFApplication);
  }

  //  Helpers
}
