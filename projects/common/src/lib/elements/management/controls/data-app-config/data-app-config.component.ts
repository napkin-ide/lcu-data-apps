import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { DataDAFAppTypes } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-config',
  templateUrl: './data-app-config.component.html',
  styleUrls: ['./data-app-config.component.scss'],
})
export class DataAppConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  @Input('app-paths')
  public ApplicationPaths: string[];

  @Input('data-daf-app-type')
  public DataDafAppType: DataDAFAppTypes;

  @Input('description')
  public Description: string;

  @Input('form-group')
  public FormGroup: FormGroup;

  @Input('hide-priority')
  public HidePriority: boolean;

  @Input('name')
  public Name: string;

  @Input('path')
  public Path: string;

  @Input('path-root')
  public PathRoot: string;

  @Input('priority')
  public Priority: string;

  public get SelectedDAFAppType(): DataDAFAppTypes {
    return this.FormGroup.controls.dataAppType.value;
  }

  @Input('supported-daf-app-types')
  public SupportedDAFAppTypes: DataDAFAppTypes[];

  //  Constructors
  constructor() {
    this.PathRoot = '/';
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('name');

    this.FormGroup.removeControl('desc');

    this.FormGroup.removeControl('path');

    this.FormGroup.removeControl('priority');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'name',
      new FormControl(this.Name, [Validators.required])
    );

    this.FormGroup.addControl(
      'desc',
      new FormControl(this.Description, [Validators.required])
    );

    this.FormGroup.addControl('path', new FormControl(this.Path, []));

    this.FormGroup.addControl('priority', new FormControl(this.Priority || 0, []));
  }

  //  API Methods

  //  Helpers
}
