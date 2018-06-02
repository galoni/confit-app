import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AngularFireModule } from 'angularfire2';
import * as firebase from 'firebase';
// import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppDropdownDirective } from './directives/app-dropdown.directive';
import { NewConfService } from "./services/newConf.service";
import { myConfService } from "./services/myConf.service";
import { RegToConfService } from "./services/regToConf.service";
import { ManageQRCodeService } from "./services/manageQRCode.service";
import { ManagerService } from './services/manager.service';
import {LandingService } from './services/landing.service';
// import { MessagingService } from './messaging.service';
import { UserAuthService } from './services/user-auth.service';
import { UserAuthGuardService } from './services/user-auth-guard.service';


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
import { MyConfComponent } from './my-conf/my-conf.component';
import { MyConfPathComponent } from './my-conf-path/my-conf-path.component';
import { MyConfLectureComponent } from './my-conf-lecture/my-conf-lecture.component';
import { MyConfVisitorComponent } from './my-conf-visitor/my-conf-visitor.component';
import { NewConfProgramComponent } from './new-conf-program/new-conf-program.component';
import { ShowConfComponent } from './show-conf/show-conf.component';
import { NewConfProgramShowComponent } from './new-conf-program-show/new-conf-program-show.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ManageQrCodeComponent } from './manage-qr-code/manage-qr-code.component';
import { PieChartDataComponent } from './pie-chart-data/pie-chart-data.component';
import { ManageQrCodeDetailsComponent } from './manage-qr-code-details/manage-qr-code-details.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { MaterialModule } from './material';
import { RegisterConfTopicsComponent } from './register-conf-topics/register-conf-topics.component';
import { RegisterConfMatchingComponent } from './register-conf-matching/register-conf-matching.component';
import { EditConfSessionComponent } from './edit-conf-session/edit-conf-session.component';
import { MatchingPageComponent } from './matching-page/matching-page.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UsersComponent } from './users/users.component';
import { ConfStatsComponent } from './conf-stats/conf-stats.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {AlertService} from './services/alert.service';
import {VisitorService} from './services/visitor.service';
import { ManageNotificationsComponent } from './manage-notifications/manage-notifications.component';
// firebase.initializeApp(firebaseConfig);
// console.log("this is initialized "+ firebaseConfig);



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
    ScanQRCodeDetailsComponent,
    MyConfComponent,
    MyConfPathComponent,
    MyConfLectureComponent,
    MyConfVisitorComponent,
    NewConfProgramComponent,
    ShowConfComponent,
    NewConfProgramShowComponent,
    ManageQrCodeComponent,
    PieChartDataComponent,
    ManageQrCodeDetailsComponent,
    ManagerDashboardComponent,
    RegisterConfTopicsComponent,
    RegisterConfMatchingComponent,
    EditConfSessionComponent,
    MatchingPageComponent,
    // ManageNotificationsComponent,
    SignupComponent,
    SigninComponent,
    UsersComponent,
    ConfStatsComponent,
    WelcomePageComponent,
    ManageNotificationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgQrScannerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    CommonModule,
    ChartsModule,
    MaterialModule,
    // AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTooltipModule
  ],
  exports: [
    MaterialModule
  ],
  entryComponents: [
    ShowConfComponent,
    NewConfSessionsComponent,
    EditConfSessionComponent,
    NewConfProgramComponent,
    ConfStatsComponent
  ],
  providers: [
    NewConfService,
    RegToConfService,
    myConfService,
    ManageQRCodeService,
    ManagerService,
    VisitorService,
    LandingService,
    // MessagingService,
    UserAuthService,
    AlertService,
    UserAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
