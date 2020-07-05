import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';
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

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  public IsCreating: boolean;

  @Input('loading')
  public Loading: boolean;

  //  Constructors
  constructor(protected el: ElementRef) {
    this.ApplicationTabClicked = new EventEmitter<number>();

    this.BackClicked = new EventEmitter<DataAppDetails>();

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

  public DAFAppSettingsClick(dafApp: DataDAFAppDetails) {
    this.DAFSettingsClicked.emit(dafApp);
  }

  public IsActiveDAFApplication(dafAppId: string) {
    return this.ActiveDAFApplicationID === dafAppId;
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
