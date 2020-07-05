import { Component, OnInit, OnDestroy, Input, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-daf-app-api-config',
  templateUrl: './daf-app-api-config.component.html',
  styleUrls: ['./daf-app-api-config.component.scss']
})
export class DafAppApiConfigComponent implements  OnDestroy, OnInit {
  //  Fields

  //  Properties
  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor(protected appRef: ApplicationRef) {
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('apiRoot');

    this.FormGroup.removeControl('inboundPath');

    this.FormGroup.removeControl('methods');

    this.FormGroup.removeControl('security');

    this.FormGroup.removeControl('lookup');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'apiRoot',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'inboundPath',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'methods',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'security',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'lookup',
      new FormControl('', [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
