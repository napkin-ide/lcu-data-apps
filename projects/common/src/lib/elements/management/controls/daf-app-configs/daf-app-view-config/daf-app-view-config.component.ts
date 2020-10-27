import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DAFViewApplicationDetails } from '@lcu/common';
import { ZipAppOption } from '../../../../../state/data-apps-management.state';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { NPMService } from '../../../../../core/npm.service';

@Component({
  selector: 'lcu-daf-app-view-config',
  templateUrl: './daf-app-view-config.component.html',
  styleUrls: ['./daf-app-view-config.component.scss'],
})
export class DafAppViewConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: any } {
    return {
      Package: {
        Name: this.FormGroup.controls.npmPkg.value,
        Version: this.FormGroup.controls.pkgVer.value,
      },
      StateConfig: JSON.parse(this.FormGroup.controls.stateCfg.value),
    };
  }

  @Input('details')
  public Details: DAFViewApplicationDetails;

  @Input('form-group')
  public FormGroup: FormGroup;

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  public NPMPackageVersions: string[];

  //  Constructors
  constructor(protected npm: NPMService) {
    this.Details = {};
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('stateCfg');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'stateCfg',
      new FormControl(JSON.stringify(!this.Details ? {} : this.Details.StateConfig || {}), [])
    );
  }

  //  API Methods

  //  Helpers
}
