import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails, DataDAFAppDetails, DataDAFAppTypes, ZipAppOption } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-apps-list',
  templateUrl: './data-apps-list.component.html',
  styleUrls: ['./data-apps-list.component.scss'],
})
export class DataAppsListComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('applications')
  public Applications: DataAppDetails[];

  public get ApplicationPaths(): string[] {
    return this.Applications ? this.Applications.map(app => app.PathGroup) : [];
  }

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Output('daf-app-saved')
  public DAFAppSaved: EventEmitter<DataDAFAppDetails>;

  @Input('fixed-applications')
  public FixedApplications: DataAppDetails[];

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
  constructor() {
    this.DAFAppSaved = new EventEmitter<DataDAFAppDetails>();

    this.SettingsClicked = new EventEmitter<DataAppDetails>();

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.SettingsClicked.emit(appDetails);
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
}
