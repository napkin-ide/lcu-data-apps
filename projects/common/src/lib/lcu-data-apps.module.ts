import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FathymSharedModule } from '@lcu-ide/common';
import { DataAppsConfigManagerElementComponent } from './elements/ide/config-manager/config-manager-element.component';

@NgModule({
  declarations: [DataAppsConfigManagerElementComponent],
  imports: [
    FathymSharedModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [DataAppsConfigManagerElementComponent],
  entryComponents: [DataAppsConfigManagerElementComponent]
})
export class LcuDataAppsModule {}
