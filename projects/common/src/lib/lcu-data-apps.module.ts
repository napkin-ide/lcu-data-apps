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

@NgModule({
  declarations: [DataAppsConfigManagerElementComponent],
  imports: [
    FathymSharedModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule
  ],
  exports: [DataAppsConfigManagerElementComponent],
  entryComponents: [DataAppsConfigManagerElementComponent]
})
export class LcuDataAppsModule {}
