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

  @Input('description')
  public Description: string;

  @Input('form-group')
  public FormGroup: FormGroup;

  @Input('name')
  public Name: string;

  @Input('path')
  public Path: string;

  @Input('path-root')
  public PathRoot: string;

  //  Constructors
  constructor() {
    this.PathRoot = '/';
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('name');

    this.FormGroup.removeControl('desc');

    this.FormGroup.removeControl('path');
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

    this.FormGroup.addControl(
      'path',
      new FormControl(this.cleanPath(), [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
  protected cleanPath() {
    if (this.Path.startsWith(this.PathRoot)) {
      return this.Path.substring(this.PathRoot.length);
    } else {
      return this.Path;
    }
  }
}
