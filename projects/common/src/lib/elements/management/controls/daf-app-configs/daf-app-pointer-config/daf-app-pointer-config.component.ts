import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lcu-daf-app-pointer-config',
  templateUrl: './daf-app-pointer-config.component.html',
  styleUrls: ['./daf-app-pointer-config.component.scss'],
})
export class DafAppPointerConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: string } {
    return {
      DAFApplicationID: this.FormGroup.controls.dafAppId.value,
      DAFApplicationRoot: this.FormGroup.controls.dafAppRoot.value
    };
  }

  /**
   * The ID of the DAF Application Pointer already selected
   */
  @Input('daf-app-id')
  public DAFAppID: string;

  /**
   * The root path of the DAF Application to use for the pointer.
   */
  @Input('daf-app-root')
  public DAFAppRoot: string;

  public get DAFAppOptionKeys(): string[] {
    return this.DAFAppOptions ? Object.keys(this.DAFAppOptions) : [];
  }

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Input('daf-app-root-base')
  public DAFAppRootBase: string;

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor() {
    this.DAFAppRootBase = '/';
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('dafAppId');

    this.FormGroup.removeControl('dafAppRoot');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'dafAppId',
      new FormControl(this.DAFAppID, [Validators.required])
    );

    this.FormGroup.addControl(
      'dafAppRoot',
      new FormControl(this.DAFAppRoot, [])
    );
  }

  //  API Methods

  //  Helpers
}
