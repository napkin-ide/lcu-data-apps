import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZipAppOption } from '../../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-daf-app-view-zip-config',
  templateUrl: './daf-app-view-zip-config.component.html',
  styleUrls: ['./daf-app-view-zip-config.component.scss'],
})
export class DafAppViewZipConfigComponent implements OnDestroy, OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: string } {
    return {
      ZipFile: this.FormGroup.controls.zipFile.value,
      StateConfig: JSON.parse(this.FormGroup.controls.stateCfg.value),
    };
  }

  @Input('details')
  public Details: any; // DAFViewZipApplicationDetails;

  @Input('form-group')
  public FormGroup: FormGroup;

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor() {
    this.Details = {};

    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('zipFile');

    this.FormGroup.removeControl('stateCfg');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'zipFile',
      new FormControl(!this.Details ? {} : this.Details.ZipFile || '', [Validators.required])
    );

    this.FormGroup.addControl(
      'stateCfg',
      new FormControl(
        JSON.stringify(!this.Details ? {} : this.Details.StateConfig || {}),
        []
      )
    );
  }

  //  API Methods
  public OnFileChange(event: any) {
    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.onload = () => {
    //     reader.readAsDataURL(file);
    //     console.log(`Reader result: ${reader.result}`);
    //   this.FormGroup.patchValue({
    //     zipFile: reader.result,
    //   });
    //   this.cd.markForCheck();
    // }
    // }
  }

  public OnFileDrop(event: DragEvent) {
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      this.UploadZipFiles.emit(event.dataTransfer.files);
    }
  }

  //  Helpers
}
