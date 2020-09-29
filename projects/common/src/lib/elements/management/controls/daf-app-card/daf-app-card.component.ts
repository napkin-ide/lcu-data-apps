import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  DataDAFAppDelete,
  DataDAFAppDetails,
  DataDAFAppTypes,
} from '../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DafAppConfigsComponent } from '../daf-app-configs/daf-app-configs.component';
import { debug } from 'console';

@Component({
  selector: 'lcu-daf-app-card',
  templateUrl: './daf-app-card.component.html',
  styleUrls: ['./daf-app-card.component.scss'],
})
export class DafAppCardComponent implements OnInit {
  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('app-paths')
  public ApplicationPaths: string[];

  @ViewChild(DafAppConfigsComponent)
  public DAFAppConfigs: DafAppConfigsComponent;

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
      Redirect: {
        Redirect: this.DAFApplication.Configs[''].Redirect,
      },
      View: {
        NPMPackage: this.DAFApplication.Configs[''].NPMPackage,
        PackageVersion: this.DAFApplication.Configs[''].PackageVersion,
      },
    };
  }

  @Output('delete')
  public DAFDeleteClicked: EventEmitter<DataDAFAppDelete>;

  @Output('settings')
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

  @Output('saved')
  public Saved: EventEmitter<DataDAFAppDetails>;

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.DAFDeleteClicked = new EventEmitter<DataDAFAppDelete>();

    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();

    this.Saved = new EventEmitter<DataDAFAppDetails>();
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
        path = '';
      } else {
        path = (
          this.DAFApplication.Path.substring(this.PathGroup.length) + '/'
        ).replace('//', '/');
      }
    }

    if (path.startsWith('/')) {
      path = path.substring(1);
    }

    return path;
  }

  public DAFAppDeleteClick() {
    const lookups = Object.keys(this.DAFApplication.Configs);

    this.DAFDeleteClicked.emit({
      ApplicationID: this.DAFApplication.ID,
      DisplayName: this.DAFApplication.Name,
      Lookups: lookups,
    });
  }

  public DAFAppSettingsClick() {
    this.DAFSettingsClicked.emit(this.DAFApplication);
  }

  public DAFAppSettingsCanceled() {
    this.DAFSettingsClicked.emit(null);
  }

  public Save() {
    const toSave = {
      ID: this.DAFApplication.ID,
      Configs: this.DAFAppConfigs.Configs,
      DAFAppType: this.DAFApplication.DAFAppType,
      Description: this.EditDataAppFormGroup.controls.desc.value,
      Name: this.EditDataAppFormGroup.controls.name.value,
      Path: `${this.PathGroup}/${this.EditDataAppFormGroup.controls.path.value}`,
      Security: {
        AccessRights: this.EditDataAppFormGroup.controls.accRights.value,
        IsPrivate: this.EditDataAppFormGroup.controls.isPrivate.value || false,
        Licenses: this.EditDataAppFormGroup.controls.licenses.value,
      },
    } as DataDAFAppDetails;

    this.Saved.emit(toSave);
  }

  //  Helpers
}
