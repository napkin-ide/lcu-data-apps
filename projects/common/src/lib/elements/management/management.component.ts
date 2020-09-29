import {
  Component,
  OnInit,
  Injector,
  DoBootstrap,
  ViewChild,
  ComponentFactoryResolver,
  ComponentRef,
  ComponentFactory,
  ViewContainerRef,
  Inject,
  ElementRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LCUElementContext, LcuElementComponent } from '@lcu/common';
import { GenericModalService } from './../../services/generic-modal.service';
import { GenericModalModel } from './../../models/generic-modal-model';
import { SettingsComponent } from './../modals/settings/settings.component';
import {
  DataAppsManagementState,
  DataAppDetails,
  DataDAFAppDetails,
  DataDAFAppDelete,
  DataDAFAppTypes,
} from './../../state/data-apps-management.state';
import { DataAppsManagementStateContext } from './../../state/data-apps-management-state.context';

import { DataAppViewComponent } from './controls/data-app-view/data-app-view.component';

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

  /**
   * Access the component passed into the modal
   */
  @ViewChild('modalContent', { read: ViewContainerRef })
  public vcRef: ViewContainerRef;

  @ViewChild(SettingsComponent)
  public settingsComp: SettingsComponent;

  protected componentRef: ComponentRef<any>;

  public get ActiveApp(): DataAppDetails {
    return this.State.ActiveAppPathGroup
      ? this.State.Applications.find(
          (app) => app.PathGroup === this.State.ActiveAppPathGroup
        )
      : null;
  }

  public get ActiveFixedApp(): DataAppDetails {
    return this.State.ActiveAppPathGroup
      ? this.State.FixedApplications.find(
          (app) => app.PathGroup === this.State.ActiveAppPathGroup
        )
      : null;
  }

  public get SupportedDAFAppTypes(): DataDAFAppTypes[] {
    if (this.ActiveFixedApp != null) {
      const activeAppType = this.State.DAFApplications[0].DAFAppType;

      if (
        activeAppType === DataDAFAppTypes.API ||
        activeAppType === DataDAFAppTypes.LCU
      ) {
        return [activeAppType];
      }
    }

    if (this.ActiveApp != null) {
      return [DataDAFAppTypes.View, DataDAFAppTypes.Redirect];
    }

    return [
      DataDAFAppTypes.View,
      DataDAFAppTypes.Redirect,
      DataDAFAppTypes.API,
      DataDAFAppTypes.LCU,
    ];
  }

  public get ApplicationPaths(): string[] {
    return this.State.Applications
      ? this.State.Applications.map((app) => app.PathGroup)
      : [];
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
    protected genericModalService: GenericModalService,
    protected resolver: ComponentFactoryResolver
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
   * Delete DAF Application
   *
   */
  public DAFAppDeleteClick(dafAppDelete: DataDAFAppDelete) {
    if (
      confirm(`Are you sure you want to delete ${dafAppDelete.DisplayName}?`)
    ) {
      this.State.Loading = true;

      this.dataAppsCtxt.DeleteDataDAFApp(
        dafAppDelete.ApplicationID,
        dafAppDelete.Lookups
      );
    }
    // this.configureModal();
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
    let el: ElementRef;
    const ksdfe: DataAppViewComponent = new DataAppViewComponent(el);
    const modalCompFactory: ComponentFactory<DataAppViewComponent> = this.resolver.resolveComponentFactory(
      DataAppViewComponent
    );

    this.componentRef = this.vcRef.createComponent<DataAppViewComponent>(
      modalCompFactory
    );
    ksdfe.ActiveDAFApplicationID = this.State.ActiveDAFAppID;
    ksdfe.Application = this.ActiveApp;
    ksdfe.ApplicationPaths = this.ApplicationPaths;
    ksdfe.CurrentApplicationTab = this.State.CurrentApplicationTab;
    ksdfe.DAFAppOptions = this.State.DAFAppOptions;
    ksdfe.DAFApplications = this.State.DAFApplications;
    ksdfe.Loading = this.State.Loading;

    debugger;
    setTimeout(() => {
      const modalConfig: GenericModalModel = new GenericModalModel({
        ModalType: 'data', // type of modal we want (data, confirm, info)
        CallbackAction: this.confirmCallback, // function exposed to the modal
        Component: ksdfe, // set component to be used inside the modal
        LabelCancel: 'Cancel',
        LabelAction: 'OK',
        Title: 'Settings',
        Width: '100%',
      });

      /**
       * Pass modal config to service open function
       */
      this.genericModalService.Open(modalConfig);

      this.genericModalService.ModalComponent.afterOpened().subscribe(
        (res: any) => {
          this.State.Loading = false;
          console.log('MODAL OPEN', res);
        }
      );

      this.genericModalService.ModalComponent.afterClosed().subscribe(
        (res: any) => {
          console.log('MODAL CLOSED', res);
        }
      );

      this.genericModalService.OnAction().subscribe((res: any) => {
        console.log('ONAction', res);
      });
    }, 1000);
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
