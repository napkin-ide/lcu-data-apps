import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ApplicationRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { DAFAPIApplicationDetails } from '@lcu/common';

@Component({
  selector: 'lcu-daf-app-api-config',
  templateUrl: './daf-app-api-config.component.html',
  styleUrls: ['./daf-app-api-config.component.scss'],
})
export class DafAppApiConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get ActiveDetails(): DAFAPIApplicationDetails {
    return this.Details
      ? this.Details.find((d) => d.Lookup === this.ActiveDetailsLookup)
      : null;
  }

  public ActiveDetailsLookup: string;

  @Output('add-api-config')
  public AddAPIConfig: EventEmitter<DAFAPIApplicationDetails>;

  @Input('allow-add-api-config')
  public AllowAddAPIConfig: boolean;

  public get Configs(): { [key: string]: { [key: string]: any } } {
    const configs = {};

    if (this.Details) {
      this.Details.forEach((dets) => {
        configs[dets.Lookup] = dets;
      });
    }

    configs[
      this.ActiveDetailsLookup || this.FormGroup.controls.lookup.value || ''
    ] = {
      APIRoot: this.FormGroup.controls.apiRoot.value,
      InboundPath: this.FormGroup.controls.inboundPath.value,
      Lookup: this.FormGroup.controls.lookup.value,
      Methods: this.FormGroup.controls.methods.value,
      Security: this.FormGroup.controls.security.value,
    };

    return configs;
  }

  @Input('details')
  public Details: DAFAPIApplicationDetails[];

  public DetailsLookups: string[];

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor(protected appRef: ApplicationRef) {
    this.ActiveDetailsLookup = null;

    this.AddAPIConfig = new EventEmitter();

    this.AllowAddAPIConfig = true;

    this.Details = [];
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.destroyControls();
  }

  public ngOnInit(): void {
    this.setApiDetailsForm();

    this.DetailsLookups = this.Details.map((d) => d.Lookup);
  }

  //  API Methods
  public ActiveDAFAPIChanged(event: MatSelectChange) {
    if (!this.ActiveDetailsLookup || event.value !== this.ActiveDetailsLookup) {
      this.ActiveDetailsLookup = event.value;

      this.setApiDetailsForm();
    }
  }

  public AddAPIConfigEnvironment() {
    const newApiConfig = {
      ...(this.ActiveDetails || {}),
      Lookup: `${this.ActiveDetailsLookup || ''}-copy`,
    };

    this.AddAPIConfig.emit(newApiConfig);
  }

  public GetDetails(lookup: string) {
    return this.Details.find((d) => d.Lookup === lookup);
  }

  //  Helpers
  protected destroyControls() {
    if (this.FormGroup.controls.apiRoot) {
      this.FormGroup.removeControl('apiRoot');
    }

    if (this.FormGroup.controls.inboundPath) {
      this.FormGroup.removeControl('inboundPath');
    }

    if (this.FormGroup.controls.methods) {
      this.FormGroup.removeControl('methods');
    }

    if (this.FormGroup.controls.security) {
      this.FormGroup.removeControl('security');
    }

    if (this.FormGroup.controls.lookup) {
      this.FormGroup.removeControl('lookup');
    }
  }

  protected setApiDetailsForm() {
    this.destroyControls();

    if (this.Details && this.Details.length === 1) {
      this.ActiveDetailsLookup = this.Details[0].Lookup;
    }

    this.FormGroup.addControl(
      'apiRoot',
      new FormControl(!this.ActiveDetails ? '' : this.ActiveDetails.APIRoot, [
        Validators.required,
      ])
    );

    this.FormGroup.addControl(
      'inboundPath',
      new FormControl(
        !this.ActiveDetails ? '' : this.ActiveDetails.InboundPath,
        [Validators.required]
      )
    );

    this.FormGroup.addControl(
      'methods',
      new FormControl(!this.ActiveDetails ? '' : this.ActiveDetails.Methods, [
        Validators.required,
      ])
    );

    this.FormGroup.addControl(
      'security',
      new FormControl(!this.ActiveDetails ? '' : this.ActiveDetails.Security, [
        Validators.required,
      ])
    );

    this.FormGroup.addControl(
      'lookup',
      new FormControl(!this.ActiveDetails ? '' : this.ActiveDetails.Lookup, [])
    );
  }
}
