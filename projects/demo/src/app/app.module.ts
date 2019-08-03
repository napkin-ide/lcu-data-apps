import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LcuDataAppsModule, NPMService } from '@napkin-ide/lcu-data-apps-common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { FathymSharedModule, LCUServiceSettings } from '@lcu-ide/common';

@NgModule({
  declarations: [AppComponent],
  imports: [FathymSharedModule.forRoot(), BrowserModule, BrowserAnimationsModule, LcuDataAppsModule],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment)
    },
    NPMService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
