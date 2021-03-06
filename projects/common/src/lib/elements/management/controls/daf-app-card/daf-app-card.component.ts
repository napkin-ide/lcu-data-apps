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
  ZipAppOption,
} from '../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DafAppConfigsComponent } from '../daf-app-configs/daf-app-configs.component';
import { debug } from 'console';
import { DAFConfigService } from 'projects/common/src/lib/core/daf-config.service';
import { DAFAPIApplicationDetails } from '@lcu/common';

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
        launchPath = this.DAFApplication.Path || '/';
        break;
    }

    return launchPath;
  }

  @Input('path-group')
  public PathGroup: string;

  @Output('saved')
  public Saved: EventEmitter<DataDAFAppDetails>;

  @Input('supported-daf-app-types')
  public SupportedDAFAppTypes: DataDAFAppTypes[];

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.DAFDeleteClicked = new EventEmitter<DataDAFAppDelete>();

    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();

    this.Saved = new EventEmitter<DataDAFAppDetails>();

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnInit(): void {
    this.EditDataAppFormGroup = this.formBldr.group({});
  }

  //  API Methods
  public AddAPIConfigEnvironment(
    apiConfig: DAFAPIApplicationDetails & { Lookup?: string }
  ) {
    const toSave = this.buildSaveModel();

    const lookups = Object.keys(toSave.Configs);

    if (!lookups.some((l) => l === apiConfig.Lookup)) {
      toSave.Configs[apiConfig.Lookup] = <{}>apiConfig;

      this.Saved.emit(toSave);
    }
  }

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
    const toSave = this.buildSaveModel();

    this.Saved.emit(toSave);
  }

  public UploadZips(files: FileList) {
    this.UploadZipFiles.emit(files);
  }

  //  Helpers
  protected buildSaveModel() {
    const appRootBase = this.PathGroup;

    let path =
      this.DAFApplication.DAFAppType === DataDAFAppTypes.LCU
        ? this.EditDataAppFormGroup.controls.lcuLookup.value
        : this.EditDataAppFormGroup.controls.path.value;

    if (!path) {
      path = '';
    }

    return {
      ID: this.DAFApplication.ID,
      Configs: this.DAFAppConfigs.Configs,
      DAFAppType: this.DAFApplication.DAFAppType,
      Description: this.EditDataAppFormGroup.controls.desc.value,
      Name: this.EditDataAppFormGroup.controls.name.value,
      Path: `${appRootBase}/${path}`,
      Priority: this.EditDataAppFormGroup.controls.priority.value,
      Security: {
        AccessRights: this.EditDataAppFormGroup.controls.accRights.value,
        IsPrivate: this.EditDataAppFormGroup.controls.isPrivate.value || false,
        Licenses: this.EditDataAppFormGroup.controls.licenses.value,
      },
    } as DataDAFAppDetails;
  }
}
