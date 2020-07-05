import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
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
  @Input('form-group')
  public FormGroup: FormGroup;

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  //  Constructors
  constructor(protected npm: NPMService) {}

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('npmPkg');

    this.FormGroup.removeControl('pkgVer');

    this.FormGroup.removeControl('stateCfg');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'npmPkg',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'pkgVer',
      new FormControl('', [Validators.required])
    );

    this.FormGroup.addControl(
      'stateCfg',
      new FormControl('{}', [])
    );

    this.FormGroup.controls.npmPkg.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value) => this.npm.Search(value ? value.toString() : '')),
        map((val) => {
          return val.Model
            ? val.Model.Items.map((i) => {
                return {
                  Name: i.package.name,
                  Version: i.package.version,
                  NPMLink: i.package.links.npm,
                };
              })
            : [];
        })
      )
      .subscribe((packages) => {
        this.NPMPackages = packages;
      });
  }

  //  API Methods
  public PackageSelected(event: MatAutocompleteSelectedEvent) {
    const pkg = this.NPMPackages.find((p) => p.Name === event.option.value);

    if (!this.FormGroup.controls.pkgVer.value) {
      this.FormGroup.controls.pkgVer.setValue(pkg.Version);
    }
  }

  //  Helpers
}
