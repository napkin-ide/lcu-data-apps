import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DAFLCUApplicationDetails } from '@lcu/common';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NPMService } from '../../../../../core/npm.service';

@Component({
  selector: 'lcu-daf-app-lcu-config',
  templateUrl: './daf-app-lcu-config.component.html',
  styleUrls: ['./daf-app-lcu-config.component.scss'],
})
export class DafAppLCUConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  @Input('details')
  public Details: DAFLCUApplicationDetails;

  @Input('form-group')
  public FormGroup: FormGroup;

  //  Constructors
  constructor() {
    this.Details = {};
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('lcuLookup');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'lcuLookup',
      new FormControl(!this.Details ? '' : this.Details.Lookup || '', [Validators.required])
    );
  }

  //  API Methods

  //  Helpers
}
