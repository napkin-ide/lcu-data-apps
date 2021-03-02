import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import {
  LcuDataAppsModule,
  DataAppsConfigManagerElementComponent,
  SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT,
  LcuDataAppsManagementElementComponent,
  SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT,
} from '@napkin-ide/lcu-data-apps-common';
import { AppHostModule } from '@lowcodeunit/app-host-common';
import { environment } from '../environments/environment';
import { FathymSharedModule, LCUServiceSettings } from '@lcu/common';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

const monacoConfig: NgxMonacoEditorConfig = {
  // baseUrl: './assets/monaco', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  // onMonacoLoad: () => {
  //   console.log((<any>window).monaco);
  // }, // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule,
    LcuDataAppsModule,
    AppHostModule.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  exports: [LcuDataAppsModule],
})
export class AppModule implements DoBootstrap {
  //  Constructors
  constructor(protected injector: Injector) {}

  //  Life Cycle
  public ngDoBootstrap() {
    const cfgMgr = createCustomElement(DataAppsConfigManagerElementComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_DATA_APPS_CONFIG_MANAGER_ELEMENT, cfgMgr);

    const dataAppsManagement = createCustomElement(
      LcuDataAppsManagementElementComponent,
      { injector: this.injector }
    );

    customElements.define(
      SELECTOR_LCU_DATA_APPS_DATA_APPS_MANAGEMENT_ELEMENT,
      dataAppsManagement
    );
  }
}
