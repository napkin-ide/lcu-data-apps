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
import { LcuDataAppsDataAppsManagementElementComponent } from './elements/data-apps-management/data-apps-management.component';

@NgModule({
  declarations: [DataAppsConfigManagerElementComponent, LcuDataAppsDataAppsManagementElementComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [DataAppsConfigManagerElementComponent, LcuDataAppsDataAppsManagementElementComponent],
  entryComponents: [DataAppsConfigManagerElementComponent, LcuDataAppsDataAppsManagementElementComponent]
})
export class LcuDataAppsModule {}
