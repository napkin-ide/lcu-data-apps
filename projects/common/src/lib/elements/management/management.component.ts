import { GenericModalService } from './../../services/generic-modal.service';
import { GenericModalModel } from './../../models/generic-modal-model';
import { SettingsComponent } from './../modals/settings/settings.component';
import { Component, OnInit, Injector, DoBootstrap, ViewChild } from '@angular/core';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { DataAppsManagementState, DataAppDetails, DataDAFAppDetails } from './../../state/data-apps-management.state';
import { DataAppsManagementStateContext } from './../../state/data-apps-management-state.context';
import { MatDialog } from '@angular/material/dialog';
import { GenericModalComponent } from '../modals/generic-modal/generic-modal.component';

export class LcuDataAppsManagementElementState {}

export class LcuDataAppsManagementContext extends LCUElementContext<
  LcuDataAppsManagementElementState
> {}

export const SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT =
  'lcu-data-apps-management-element';

@Component({
  selector: SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT,
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
})
export class LcuDataAppsManagementElementComponent
  extends LcuElementComponent<LcuDataAppsManagementContext>
  implements OnInit {
  //  Fields

  //  Properties

  @ViewChild(SettingsComponent)
    public settingsComp: SettingsComponent;

  public get ActiveApp(): DataAppDetails {
    return this.State.ActiveAppPathGroup ? this.State.Applications.find(app => app.PathGroup === this.State.ActiveAppPathGroup) : null;
  }

  public get ApplicationPaths(): string[] {
    return this.State.Applications ? this.State.Applications.map(app => app.PathGroup) : [];
  }

  public get Loading(): boolean {
    return this.State.Loading && !this.State.ActiveAppPathGroup;
  }

  public State: DataAppsManagementState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected dataAppsCtxt: DataAppsManagementStateContext,
    protected dialog: MatDialog,
    protected genericModalService: GenericModalService
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.dataAppsCtxt.Context.subscribe((state: DataAppsManagementState) => {
      this.State = state;

      if (this.State) {
        this.handleStateChanged();
      }
    });
  }

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDataApp(appDetails.PathGroup);
  }

  public BackClick() {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDataApp(null);
  }

  /**
   *
   * @param dafApp application details
   *
   * open settings
   *
   */
  public DAFAppSettingsClick(dafApp: DataDAFAppDetails) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetActiveDAFApp(dafApp != null ? dafApp.ID : null);
    // this.configureModal();
  }

  /**
   * Modal configuration
   */
  protected configureModal(): void {

    const modalConfig: GenericModalModel = new GenericModalModel(
      {
        ModalType: 'data',
        CallbackAction: this.confirmCallback,
        Component : SettingsComponent,
        LabelCancel: 'Cancel',
        LabelAction: 'OK',
        Title : 'Settings',
        Width: '100%'
      });

      this.genericModalService.Open(modalConfig);

      this.genericModalService.ModalComponent.afterOpened().subscribe((res: any) => {
        this.State.Loading = false;
        console.log('MODAL OPEN', res);
      });

      this.genericModalService.ModalComponent.afterClosed().subscribe((res: any) => {
        console.log('MODAL CLOSED', res);
      });

      this.genericModalService.OnAction().subscribe((res: any) => {
        console.log('ONAction', res);
      });
  }

  /**
   *
   * @param val value(s) being returned on confirmation action
   *
   * Callback function passed into the modal configuration
   */
  protected confirmCallback(val: any): void {
    debugger;
  }

  public SaveDAFApp(dafApp: DataDAFAppDetails) {
    this.State.Loading = true;

    this.dataAppsCtxt.SaveDataDAFApp(dafApp);
  }

  public SetApplicationTab(appTab: number) {
    this.State.Loading = true;

    this.dataAppsCtxt.SetApplicationTab(appTab);
  }

  //  Helpers
  protected handleStateChanged() {
    console.log('State: ', this.State);
  }
}
