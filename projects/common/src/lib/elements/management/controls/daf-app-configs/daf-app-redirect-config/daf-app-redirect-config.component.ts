import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-daf-app-redirect-config',
  templateUrl: './daf-app-redirect-config.component.html',
  styleUrls: ['./daf-app-redirect-config.component.scss']
})
export class DafAppRedirectConfigComponent implements  OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: string } {
    return {
      Redirect: this.FormGroup.controls.redirect.value
    };
  }

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor() {
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('redirect');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'redirect',
      new FormControl('', [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
