import {
  Component,
  OnInit,
  Injector,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import {
  LcuElementComponent,
  LCUElementContext,
  Application,
  DAFApplication,
  Guid,
} from '@lcu/common';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfigManagerStateManagerContext } from '../../../state/config-manager-state.context';
import {
  ConfigManagerState,
  DAFAppTypes,
} from '../../../state/config-manager.state';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDrawer } from '@angular/material/sidenav';
import { MatInput } from '@angular/material/input';
import { MatSelectChange } from '@angular/material/select';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NPMService } from '../../../core/npm.service';

export class DataAppsConfigManagerElementState {}

export class DataAppsConfigManagerContext extends LCUElementContext<DataAppsConfigManagerElementState> {}

export const SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT =
  'lcu-data-apps-config-manager-element';

@Component({
  selector: SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  templateUrl: './config-manager-element.component.html',
  styleUrls: ['./config-manager-element.component.scss'],
})
export class DataAppsConfigManagerElementComponent
  extends LcuElementComponent<DataAppsConfigManagerContext>
  implements OnInit {
  //  Fields
  protected initialized: boolean;

  //  Properties
  public get DAFAppOptionKeys(): string[] {
    return this.State.DAFAppOptions
      ? Object.keys(this.State.DAFAppOptions)
      : [];
  }

  public DAFAppTypes = DAFAppTypes;

  public DAFAPIAppFormGroup: FormGroup;

  public DAFPointerAppFormGroup: FormGroup;

  public DAFRedirectAppFormGroup: FormGroup;

  public DAFViewAppFormGroup: FormGroup;

  @ViewChild(MatDrawer, { static: false })
  public Drawer: MatDrawer;

  public get MainLoading(): boolean {
    return (
      this.State.Loading &&
      (!this.State.Applications || this.State.Applications.length === 0) &&
      !this.State.AddingApp
    );
  }

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  public SaveDataAppFormGroup: FormGroup;

  public get ShowContainer(): boolean {
    return (
      !this.State.Loading ||
      (this.State.Applications && this.State.Applications.length > 0)
    );
  }

  public RegScripts: string;

  public StateConfig: string;

  public State: ConfigManagerState;

  //  Constructors
  constructor(
    protected injector: Injector,
    protected formBldr: FormBuilder,
    protected state: ConfigManagerStateManagerContext,
    protected npm: NPMService
  ) {
    super(injector);

    this.RegScripts = '';

    this.StateConfig = '{}';
  }

  //  Life Cycle
  public ngOnInit() {
    super.ngOnInit();

    this.SaveDataAppFormGroup = this.formBldr.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      path: ['', Validators.required],
      priority: [''],
      accRights: [''],
      licenses: [''],
    });

    this.DAFAPIAppFormGroup = this.formBldr.group({
      apiRoot: ['', Validators.required],
      inboundPath: ['', Validators.required],
      methods: ['', Validators.required],
      security: ['', Validators.required],
      lookup: [''],
    });

    this.DAFPointerAppFormGroup = this.formBldr.group({
      dafAppId: ['', Validators.required],
      dafAppRoot: [''],
    });

    this.DAFRedirectAppFormGroup = this.formBldr.group({
      redirect: ['', Validators.required],
    });

    this.DAFViewAppFormGroup = this.formBldr.group({
      npmPkg: ['', Validators.required],
      pkgVer: ['', Validators.required],
    });

    this.DAFViewAppFormGroup.controls.npmPkg.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.npm.Search(value ? value.toString() : '')),
        map((val) => {
          return val.Model
            ? val.Model.Items.map((i) => {
                return {
                  Name: i.package.name,
                  Version: i.package.version,
                  NPMLink: i.package.links.npm,
                };
              })
            : [];
        })
      )
      .subscribe((packages) => {
        this.NPMPackages = packages;
      });

    this.state.Context.subscribe((state: ConfigManagerState) => {
      this.State = state;

      this.handleStateChanged();
    });
  }

  //  API Methods
  public ActiveDAFAPIChanged(event: MatSelectChange) {
    if (
      !this.State.ActiveDAFApp ||
      event.value !== this.State.ActiveDAFApp.ID
    ) {
      this.State.Loading = true;

      this.state.SetActiveDAFAPIApp(event.value);
    }
  }

  public AddAPIConfigEnvironment() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplication>{
      APIRoot: this.State.ActiveDAFApp['APIRoot'],
      InboundPath: this.State.ActiveDAFApp['InboundPath'],
      Lookup: this.State.ActiveDAFApp['Lookup'] + '-copy',
      Methods: this.State.ActiveDAFApp['Methods'],
      Security: this.State.ActiveDAFApp['Security'],
    });
  }

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

  public IsDefaultApp(appId: string) {
    return (
      this.State.DefaultApps &&
      this.State.DefaultApps.some((da) => da.ID === appId)
    );
  }

  public PackageSelected(event: MatAutocompleteSelectedEvent) {
    const pkg = this.NPMPackages.find((p) => p.Name === event.option.value);

    if (!this.DAFViewAppFormGroup.controls.pkgVer.value) {
      this.DAFViewAppFormGroup.controls.pkgVer.setValue(pkg.Version);
    }
  }

  public SaveAppAPI() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplication>{
      ...this.State.ActiveDAFApp,
      Details: {
        APIRoot: this.DAFAPIAppFormGroup.controls.apiRoot.value,
        InboundPath: this.DAFAPIAppFormGroup.controls.inboundPath.value,
        Lookup: this.DAFAPIAppFormGroup.controls.lookup.value,
        Methods: this.DAFAPIAppFormGroup.controls.methods.value,
        Security: this.DAFAPIAppFormGroup.controls.security.value,
      },
    });
  }

  public SaveAppDAFPointer() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplication>{
      ...this.State.ActiveDAFApp,
      Details: {
        DAFApplicationID: this.DAFPointerAppFormGroup.controls.dafAppId.value,
        DAFApplicationRoot: this.DAFPointerAppFormGroup.controls.dafAppRoot
          .value,
      },
    });
  }

  public SaveAppRedirect() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplication>{
      ...this.State.ActiveDAFApp,
      Details: {
        Redirect: this.DAFRedirectAppFormGroup.controls.redirect.value,
      },
    });
  }

  public SaveAppView() {
    this.State.Loading = true;

    this.state.SaveDAFApp(<DAFApplication>{
      ...this.State.ActiveDAFApp,
      Details: {
        NPMPackage: this.DAFViewAppFormGroup.controls.npmPkg.value,
        PackageVersion: this.DAFViewAppFormGroup.controls.pkgVer.value,
        RegScripts: this.RegScripts,
        StateConfig: JSON.parse(this.StateConfig),
      },
    });
  }

  public SaveDataApp(isPrivate: boolean) {
    this.State.Loading = true;

    const app = <Application>{
      ...(this.State.ActiveApp || <Application>{}),
      Name: this.SaveDataAppFormGroup.controls.name.value,
      Description: this.SaveDataAppFormGroup.controls.desc.value,
      PathRegex: this.SaveDataAppFormGroup.controls.path.value,
      AccessRights: this.SaveDataAppFormGroup.controls.accRights.value || [],
      Licenses: this.SaveDataAppFormGroup.controls.licenses.value || [],
      Priority: this.SaveDataAppFormGroup.controls.priority.value || 0,
      IsPrivate: isPrivate,
    };

    this.state.SaveDataApp(app);

    // if (this.State.ActiveDAFApp) {
    //   this.SaveAppView();
    // }
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

  public ToggleAppAsDefault(appId: string) {
    this.State.Loading = true;

    this.state.ToggleAppAsDefault(appId);
  }

  //  Helpers
  protected handleStateChanged() {
    console.log('State: ', this.State);
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
          desc: this.State.ActiveApp.Description || '',
          accRights: this.State.ActiveApp.AccessRights || [],
          licenses: this.State.ActiveApp.Licenses || [],
          priority: this.State.ActiveApp.Priority,
        });
      } else {
        this.SaveDataAppFormGroup.reset();
      }
    }

    if (this.DAFViewAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFViewAppFormGroup.controls.npmPkg.setValue(
          this.State.ActiveDAFApp.Details['NPMPackage']
        );

        this.DAFViewAppFormGroup.controls.pkgVer.setValue(
          this.State.ActiveDAFApp.Details['PackageVersion']
        );

        this.RegScripts = this.State.ActiveDAFApp.Details['RegScripts'] || '';

        this.StateConfig = JSON.stringify(
          this.State.ActiveDAFApp.Details['StateConfig'] || {}
        );
      } else {
        this.DAFViewAppFormGroup.reset();

        this.RegScripts = '';

        this.StateConfig = '{}';
      }
    }

    if (this.DAFPointerAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFPointerAppFormGroup.controls.dafAppId.setValue(
          this.State.ActiveDAFApp.Details['DAFApplicationID']
        );

        this.DAFPointerAppFormGroup.controls.dafAppRoot.setValue(
          this.State.ActiveDAFApp.Details['DAFApplicationRoot']
        );
      } else {
        this.DAFPointerAppFormGroup.reset();
      }
    }

    if (this.DAFRedirectAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.DAFRedirectAppFormGroup.controls.redirect.setValue(
          this.State.ActiveDAFApp.Details['Redirect']
        );
      } else {
        this.DAFRedirectAppFormGroup.reset();
      }
    }

    if (this.DAFAPIAppFormGroup) {
      if (this.State.ActiveDAFApp) {
        this.setDAFAPIForm(this.State.ActiveDAFApp);
      } else {
        this.DAFAPIAppFormGroup.reset();
      }
    }
  }

  protected setDAFAPIForm(dafApp: DAFApplication) {
    this.DAFAPIAppFormGroup.controls.apiRoot.setValue(
      dafApp.Details['APIRoot']
    );

    this.DAFAPIAppFormGroup.controls.inboundPath.setValue(
      dafApp.Details['InboundPath']
    );

    this.DAFAPIAppFormGroup.controls.lookup.setValue(dafApp.Details['Lookup']);

    this.DAFAPIAppFormGroup.controls.methods.setValue(
      dafApp.Details['Methods']
    );

    this.DAFAPIAppFormGroup.controls.security.setValue(
      dafApp.Details['Security']
    );
  }
}
