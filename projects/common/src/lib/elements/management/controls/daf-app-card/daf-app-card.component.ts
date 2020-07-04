import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
} from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-daf-app-card',
  templateUrl: './daf-app-card.component.html',
  styleUrls: ['./daf-app-card.component.scss'],
})
export class DafAppCardComponent implements OnInit {
  //  Properties
  @Input('daf-application')
  public DAFApplication: DataDAFAppDetails;

  public get DAFApplicationIcon(): string {
    let icon = '';

    switch (this.DAFApplication.DAFAppType) {
      case DataDAFAppTypes.API:
        icon = 'api';
        break;

      case DataDAFAppTypes.DAFAppPointer:
        icon = 'gps_fixed';
        break;

      case DataDAFAppTypes.Redirect:
        icon = 'sync';
        break;

      case DataDAFAppTypes.View:
        icon = 'widgets';
        break;
    }

    return icon;
  }

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  public DataDAFAppTypes = DataDAFAppTypes;

  @Input('is-blocked')
  public IsBlocked: boolean;

  @Input('is-edit')
  public IsEdit: boolean;

  @Input('is-expanded')
  public IsExpanded: boolean;

  public get LaunchPath(): string {
    let launchPath = null;

    switch (this.DAFApplication.DAFAppType) {
      case DataDAFAppTypes.DAFAppPointer:
      case DataDAFAppTypes.Redirect:
      case DataDAFAppTypes.View:
        launchPath = this.DAFApplication.Path;
        break;
    }

    return launchPath;
  }

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

  public DAFAppSettingsCanceled() {
    this.DAFSettingsClicked.emit(null);
  }

  //  Helpers
}
