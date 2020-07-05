import { NgModule } from '@angular/core';
// import {
//   MatButtonModule,
//   MatListModule,
//   MatToolbarModule,
//   MatProgressSpinnerModule,
//   MatProgressBarModule,
//   MatSidenavModule,
//   MatIconModule,
//   MatCardModule,
//   MatFormFieldModule,
//   MatInputModule,
//   MatChipsModule,
//   MatTabsModule,
//   MatExpansionModule,
//   MatAutocompleteModule,
//   MatTooltipModule
// } from '@angular/material';
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
  ],
entryComponents: [DataAppsConfigManagerElementComponent, LcuDataAppsManagementElementComponent]
})
export class LcuDataAppsModule {}
