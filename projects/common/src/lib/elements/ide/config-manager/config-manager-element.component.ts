import { Component, OnInit, Injector, ViewChild, SimpleChanges } from '@angular/core';
import { LcuElementComponent, LCUElementContext, Application } from '@lcu-ide/common';
import { ConfigManagerStateManagerContext } from './../../../core/config-manager-state-manager.context';
import { ConfigManagerState } from './../../../core/config-manager-state.model';
import { MatDrawer } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export class DataAppsConfigManagerElementState {}

export class DataAppsConfigManagerContext extends LCUElementContext<DataAppsConfigManagerElementState> {}

export const SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT = 'lcu-data-apps-config-manager-element';

@Component({
  selector: SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  templateUrl: './config-manager-element.component.html',
  styleUrls: ['./config-manager-element.component.scss']
})
export class DataAppsConfigManagerElementComponent extends LcuElementComponent<DataAppsConfigManagerContext> implements OnInit {
  //  Properties
  @ViewChild(MatDrawer)
  public Drawer: MatDrawer;

  public get MainLoading(): boolean {
    return this.State.Loading && (!this.State.Applications || this.State.Applications.length === 0) && !this.State.AddingApp;
  }

  public SaveDataAppFormGroup: FormGroup;

  public get ShowContainer(): boolean {
    return !this.State.Loading || (this.State.Applications && this.State.Applications.length > 0);
  }

  public State: ConfigManagerState;

  //  Constructors
  constructor(protected injector: Injector, protected formBldr: FormBuilder, protected state: ConfigManagerStateManagerContext) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.state.Context.subscribe(state => {
      this.State = state;

      if (this.Drawer) {
        this.Drawer.open();
      }
    });

    this.SaveDataAppFormGroup = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      path: ['', Validators.required]
    });
  }

  //  API Methods
  public SaveDataApp(visibility: string) {
    this.State.Loading = true;

    const app = <Application>{
      Name: this.SaveDataAppFormGroup.controls.name.value,
      Description: this.SaveDataAppFormGroup.controls.desc.value,
      PathRegex: this.SaveDataAppFormGroup.controls.path.value
    };

    this.state.SaveDataApp(visibility, app);
  }

  public SetActiveApp(app: Application) {
    this.State.Loading = true;

    this.state.SetActiveApp(app);
  }

  public ToggleAddingApp() {
    this.State.Loading = true;

    this.state.ToggleAddingApp();
  }
}
