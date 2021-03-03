import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DAFRedirectApplicationDetails } from '@lcu/common';

@Component({
  selector: 'lcu-daf-app-redirect-config',
  templateUrl: './daf-app-redirect-config.component.html',
  styleUrls: ['./daf-app-redirect-config.component.scss']
})
export class DafAppRedirectConfigComponent implements  OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: any } {
    debugger;
    return {
      Redirect: this.FormGroup.controls.redirect.value
    };
  }

  @Input('details')
  public Details: DAFRedirectApplicationDetails;

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor() {
    this.Details = {};
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('redirect');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'redirect',
      new FormControl(!this.Details ? '' : this.Details.Redirect, [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
