import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import {
  LcuElementComponent,
  LCUElementContext,
  Application,
  DAFApplicationConfig
} from '@lcu/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfigManagerStateManagerContext } from './../../../core/config-manager-state-manager.context';
import {
  ConfigManagerState,
  DAFAppTypes
} from './../../../core/config-manager-state.model';
import {
  MatDrawer,
  MatAutocompleteSelectedEvent,
  MatInput
} from '@angular/material';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NPMService } from '../../../core/npm.service';

export class DataAppsConfigManagerElementState {}

export class DataAppsConfigManagerContext extends LCUElementContext<
  DataAppsConfigManagerElementState
> {}

export const SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT =
  'lcu-data-apps-config-manager-element';

@Component({
  selector: SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  templateUrl: './config-manager-element.component.html',
  styleUrls: ['./config-manager-element.component.scss']
})
export class DataAppsConfigManagerElementComponent
  extends LcuElementComponent<DataAppsConfigManagerContext>
  implements OnInit {
  //  Fields
  protected initialized: boolean;

  //  Properties
  public DAFAppTypes = DAFAppTypes;

  public DAFAPIAppFormGroup: FormGroup;

  public DAFViewAppFormGroup: FormGroup;

  public DAFRedirectAppFormGroup: FormGroup;

  @ViewChild(MatDrawer, { static: false })
  public Drawer: MatDrawer;

  public get MainLoading(): boolean {
    return (
      this.State.Loading &&
      (!this.State.Applications || this.State.Applications.length === 0) &&
      !this.State.AddingApp
    );
  }

  public NewDataAppFormGroup: FormGroup;

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  public SaveDataAppFormGroup: FormGroup;

  public get ShowContainer(): boolean {
    return (
      !this.State.Loading ||
      (this.State.Applications && this.State.Applications.length > 0)
    );
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

    this.NewDataAppFormGroup = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      path: ['', Validators.required]
    });

    this.SaveDataAppFormGroup = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      path: ['', Validators.required]
    });

    this.DAFAPIAppFormGroup = this.formBldr.group({
      apiRoot: ['', Validators.required],
      inboundPath: ['', Validators.required],
      methods: ['', Validators.required],
      security: ['', Validators.required]
    });

    this.DAFViewAppFormGroup = this.formBldr.group({
      npmPkg: ['', Validators.required],
      pkgVer: ['', Validators.required]
    });

    this.DAFRedirectAppFormGroup = this.formBldr.group({
      redirect: ['', Validators.required]
    });

    this.DAFViewAppFormGroup.controls.npmPkg.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(value => this.npm.Search(value ? value.toString() : '')),
        map(val => {
          return val.Model
            ? val.Model.Items.map(i => {
                return {
                  Name: i.package.name,
                  Version: i.package.version,
                  NPMLink: i.package.links.npm
                };
              })
            : [];
        })
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
  public CopyAppIdToClipBoard(appId: string) {
    let selected: any = false;

    const el = document.createElement('textarea');

    el.value = appId;

    el.setAttribute('readonly', '');

    el.style.position = 'absolute';

    el.style.left = '-9999px';

    el.style.opacity = '0';

    document.body.appendChild(el);

    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0);
    }

    el.select();

    document.execCommand('copy', false);

    document.body.removeChild(el);

    if (selected) {
      document.getSelection().removeAllRanges();

      document.getSelection().addRange(selected);
    }
  }

  public NewDataApp(isPrivate: boolean) {
    this.State.Loading = true;

    const app = <Application>{
      Name: this.NewDataAppFormGroup.controls.name.value,
      Description: this.NewDataAppFormGroup.controls.desc.value,
      PathRegex: this.NewDataAppFormGroup.controls.path.value,
      IsPrivate: isPrivate
    };

    this.state.SaveDataApp(app);
  }

  public PackageSelected(event: MatAutocompleteSelectedEvent) {
    const pkg = this.NPMPackages.find(p => p.Name === event.option.value);

    if (!this.DAFViewAppFormGroup.controls.pkgVer.value) {
      this.DAFViewAppFormGroup.controls.pkgVer.setValue(pkg.Version);
    }
  }

  public SaveAppAPI() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplicationConfig>{
      ...this.State.ActiveDAFApp,
      APIRoot: this.DAFAPIAppFormGroup.controls.apiRoot.value,
      InboundPath: this.DAFAPIAppFormGroup.controls.inboundPath.value,
      Methods: this.DAFAPIAppFormGroup.controls.methods.value,
      Security: this.DAFAPIAppFormGroup.controls.security.value
    });
  }

  public SaveAppRedirect() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplicationConfig>{
      ...this.State.ActiveDAFApp,
      Redirect: this.DAFRedirectAppFormGroup.controls.redirect.value
    });
  }

  public SaveAppView() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplicationConfig>{
      ...this.State.ActiveDAFApp,
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

    if (this.State.ActiveDAFApp) {
      this.SaveAppView();
    }
  }

  public SetActiveApp(app: Application) {
    this.State.Loading = true;

    this.state.SetActiveApp(app);
  }

  public SetViewType(appType: DAFAppTypes) {
    this.State.Loading = true;

    this.state.SetViewType(appType);
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
        //  TODO: Why this isn't working?

        this.SaveDataAppFormGroup.patchValue({
          name: this.State.ActiveApp.Name,
          path: this.State.ActiveApp.PathRegex.replace('*', ''),
          desc: this.State.ActiveApp.Description || ''
        });
      } else {
        this.SaveDataAppFormGroup.reset();
      }
    }

    if (this.DAFViewAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFViewAppFormGroup.controls.npmPkg.setValue(
          this.State.ActiveDAFApp['NPMPackage']
        );

        this.DAFViewAppFormGroup.controls.pkgVer.setValue(
          this.State.ActiveDAFApp['PackageVersion']
        );
      } else {
        this.DAFViewAppFormGroup.reset();
      }
    }

    if (this.DAFRedirectAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFRedirectAppFormGroup.controls.redirect.setValue(
          this.State.ActiveDAFApp['Redirect']
        );
      } else {
        this.DAFRedirectAppFormGroup.reset();
      }
    }

    if (this.DAFAPIAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFAPIAppFormGroup.controls.apiRoot.setValue(
          this.State.ActiveDAFApp['APIRoot']
        );

        this.DAFAPIAppFormGroup.controls.inboundPath.setValue(
          this.State.ActiveDAFApp['InboundPath']
        );

        this.DAFAPIAppFormGroup.controls.methods.setValue(
          this.State.ActiveDAFApp['Methods']
        );

        this.DAFAPIAppFormGroup.controls.security.setValue(
          this.State.ActiveDAFApp['Security']
        );
      } else {
        this.DAFAPIAppFormGroup.reset();
      }
    }

    if (this.NewDataAppFormGroup) {
      this.NewDataAppFormGroup.reset();
    }
  }
}
