import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-data-app-config',
  templateUrl: './data-app-config.component.html',
  styleUrls: ['./data-app-config.component.scss'],
})
export class DataAppConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor() {}

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('name');

    this.FormGroup.removeControl('desc');

    this.FormGroup.removeControl('path');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'name',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'desc',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'path',
      new FormControl('', [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
