import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LcuDataAppsModule } from '@napkin-ide/lcu-data-apps-common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LcuDataAppsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
