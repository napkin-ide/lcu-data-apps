import { Component, OnInit, Injector, ViewChild, SimpleChanges } from '@angular/core';
import { LcuElementComponent, LCUElementContext, Application } from '@lcu-ide/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfigManagerStateManagerContext } from './../../../core/config-manager-state-manager.context';
import { ConfigManagerState } from './../../../core/config-manager-state.model';
import { MatDrawer, MatAutocompleteSelectedEvent } from '@angular/material';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NPMService } from '../../../core/npm.service';

export class DataAppsConfigManagerElementState {}

export class DataAppsConfigManagerContext extends LCUElementContext<DataAppsConfigManagerElementState> {}

export const SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT = 'lcu-data-apps-config-manager-element';

@Component({
  selector: SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  templateUrl: './config-manager-element.component.html',
  styleUrls: ['./config-manager-element.component.scss']
})
export class DataAppsConfigManagerElementComponent extends LcuElementComponent<DataAppsConfigManagerContext> implements OnInit {
  //  Fields
  protected initialized: boolean;

  //  Properties
  public DAFViewAppFormGroup: FormGroup;

  @ViewChild(MatDrawer)
  public Drawer: MatDrawer;

  public get MainLoading(): boolean {
    return this.State.Loading && (!this.State.Applications || this.State.Applications.length === 0) && !this.State.AddingApp;
  }

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  public SaveDataAppFormGroup: FormGroup;

  public get ShowContainer(): boolean {
    return !this.State.Loading || (this.State.Applications && this.State.Applications.length > 0);
  }

  public State: ConfigManagerState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected formBldr: FormBuilder,
    protected state: ConfigManagerStateManagerContext,
    protected npm: NPMService
  ) {
    super(injector);
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.SaveDataAppFormGroup = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      path: ['', Validators.required]
    });

    this.DAFViewAppFormGroup = this.formBldr.group({
      npmPkg: ['', Validators.required],
      pkgVer: ['', Validators.required]
    });

    this.DAFViewAppFormGroup.controls.npmPkg.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => this.npm.Search(value.toString())),
        map(val =>
          val.Model.Items.map(i => {
            return {
              Name: i.package.name,
              Version: i.package.version,
              NPMLink: i.package.links.npm
            };
          })
        )
      )
      .subscribe(packages => {
        this.NPMPackages = packages;
      });

    this.state.Context.subscribe(state => {
      this.State = state;

      this.handleStateChanged();
    });
  }

  //  API Methods
  public PackageSelected(event: MatAutocompleteSelectedEvent) {
    const pkg = this.NPMPackages.find(p => p.Name === event.option.value);

    if (!this.DAFViewAppFormGroup.controls.pkgVer.value) {
      this.DAFViewAppFormGroup.controls.pkgVer.setValue(pkg.Version);
    }
  }

  public SaveAppView() {
    this.State.Loading = true;

    this.state.SaveAppView({
      ...this.State.ActiveView,
      NPMPackage: this.DAFViewAppFormGroup.controls.npmPkg.value,
      PackageVersion: this.DAFViewAppFormGroup.controls.pkgVer.value
    });
  }

  public SaveDataApp(isPrivate: boolean) {
    this.State.Loading = true;

    const app = <Application>{
      Name: this.SaveDataAppFormGroup.controls.name.value,
      Description: this.SaveDataAppFormGroup.controls.desc.value,
      PathRegex: this.SaveDataAppFormGroup.controls.path.value,
      IsPrivate: isPrivate
    };

    this.state.SaveDataApp(app);
  }

  public SetActiveApp(app: Application) {
    this.State.Loading = true;

    this.state.SetActiveApp(app);
  }

  public ToggleAddingApp() {
    this.State.Loading = true;

    this.state.ToggleAddingApp();
  }

  //  Helpers
  protected handleStateChanged() {
    if (!this.initialized && this.Drawer) {
      this.Drawer.open();

      this.initialized = true;
    }

    if (this.SaveDataAppFormGroup) {
      if (this.State.ActiveApp) {
        this.SaveDataAppFormGroup.controls.name.setValue(this.State.ActiveApp.Name);

        this.SaveDataAppFormGroup.controls.path.setValue(this.State.ActiveApp.PathRegex);

        this.SaveDataAppFormGroup.controls.desc.setValue(this.State.ActiveApp.Description);
      } else {
        this.SaveDataAppFormGroup.reset();
      }
    }

    if (this.DAFViewAppFormGroup) {
      if (this.State.ActiveView) {
        this.DAFViewAppFormGroup.controls.npmPkg.setValue(this.State.ActiveView.NPMPackage);

        this.DAFViewAppFormGroup.controls.pkgVer.setValue(this.State.ActiveView.PackageVersion);
      } else {
        this.SaveDataAppFormGroup.reset();
      }
    }
  }
}
