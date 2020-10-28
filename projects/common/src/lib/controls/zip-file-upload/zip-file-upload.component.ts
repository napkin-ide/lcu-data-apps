import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ZipAppOption } from '../../state/data-apps-management.state';

@Component({
  selector: 'lcu-zip-file-upload',
  templateUrl: './zip-file-upload.component.html',
  styleUrls: ['./zip-file-upload.component.scss'],
})
export class ZipFileUploadComponent implements OnInit {
  //  Fields

  //  Properties
  public get Config(): { [key: string]: any } {
    return {
      Package: {
        ZipFile: this.FormGroup.controls.zipFile.value,
      },
      StateConfig: JSON.parse(this.FormGroup.controls.stateCfg.value),
    };
  }

  @Input('zip-file')
  public ZipFile: string;

  @Input('form-group')
  public FormGroup: FormGroup;

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor() {
    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('zipFile');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'zipFile',
      new FormControl(this.ZipFile || '', [
        Validators.required,
      ])
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
