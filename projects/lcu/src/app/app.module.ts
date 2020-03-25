import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import {
  LcuDataAppsModule,
  DataAppsConfigManagerElementComponent,
  SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT
} from '@napkin-ide/lcu-data-apps-common';
import { environment } from '../environments/environment';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';

@NgModule({
  declarations: [],
  imports: [BrowserModule, BrowserAnimationsModule, FathymSharedModule, LcuDataAppsModule],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    },
  ],
  exports: [LcuDataAppsModule]
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const cfgMgr = createCustomElement(DataAppsConfigManagerElementComponent, { injector: this.injector });

    customElements.define(SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT, cfgMgr);
  }
}
