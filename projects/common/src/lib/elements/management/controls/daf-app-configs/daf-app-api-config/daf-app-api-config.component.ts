import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ApplicationRef,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DAFAPIApplicationDetails } from '@lcu/common';

@Component({
  selector: 'lcu-daf-app-api-config',
  templateUrl: './daf-app-api-config.component.html',
  styleUrls: ['./daf-app-api-config.component.scss'],
})
export class DafAppApiConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Configs(): { [key: string]: { [key: string]: string } } {
    return {
      '': {
        APIRoot: this.FormGroup.controls.apiRoot.value,
        InboundPath: this.FormGroup.controls.inboundPath.value,
        Methods: this.FormGroup.controls.methods.value,
        Security: this.FormGroup.controls.security.value,
      },
    };
  }

  @Input('details')
  public Details: DAFAPIApplicationDetails & { Lookup?: string };

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor(protected appRef: ApplicationRef) {
    this.Details = {};
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
      new FormControl(!this.Details ? '' : this.Details.APIRoot, [Validators.required])
    );

    this.FormGroup.addControl(
      'inboundPath',
      new FormControl(!this.Details ? '' : this.Details.InboundPath, [Validators.required])
    );

    this.FormGroup.addControl(
      'methods',
      new FormControl(!this.Details ? '' : this.Details.Methods, [Validators.required])
    );

    this.FormGroup.addControl(
      'security',
      new FormControl(!this.Details ? '' : this.Details.Security, [Validators.required])
    );

    this.FormGroup.addControl(
      'lookup',
      new FormControl(!this.Details ? '' : this.Details.Lookup, [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
