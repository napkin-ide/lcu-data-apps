import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
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
  @Input('app-root-base')
  public AppRootBase: string;

  @Input('app-paths')
  public ApplicationPaths: string[];

  @Output('canceled')
  public Canceled: EventEmitter<{}>;

  @ViewChild(DafAppConfigsComponent)
  public DafAppConfigs: DafAppConfigsComponent;

  public CreateDataAppFormGroup: FormGroup;

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  public DataDAFAppTypes = DataDAFAppTypes;

  @Output('saved')
  public Saved: EventEmitter<DataDAFAppDetails>;

  public get SelectedDAFAppType(): DataDAFAppTypes {
    return this.CreateDataAppFormGroup.controls.dataAppType.value;
  }

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

    const toSave = {
      Configs: this.DafAppConfigs.Configs,
      DAFAppType: this.CreateDataAppFormGroup.controls.dafAppType.value,
      Description: this.CreateDataAppFormGroup.controls.desc.value,
      Name: this.CreateDataAppFormGroup.controls.name.value,
      Path: this.CreateDataAppFormGroup.controls.path.value
    } as DataDAFAppDetails;

    this.Saved.emit(toSave);
  }

  //  Helpers
}
