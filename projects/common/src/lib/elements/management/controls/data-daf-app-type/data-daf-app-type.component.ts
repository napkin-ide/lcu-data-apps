import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataDAFAppTypes } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-daf-app-type',
  templateUrl: './data-daf-app-type.component.html',
  styleUrls: ['./data-daf-app-type.component.scss'],
})
export class DataDafAppTypeComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('data-daf-app-type')
  public DataDafAppType: DataDAFAppTypes;

  @Input('data-daf-app-type-options')
  public DataDafAppTypeOptions: DataDAFAppTypes[];

  public DataDAFAppTypes = DataDAFAppTypes;

  @Input('form-group')
  public FormGroup: FormGroup;

  public OptionDisplayNames: {};

  //  Constructors
  constructor() {
    this.OptionDisplayNames = {};
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('dataAppType');
  }

  public ngOnInit(): void {
    this.OptionDisplayNames[DataDAFAppTypes.API] = 'API';

    this.OptionDisplayNames[DataDAFAppTypes.DAFAppPointer] =
      'Application Pointer';

    this.OptionDisplayNames[DataDAFAppTypes.Redirect] = 'Redirect';

    this.OptionDisplayNames[DataDAFAppTypes.View] = 'View';

    this.OptionDisplayNames[DataDAFAppTypes.LCU] = 'Low Code Unit';

    this.FormGroup.addControl(
      'dataAppType',
      new FormControl(this.DataDafAppType, [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
