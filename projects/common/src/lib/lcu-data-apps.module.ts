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
import { DafAppCardComponent } from './elements/data-apps-management/controls/daf-app-card/daf-app-card.component';
import { DataAppCardComponent } from './elements/data-apps-management/controls/data-app-card/data-app-card.component';
import { DataAppViewComponent } from './elements/data-apps-management/controls/data-app-view/data-app-view.component';
import { DataAppsListComponent } from './elements/data-apps-management/controls/data-apps-list/data-apps-list.component';

@NgModule({
  declarations: [
    DataAppsConfigManagerElementComponent,
    DafAppCardComponent,
    DataAppCardComponent,
    DataAppViewComponent,
    DataAppsListComponent,
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
    DafAppCardComponent,
    DataAppCardComponent,
    DataAppViewComponent,
    DataAppsListComponent,
  ],
  entryComponents: [DataAppsConfigManagerElementComponent],
})
export class LcuDataAppsModule {}
