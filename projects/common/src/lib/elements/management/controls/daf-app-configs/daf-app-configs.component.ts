import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { DafAppApiConfigComponent } from './daf-app-api-config/daf-app-api-config.component';
import { DafAppPointerConfigComponent } from './daf-app-pointer-config/daf-app-pointer-config.component';
import { DafAppRedirectConfigComponent } from './daf-app-redirect-config/daf-app-redirect-config.component';
import { DafAppViewConfigComponent } from './daf-app-view-config/daf-app-view-config.component';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
  ZipAppOption,
} from '../../../../state/data-apps-management.state';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DAFConfigService } from '../../../../core/daf-config.service';
import { DafAppViewZipConfigComponent } from './daf-app-view-zip-config/daf-app-view-zip-config.component';

@Component({
  selector: 'lcu-daf-app-configs',
  templateUrl: './daf-app-configs.component.html',
  styleUrls: ['./daf-app-configs.component.scss'],
})
export class DafAppConfigsComponent implements OnInit {
  //  Fields
  protected configs: { [key: string]: { [key: string]: string } };

  //  Properties
  @Input('configs')
  public get Configs(): { [key: string]: { [key: string]: string } } {
    switch (this.DAFAppType) {
      case DataDAFAppTypes.API:
        return this.DAFAppAPIConfig.Configs;

      case DataDAFAppTypes.DAFAppPointer:
        return { '': this.DAFAppPointerConfig.Config };

      case DataDAFAppTypes.Redirect:
        return { '': this.DAFAppRedirectConfig.Config };

      case DataDAFAppTypes.LCU:
      case DataDAFAppTypes.View:
        return { '': this.DAFAppViewConfig.Config };
    }

    return {};
  }

  public set Configs(configs: { [key: string]: { [key: string]: string } }) {
    this.configs = configs;
  }

  public get DAFConfig(): any {
    return this.dafCfgSvc.Config(this.DAFApplication);
  }

  @ViewChild(DafAppApiConfigComponent)
  public DAFAppAPIConfig: DafAppApiConfigComponent;

  @Input('daf-application')
  public DAFApplication: DataDAFAppDetails;

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @ViewChild(DafAppPointerConfigComponent)
  public DAFAppPointerConfig: DafAppPointerConfigComponent;

  @ViewChild(DafAppRedirectConfigComponent)
  public DAFAppRedirectConfig: DafAppRedirectConfigComponent;

  @Input('daf-app-root-base')
  public DAFAppRootBase: string;

  @Input('daf-app-type')
  public DAFAppType: DataDAFAppTypes;

  @ViewChild(DafAppViewConfigComponent)
  public DAFAppViewConfig: DafAppViewConfigComponent;

  @ViewChild(DafAppViewZipConfigComponent)
  public DAFAppViewZipConfig: DafAppViewZipConfigComponent;

  public DataDAFAppTypes = DataDAFAppTypes;

  @Input('form-group')
  public FormGroup: FormGroup;

  @Output('upload-zip-files')
  public UploadZipFiles: EventEmitter<FileList>;

  @Input('zip-app-options')
  public ZipAppOptions: ZipAppOption[];

  //  Constructors
  constructor(
    protected formBldr: FormBuilder,
    protected dafCfgSvc: DAFConfigService
  ) {
    this.UploadZipFiles = new EventEmitter<FileList>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public UploadZips(files: FileList) {
    this.UploadZipFiles.emit(files);
  }

  //  Helpers
}
