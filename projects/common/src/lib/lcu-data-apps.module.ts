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

@NgModule({
  declarations: [
    DataAppsConfigManagerElementComponent,
    LcuDataAppsManagementElementComponent,
    DafAppCardComponent,
    DataAppCardComponent,
    DataAppViewComponent,
    DataAppsListComponent,
    DataAppStatiComponent,
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
  ],
entryComponents: [DataAppsConfigManagerElementComponent, LcuDataAppsManagementElementComponent]
})
export class LcuDataAppsModule {}
