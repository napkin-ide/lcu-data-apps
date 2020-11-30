import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  DataAppDetails,
  DataDAFAppDetails,
  DataDAFAppTypes,
  GlobalApplicationSettings,
  ZipAppOption,
} from '../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-data-apps-list',
  templateUrl: './data-apps-list.component.html',
  styleUrls: ['./data-apps-list.component.scss'],
})
export class DataAppsListComponent implements OnInit {
  //  Constants
  GOOGLE_ANALYTICS_MEASUREMENT_ID_KEY = 'GOOGLE-ANALYTICS-MEASUREMENT-ID';
  //  Fields

  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('applications')
  public Applications: DataAppDetails[];

  public get ApplicationPaths(): string[] {
    return this.Applications
      ? this.Applications.map((app) => app.PathGroup)
      : [];
  }

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Output('daf-app-saved')
  public DAFAppSaved: EventEmitter<DataDAFAppDetails>;

  @Input('fixed-applications')
  public FixedApplications: DataAppDetails[];

  @Input('global-app-settings')
  public GlobalAppSettings: GlobalApplicationSettings;

  public GlobalAppSettingsForm: FormGroup;

  @Output('global-app-settings-saved')
  public GlobalAppSettingsSaved: EventEmitter<GlobalApplicationSettings>;

  public IsCreating: boolean;

  @Output('settings')
  public SettingsClicked: EventEmitter<DataAppDetails>;

  @Input('supported-daf-app-types')
  public SupportedDAFAppTypes: DataDAFAppTypes[];

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.DAFAppSaved = new EventEmitter<DataDAFAppDetails>();

    this.GlobalAppSettingsSaved = new EventEmitter<GlobalApplicationSettings>();

    this.SettingsClicked = new EventEmitter<DataAppDetails>();

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnInit(): void {
    this.setupGlobalAppSettingsForm();
  }

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.SettingsClicked.emit(appDetails);
  }

  public GlobalAppSettingsSubmit() {
    const gaMId = this.GlobalAppSettingsForm.controls.gaMId.value;

    const settings = {};

    settings[this.GOOGLE_ANALYTICS_MEASUREMENT_ID_KEY] = gaMId;

    this.GlobalAppSettingsSaved.emit(settings);
  }

  public SaveDAFApp(dafApp: DataDAFAppDetails) {
    this.DAFAppSaved.emit(dafApp);
  }

  public ToggleCreatingNewApp() {
    this.IsCreating = !this.IsCreating;
  }

  public UploadZips(files: FileList) {
    this.UploadZipFiles.emit(files);
  }

  //  Helpers
  protected setupGlobalAppSettingsForm() {
    this.GlobalAppSettingsForm = this.formBldr.group({
      gaMId: [
        this.GlobalAppSettings[this.GOOGLE_ANALYTICS_MEASUREMENT_ID_KEY],
        Validators.required,
      ],
    });
  }
}
