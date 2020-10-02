import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DafAppApiConfigComponent } from './daf-app-api-config/daf-app-api-config.component';
import { DafAppPointerConfigComponent } from './daf-app-pointer-config/daf-app-pointer-config.component';
import { DafAppRedirectConfigComponent } from './daf-app-redirect-config/daf-app-redirect-config.component';
import { DafAppViewConfigComponent } from './daf-app-view-config/daf-app-view-config.component';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
} from '../../../../state/data-apps-management.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DafAppLCUConfigComponent } from './daf-app-lcu-config/daf-app-lcu-config.component';

@Component({
  selector: 'lcu-daf-app-configs',
  templateUrl: './daf-app-configs.component.html',
  styleUrls: ['./daf-app-configs.component.scss'],
})
export class DafAppConfigsComponent implements OnInit {
  //  Fields
  protected configs: { [key: string]: { [key: string]: string } };

  //  Properties
  @Input('configs')
  public get Configs(): { [key: string]: { [key: string]: string } } {
    switch (this.DAFAppType) {
      case DataDAFAppTypes.API:
        return this.DAFAppAPIConfig.Configs;

      case DataDAFAppTypes.DAFAppPointer:
        return { '': this.DAFAppPointerConfig.Config };

      case DataDAFAppTypes.Redirect:
        return { '': this.DAFAppRedirectConfig.Config };

      case DataDAFAppTypes.LCU:
        return { '': this.DAFAppLCUConfig.Config };

      case DataDAFAppTypes.View:
        return { '': this.DAFAppViewConfig.Config };
    }

    return {};
  }

  public set Configs(configs: { [key: string]: { [key: string]: string } }) {
    this.configs = configs;
  }

  public get DAFConfig() {
    if (!this.DAFApplication) {
      return {};
    }

    const cfgKeys = Object.keys(this.DAFApplication.Configs);

    const apiCfgs = cfgKeys.map((configKey) => {
      return {
        APIRoot: this.DAFApplication.Configs[configKey]['APIRoot'],
        InboundPath: this.DAFApplication.Configs[configKey]['InboundPath'],
        Lookup: configKey,
        Methods: this.DAFApplication.Configs[configKey]['Methods'],
        Security: this.DAFApplication.Configs[configKey]['Security'],
      };
    });

    return {
      API: apiCfgs,
      DAFAppPointer: {
        ID: this.DAFApplication.Configs['']['DAFApplicationID'],
        Root: this.DAFApplication.Configs['']['DAFApplicationRoot'],
      },
      LCU: {
        Lookup: this.DAFApplication.Configs[''].Lookup || '',
        BaseHref: this.DAFApplication.Configs[''].BaseHref,
        NPMPackage: this.DAFApplication.Configs[''].NPMPackage,
        PackageVersion: this.DAFApplication.Configs[''].PackageVersion,
        StateConfig: this.DAFApplication.Configs[''].StateConfig,
      },
      Redirect: {
        Redirect: this.DAFApplication.Configs[''].Redirect,
      },
      View: {
        NPMPackage: this.DAFApplication.Configs[''].NPMPackage,
        PackageVersion: this.DAFApplication.Configs[''].PackageVersion,
        StateConfig: this.DAFApplication.Configs[''].StateConfig,
      },
    };
  }

  @ViewChild(DafAppApiConfigComponent)
  public DAFAppAPIConfig: DafAppApiConfigComponent;

  @Input('daf-application')
  public DAFApplication: DataDAFAppDetails;

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @ViewChild(DafAppLCUConfigComponent)
  public DAFAppLCUConfig: DafAppLCUConfigComponent;

  @ViewChild(DafAppPointerConfigComponent)
  public DAFAppPointerConfig: DafAppPointerConfigComponent;

  @ViewChild(DafAppRedirectConfigComponent)
  public DAFAppRedirectConfig: DafAppRedirectConfigComponent;

  @Input('daf-app-root-base')
  public DAFAppRootBase: string;

  @Input('daf-app-type')
  public DAFAppType: DataDAFAppTypes;

  @ViewChild(DafAppViewConfigComponent)
  public DAFAppViewConfig: DafAppViewConfigComponent;

  public DataDAFAppTypes = DataDAFAppTypes;

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor(protected formBldr: FormBuilder) {}

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods

  //  Helpers
}
