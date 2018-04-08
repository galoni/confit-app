import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { CommonModule } from '@angular/common';  

import { AppComponent } from './app.component';
import {RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppDropdownDirective } from './directives/app-dropdown.directive';
import { NewConfService } from "./services/newConf.service";
import { RegToConfService } from "./services/regToConf.service";


import { NewConfComponent } from './new-conf/new-conf.component';
import { HeaderManagerComponent } from './header-manager/header-manager.component';
import { AlertsComponent } from './alerts/alerts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavManagerComponent } from './nav-manager/nav-manager.component';
import { NewConfLecturesComponent } from './new-conf-lectures/new-conf-lectures.component';
import { NewConfSessionsComponent } from './new-conf-sessions/new-conf-sessions.component';
import { NewConfDetailsComponent } from './new-conf-details/new-conf-details.component';
import { VisitorLandingComponent } from './visitor-landing/visitor-landing.component';
import { SigninSelectionComponent } from './signin-selection/signin-selection.component';
import { NavVisitorComponent } from './nav-visitor/nav-visitor.component';
import { RecentConfVisitorComponent } from './recent-conf-visitor/recent-conf-visitor.component';
import { RegisterConfComponent } from './register-conf/register-conf.component';
import { RegisterConfDetailsComponent } from './register-conf-details/register-conf-details.component';
import { RegisterConfLecturesComponent } from './register-conf-lectures/register-conf-lectures.component';
import { ScanQRCodeComponent } from './scan-qr-code/scan-qr-code.component';
import { ScanQRCodeDetailsComponent } from './scan-qr-code-details/scan-qr-code-details.component';

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
    NewConfDetailsComponent,
    VisitorLandingComponent,
    SigninSelectionComponent,
    NavVisitorComponent,
    RecentConfVisitorComponent,
    RegisterConfComponent,
    RegisterConfDetailsComponent,
    RegisterConfLecturesComponent,
    ScanQRCodeComponent,
    ScanQRCodeDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgQrScannerModule,
    CommonModule
  ],
  providers: [
    NewConfService,
    RegToConfService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
