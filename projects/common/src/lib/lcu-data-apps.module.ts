import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule, MaterialModule } from '@lcu/common';
import { DataAppsConfigManagerElementComponent } from './elements/ide/config-manager/config-manager-element.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DafAppCardComponent } from './elements/management/controls/daf-app-card/daf-app-card.component';
import { DataAppCardComponent } from './elements/management/controls/data-app-card/data-app-card.component';
import { DataAppViewComponent } from './elements/management/controls/data-app-view/data-app-view.component';
import { DataAppsListComponent } from './elements/management/controls/data-apps-list/data-apps-list.component';
import { LcuDataAppsManagementElementComponent } from './elements/management/management.component';
import { DataAppStatiComponent } from './elements/management/controls/data-app-stati/data-app-stati.component';
import { DataAppCreateComponent } from './elements/management/controls/data-app-create/data-app-create.component';
import { DafAppViewConfigComponent } from './elements/management/controls/daf-app-configs/daf-app-view-config/daf-app-view-config.component';
import { DafAppApiConfigComponent } from './elements/management/controls/daf-app-configs/daf-app-api-config/daf-app-api-config.component';
import { DafAppRedirectConfigComponent } from './elements/management/controls/daf-app-configs/daf-app-redirect-config/daf-app-redirect-config.component';
import { DafAppPointerConfigComponent } from './elements/management/controls/daf-app-configs/daf-app-pointer-config/daf-app-pointer-config.component';
import { DataAppConfigComponent } from './elements/management/controls/data-app-config/data-app-config.component';
import { DafAppConfigsComponent } from './elements/management/controls/daf-app-configs/daf-app-configs.component';
import { ConfirmationComponent } from './elements/modals/confirmation/confirmation.component';
import { GenericModalComponent } from './elements/modals/generic-modal/generic-modal.component';
import { DataAppSecurityConfigsComponent } from './elements/management/controls/data-app-security-configs/data-app-security-configs.component';
import { SettingsComponent } from './elements/modals/settings/settings.component';
import { DataDafAppTypeComponent } from './elements/management/controls/data-daf-app-type/data-daf-app-type.component';
import { NpmPackageSelectComponent } from './controls/npm-package-select/npm-package-select.component';
import { DafAppCardQuickViewComponent } from './elements/management/controls/daf-app-card-quick-view/daf-app-card-quick-view.component';
import { DndDirective } from './controls/dnd.directive';
import { ZipFileUploadComponent } from './controls/zip-file-upload/zip-file-upload.component';

@NgModule({
  declarations: [
    DataAppsConfigManagerElementComponent,
    LcuDataAppsManagementElementComponent,
    DafAppCardComponent,
    DataAppCardComponent,
    DataAppViewComponent,
    DataAppsListComponent,
    DataAppStatiComponent,
    DataAppCreateComponent,
    DafAppViewConfigComponent,
    DafAppApiConfigComponent,
    DafAppRedirectConfigComponent,
    DafAppPointerConfigComponent,
    DataAppConfigComponent,
    DafAppConfigsComponent,
    ConfirmationComponent,
    GenericModalComponent,
    DataAppSecurityConfigsComponent,
    SettingsComponent,
    DataDafAppTypeComponent,
    NpmPackageSelectComponent,
    DafAppCardQuickViewComponent,
    DndDirective,
    ZipFileUploadComponent,
  ],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  exports: [
    DataAppsConfigManagerElementComponent,
    LcuDataAppsManagementElementComponent,
    DafAppCardComponent,
    DataAppCardComponent,
    DataAppViewComponent,
    DataAppsListComponent,
    DataAppStatiComponent,
    DataAppCreateComponent,
    DafAppViewConfigComponent,
    DafAppApiConfigComponent,
    DafAppRedirectConfigComponent,
    DafAppPointerConfigComponent,
    DataAppConfigComponent,
    DafAppConfigsComponent,
    ConfirmationComponent,
    GenericModalComponent,
    DataAppSecurityConfigsComponent,
    SettingsComponent,
    DataDafAppTypeComponent,
    NpmPackageSelectComponent,
    DafAppCardQuickViewComponent,
    DndDirective,
    ZipFileUploadComponent,
  ],
  entryComponents: [
    DataAppViewComponent,
    GenericModalComponent,
    DataAppsConfigManagerElementComponent,
    LcuDataAppsManagementElementComponent,
    ConfirmationComponent,
    SettingsComponent,
  ],
})
export class LcuDataAppsModule {}
