import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import {
  DAFViewApplicationDetails,
  DAFLCUApplicationDetails,
  DAFApplicationPackageTypes,
} from "@lcu/common";
import { ZipAppOption } from "../../../../../state/data-apps-management.state";
import { debounceTime, switchMap, map } from "rxjs/operators";
import { NPMService } from "../../../../../core/npm.service";
import { exception } from "console";

@Component({
  selector: "lcu-daf-app-view-config",
  templateUrl: "./daf-app-view-config.component.html",
  styleUrls: ["./daf-app-view-config.component.scss"],
})
export class DafAppViewConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: any } {
    return {
      Lookup: this.IncludeLookup
        ? this.FormGroup.controls.lcuLookup.value
        : undefined,
      Package: this.buildPackage(),
      PackageType: this.SelectedDAFAppPackageType,
      StateConfig: JSON.parse(this.FormGroup.controls.stateCfg.value),
    };
  }

  @Input("details")
  public Details: DAFViewApplicationDetails | DAFLCUApplicationDetails;

  @Input("form-group")
  public FormGroup: FormGroup;

  @Input("include-lookup")
  public IncludeLookup: boolean;

  public NPMPackages: { Name: string; NPMLink: string; Version: string }[];

  public NPMPackageVersions: string[];

  public DAFApplicationPackageTypes = DAFApplicationPackageTypes;

  public get SelectedDAFAppPackageType(): DAFApplicationPackageTypes {
    return this.FormGroup.controls.pkgType
      ? this.FormGroup.controls.pkgType.value
      : this.Details.PackageType;
  }

  @Output("upload-zip-files")
  public UploadZipFiles: EventEmitter<FileList>;

  @Input("zip-app-options")
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor(protected npm: NPMService) {
    this.Details = {};

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl("pkgType");

    this.FormGroup.removeControl("stateCfg");

    if (this.IncludeLookup) {
      this.FormGroup.removeControl("lcuLookup");
    }
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      "pkgType",
      new FormControl(!this.Details ? {} : this.Details.PackageType || "", [])
    );

    this.FormGroup.addControl(
      "stateCfg",
      new FormControl(
        JSON.stringify(!this.Details ? {} : this.Details.StateConfig || {}),
        []
      )
    );

    if (this.IncludeLookup) {
      const lcuDets = <DAFLCUApplicationDetails>this.Details;

      this.FormGroup.addControl(
        "lcuLookup",
        new FormControl(!lcuDets ? "" : lcuDets.Lookup || "", [
          Validators.required,
        ])
      );
    }
  }

  //  API Methods
  public UploadZips(files: FileList) {
    this.UploadZipFiles.emit(files);
  }

  //  Helpers
  protected buildPackage() {
    if (this.SelectedDAFAppPackageType === DAFApplicationPackageTypes.Git) {
    } else if (
      this.SelectedDAFAppPackageType === DAFApplicationPackageTypes.NPM
    ) {
      return {
        Name: this.FormGroup.controls.npmPkg.value,
        Version: this.FormGroup.controls.pkgVer.value,
      };
    } else if (
      this.SelectedDAFAppPackageType === DAFApplicationPackageTypes.Zip
    ) {
      return {
        ZipFile: this.FormGroup.controls.zipFile.value,
      };
    }
  }
}
