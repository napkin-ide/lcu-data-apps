import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
} from './../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DafAppRedirectConfigComponent } from './../daf-app-configs/daf-app-redirect-config/daf-app-redirect-config.component';
import { DafAppApiConfigComponent } from './../daf-app-configs/daf-app-api-config/daf-app-api-config.component';
import { DafAppPointerConfigComponent } from './../daf-app-configs/daf-app-pointer-config/daf-app-pointer-config.component';
import { DafAppViewConfigComponent } from './../daf-app-configs/daf-app-view-config/daf-app-view-config.component';
import { DafAppConfigsComponent } from './../daf-app-configs/daf-app-configs.component';

@Component({
  selector: 'lcu-data-app-create',
  templateUrl: './data-app-create.component.html',
  styleUrls: ['./data-app-create.component.scss'],
})
export class DataAppCreateComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('app-root-base')
  public AppRootBase: string;

  @Input('app-paths')
  public ApplicationPaths: string[];

  @Output('canceled')
  public Canceled: EventEmitter<{}>;

  public get ComputedAppRootBase(): string {
    switch (this.SelectedDAFAppType) {
      case DataDAFAppTypes.API:
        return '/api/';

      case DataDAFAppTypes.LCU:
        return '/_lcu/';

      default:
        return this.AppRootBase || '';
    }
  }

  @ViewChild(DafAppConfigsComponent)
  public DAFAppConfigs: DafAppConfigsComponent;

  public CreateDataAppFormGroup: FormGroup;

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  public DataDAFAppTypes = DataDAFAppTypes;

  @Output('saved')
  public Saved: EventEmitter<DataDAFAppDetails>;

  public get SelectedDAFAppType(): DataDAFAppTypes {
    return this.CreateDataAppFormGroup.controls.dataAppType.value;
  }

  @Input('supported-daf-app-types')
  public SupportedDAFAppTypes: DataDAFAppTypes[];

  //  Constructors
  constructor(protected formBldr: FormBuilder) {
    this.Canceled = new EventEmitter<{}>();

    this.Saved = new EventEmitter<DataDAFAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {
    this.CreateDataAppFormGroup = this.formBldr.group({
      dataAppType: ['', Validators.required],
      // isSecure: [''],
      // accRights: [''],
      // licenses: [''],
    });
  }

  //  API Methods
  public Cancel() {
    this.CreateDataAppFormGroup.reset();

    this.Canceled.emit({});
  }

  public Save() {
    const appRootBase = this.ComputedAppRootBase;

    const path =
      this.SelectedDAFAppType === DataDAFAppTypes.LCU
        ? this.CreateDataAppFormGroup.controls.lcuLookup.value
        : this.CreateDataAppFormGroup.controls.path.value;

    const toSave = {
      Configs: this.DAFAppConfigs.Configs,
      DAFAppType: this.CreateDataAppFormGroup.controls.dataAppType.value,
      Description: this.CreateDataAppFormGroup.controls.desc.value,
      Name: this.CreateDataAppFormGroup.controls.name.value,
      Path: `${appRootBase}${path}`,
      Priority: this.CreateDataAppFormGroup.controls.priority.value,
      Security: {
        AccessRights: this.CreateDataAppFormGroup.controls.accRights.value,
        IsPrivate:
          this.CreateDataAppFormGroup.controls.isPrivate.value || false,
        Licenses: this.CreateDataAppFormGroup.controls.licenses.value,
      },
    } as DataDAFAppDetails;

    this.Saved.emit(toSave);
  }

  //  Helpers
}
