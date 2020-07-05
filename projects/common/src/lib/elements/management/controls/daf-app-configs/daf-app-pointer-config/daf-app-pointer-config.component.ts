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
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'dafAppRoot',
      new FormControl('', [])
    );
  }

  //  API Methods

  //  Helpers
}
