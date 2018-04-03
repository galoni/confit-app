import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppDropdownDirective } from './directives/app-dropdown.directive';
import { NewConfService } from "./services/newConf.service";


import { NewConfComponent } from './new-conf/new-conf.component';
import { HeaderManagerComponent } from './header-manager/header-manager.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavManagerComponent } from './nav-manager/nav-manager.component';
import { NewConfLecturesComponent } from './new-conf-lectures/new-conf-lectures.component';
import { NewConfSessionsComponent } from './new-conf-sessions/new-conf-sessions.component';
import { NewConfDetailsComponent } from './new-conf-details/new-conf-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NewConfComponent,
    HeaderManagerComponent,
    AlertsComponent,
    AppDropdownDirective,
    LandingPageComponent,
    NavManagerComponent,
    NewConfLecturesComponent,
    NewConfSessionsComponent,
    NewConfDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    NewConfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
