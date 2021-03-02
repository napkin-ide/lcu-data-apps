import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {
  LcuDataAppsModule,
  NPMService,
} from "@napkin-ide/lcu-data-apps-common";
import { AppHostModule } from "@lowcodeunit/app-host-common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { FathymSharedModule, LCUServiceSettings } from "@lcu/common";
import { MonacoEditorModule, NgxMonacoEditorConfig } from "ngx-monaco-editor";

const monacoConfig: NgxMonacoEditorConfig = {
  // baseUrl: './assets/monaco', // configure base path for monaco editor default: './assets'
  defaultOptions: { scrollBeyondLastLine: false }, // pass default options to be used
  // onMonacoLoad: () => {
  //   console.log((<any>window).monaco);
  // }, // here monaco object will be available as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    FathymSharedModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    LcuDataAppsModule,
    AppHostModule.forRoot(),
    MonacoEditorModule.forRoot(monacoConfig),
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
    NPMService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
