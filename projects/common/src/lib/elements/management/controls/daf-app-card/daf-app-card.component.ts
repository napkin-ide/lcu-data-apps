import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
} from '../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'lcu-daf-app-card',
  templateUrl: './daf-app-card.component.html',
  styleUrls: ['./daf-app-card.component.scss'],
})
export class DafAppCardComponent implements OnInit {
  //  Properties
  @Input('app-paths')
  public ApplicationPaths: string[];

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

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  public get DAFConfig() {
    const cfgKeys = Object.keys(this.DAFApplication.Configs);

    const apiCfgs = cfgKeys.map(configKey => {
      return {
        APIRoot: this.DAFApplication.Configs[configKey]['APIRoot'],
        InboundPath: this.DAFApplication.Configs[configKey]['InboundPath'],
        Lookup: configKey,
        Methods: this.DAFApplication.Configs[configKey]['Methods'],
        Security: this.DAFApplication.Configs[configKey]['Security']
      };
    });

    return {
      API: apiCfgs,
      DAFAppPointer: {
        ID: this.DAFApplication.Configs['']['DAFApplicationID'],
        Root: this.DAFApplication.Configs['']['DAFApplicationRoot']
      },
      Redirect: {
        Redirect: this.DAFApplication.Configs[''].Redirect
      },
      View: {
        NPMPackage: this.DAFApplication.Configs[''].NPMPackage,
        PackageVersion: this.DAFApplication.Configs[''].PackageVersion
      }
    };
  }

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  public DataDAFAppTypes = DataDAFAppTypes;

  public EditDataAppFormGroup: FormGroup;

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

  @Input('path-group')
  public PathGroup: string;

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {
    this.EditDataAppFormGroup = this.formBldr.group({});
  }

  //  API Methods
  public CleanPath() {
    let path = this.DAFApplication.Path;

    if (this.DAFApplication.Path.startsWith(this.PathGroup)) {
      if (this.DAFApplication.Path === this.PathGroup) {
        path =  '';
      } else {
        path = (this.DAFApplication.Path.substring(this.PathGroup.length) + '/').replace('//', '/');
      }
    }

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    return path;
  }

  public DAFAppSettingsClick() {
    this.DAFSettingsClicked.emit(this.DAFApplication);
  }

  public DAFAppSettingsCanceled() {
    this.DAFSettingsClicked.emit(null);
  }

  //  Helpers
}
