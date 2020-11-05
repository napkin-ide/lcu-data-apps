import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  DataAppDetails,
  DataDAFAppDelete,
  DataDAFAppDetails,
  DataDAFAppTypes,
  ZipAppOption,
} from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-view',
  templateUrl: './data-app-view.component.html',
  styleUrls: ['./data-app-view.component.scss'],
})
export class DataAppViewComponent implements AfterViewInit, OnInit {
  //  Fields
  protected activeDafAppId: string;

  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('active-daf-application')
  public get ActiveDAFApplicationID(): string {
    return this.activeDafAppId;
  }

  public set ActiveDAFApplicationID(activeDafAppId: string) {
    this.activeDafAppId = activeDafAppId;

    this.handleActiveDafAppVisibility();
  }

  @Input('application')
  public Application: DataAppDetails;

  @Input('app-paths')
  public ApplicationPaths: string[];

  @Output('application-tab-click')
  public ApplicationTabClicked: EventEmitter<number>;

  public get AppRootBase(): string {
    let appRootBase = this.Application.PathGroup + '/';

    if (appRootBase === '//') {
      appRootBase = '/';
    }

    return appRootBase;
  }

  @Output('back-click')
  public BackClicked: EventEmitter<{}>;

  @Input('current-application-tab')
  public CurrentApplicationTab: number;

  @Input('daf-applications')
  public DAFApplications: DataDAFAppDetails[];

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Output('daf-app-saved')
  public DAFAppSaved: EventEmitter<DataDAFAppDetails>;

  @Output('delete')
  public DAFDeleteClicked: EventEmitter<DataDAFAppDelete>;

  @Output('settings')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  @Input('supported-daf-app-types')
  public SupportedDAFAppTypes: DataDAFAppTypes[];

  public IsCreating: boolean;

  @Input('loading')
  public Loading: boolean;

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor(protected el: ElementRef) {
    this.ApplicationTabClicked = new EventEmitter<number>();

    this.BackClicked = new EventEmitter<DataAppDetails>();

    this.DAFAppSaved = new EventEmitter<DataDAFAppDetails>();

    this.DAFDeleteClicked = new EventEmitter<DataDAFAppDelete>();

    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngAfterViewInit(): void {
    this.handleActiveDafAppVisibility();
  }

  public ngOnInit(): void {
    this.IsCreating = !this.DAFApplications || this.DAFApplications.length <= 0;
  }

  //  API Methods
  public BackClick() {
    this.BackClicked.emit(this.Application);
  }

  public DAFAppDeleteClick(dafAppDelete: DataDAFAppDelete) {
    this.DAFDeleteClicked.emit(dafAppDelete);
  }

  public DAFAppSettingsClick(dafApp: DataDAFAppDetails) {
    this.DAFSettingsClicked.emit(dafApp);
  }

  public IsActiveDAFApplication(dafAppId: string) {
    return this.ActiveDAFApplicationID === dafAppId;
  }

  public SaveDAFApp(dafApp: DataDAFAppDetails) {
    this.DAFAppSaved.emit(dafApp);
  }

  public SetApplicationTab(index: number) {
    this.ApplicationTabClicked.emit(index);
  }

  public ToggleCreatingNewApp() {
    this.IsCreating = !this.IsCreating;
  }

  public UploadZips(files: FileList) {
    this.UploadZipFiles.emit(files);
  }

  //  Helpers
  protected handleActiveDafAppVisibility() {
    setTimeout(() => {
      if (this.ActiveDAFApplicationID) {
        const el = this.el.nativeElement as HTMLElement;

        const appCfgEl = el.querySelector(
          `.application-config-${this.ActiveDAFApplicationID}`
        );

        if (appCfgEl) {
          appCfgEl.scrollIntoView({
            block: 'center',
          });
        }
      }
    }, 0);
  }
}
