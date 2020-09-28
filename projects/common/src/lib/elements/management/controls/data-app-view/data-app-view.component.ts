import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DataAppDetails, DataDAFAppDelete } from '../../../../state/data-apps-management.state';
import { DataDAFAppDetails } from '../../../../state/data-apps-management.state';

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

  public IsCreating: boolean;

  @Input('loading')
  public Loading: boolean;

  //  Constructors
  constructor(protected el: ElementRef) {
    this.ApplicationTabClicked = new EventEmitter<number>();

    this.BackClicked = new EventEmitter<DataAppDetails>();

    this.DAFAppSaved = new EventEmitter<DataDAFAppDetails>();

    this.DAFDeleteClicked = new EventEmitter<DataDAFAppDelete>();

    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();
  }

  //  Life Cycle
  public ngAfterViewInit(): void {
    this.handleActiveDafAppVisibility();
  }

  public ngOnInit(): void {}

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
            block: 'center'
          });
        }
      }
    }, 0);
  }
}
