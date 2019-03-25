import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAppsConfigManagerElementComponent } from './elements/ide/config-manager/config-manager-element.component';

@NgModule({
  declarations: [DataAppsConfigManagerElementComponent],
  imports: [CommonModule],
  exports: [DataAppsConfigManagerElementComponent],
  entryComponents: [DataAppsConfigManagerElementComponent]
})
export class LcuDataAppsModule {}
