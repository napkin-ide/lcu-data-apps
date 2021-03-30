import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DAFRedirectApplicationDetails } from '@lcu/common';

@Component({
  selector: 'lcu-daf-app-redirect-config',
  templateUrl: './daf-app-redirect-config.component.html',
  styleUrls: ['./daf-app-redirect-config.component.scss'],
})
export class DafAppRedirectConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: any } {
    return {
      Permanent: this.FormGroup.controls.permanent.value,
      PreserveMethod: this.FormGroup.controls.preserveMethod.value,
      Redirect: this.FormGroup.controls.redirect.value,
    };
  }

  @Input('details')
  public Details: DAFRedirectApplicationDetails;

  @Input('form-group')
  public FormGroup: FormGroup;

  public get RedirectType(): string {
    if (this.Config.Permanent && this.Config.PreserveMethod) {
      return '308';
    } else if (this.Config.Permanent && !this.Config.PreserveMethod) {
      return '301';
    } else if (!this.Config.Permanent && this.Config.PreserveMethod) {
      return '307';
    } else if (!this.Config.Permanent && !this.Config.PreserveMethod) {
      return '302';
    }
  }

  //  Constructors
  constructor() {
    this.Details = {};
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('permanent');

    this.FormGroup.removeControl('preserveMethod');

    this.FormGroup.removeControl('redirect');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'permanent',
      new FormControl(!this.Details ? '' : this.Details.Permanent, [
        Validators.required,
      ])
    );

    this.FormGroup.addControl(
      'preserveMethod',
      new FormControl(!this.Details ? '' : this.Details.PreserveMethod, [
        Validators.required,
      ])
    );

    this.FormGroup.addControl(
      'redirect',
      new FormControl(!this.Details ? '' : this.Details.Redirect, [
        Validators.required,
      ])
    );
  }

  //  API Methods

  //  Helpers
}
