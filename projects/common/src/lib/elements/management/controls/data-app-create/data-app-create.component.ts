import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataDAFAppDetails, DataDAFAppTypes } from './../../../../state/data-apps-management.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-data-app-create',
  templateUrl: './data-app-create.component.html',
  styleUrls: ['./data-app-create.component.scss'],
})
export class DataAppCreateComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('app-paths')
  public ApplicationPaths: string[];

  @Output('canceled')
  public Canceled: EventEmitter<{}>;

  public CreateDataAppFormGroup: FormGroup;

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Input('app-root-base')
  public AppRootBase: string;

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
    const toSave: DataDAFAppDetails = {
      // ...
    };

    this.Saved.emit(toSave);
  }

  //  Helpers
}
