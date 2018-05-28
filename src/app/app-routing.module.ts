import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuardService } from './services/user-auth-guard.service';


import { NewConfComponent } from './new-conf/new-conf.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NewConfLecturesComponent } from './new-conf-lectures/new-conf-lectures.component';
import { NewConfSessionsComponent } from './new-conf-sessions/new-conf-sessions.component';
import { NewConfDetailsComponent } from './new-conf-details/new-conf-details.component';
import { VisitorLandingComponent } from './visitor-landing/visitor-landing.component';
import { SigninSelectionComponent } from './signin-selection/signin-selection.component';
import { RecentConfVisitorComponent } from './recent-conf-visitor/recent-conf-visitor.component';
import { RegisterConfComponent } from './register-conf/register-conf.component';
import { RegisterConfDetailsComponent } from './register-conf-details/register-conf-details.component';
import { RegisterConfLecturesComponent } from './register-conf-lectures/register-conf-lectures.component';
import { ScanQRCodeComponent } from './scan-qr-code/scan-qr-code.component';
import { ScanQRCodeDetailsComponent } from './scan-qr-code-details/scan-qr-code-details.component';
import { MyConfComponent } from './my-conf/my-conf.component';
import { MyConfPathComponent } from './my-conf-path/my-conf-path.component';
import { NewConfProgramComponent } from './new-conf-program/new-conf-program.component';
import { ShowConfComponent } from './show-conf/show-conf.component';
import { ManageQrCodeComponent } from './manage-qr-code/manage-qr-code.component';
import { ManageQrCodeDetailsComponent } from './manage-qr-code-details/manage-qr-code-details.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { MatchingPageComponent } from './matching-page/matching-page.component';
import { ManageNotificationsComponent } from './manage-notifications/manage-notifications.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { UsersComponent } from './users/users.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';




const appRoutes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'registerToConf', component: RegisterConfComponent },
  { path: 'signinSelection', component: SigninSelectionComponent },
  { path: 'matchingPage', component: MatchingPageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'visitorlanding', component: VisitorLandingComponent },
  { path: 'dashboard', component: ManagerDashboardComponent },
  { path: 'showConf', component: ShowConfComponent },
  { path: 'program', component: NewConfProgramComponent },
  {
    path: 'newConf', component: NewConfComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: NewConfDetailsComponent },
      { path: 'lectures', component: NewConfLecturesComponent },
      { path: 'sessions', component: NewConfSessionsComponent }
    ]
  },
  {
    path: 'ScanQRCode', component: ScanQRCodeComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ScanQRCodeDetailsComponent }
    ]
  },
  {
    path: 'ManageQRCode', component: ManageQrCodeComponent,
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: ManageQrCodeDetailsComponent }
    ]
  },
  {
    path: 'Notifications', component: ManageNotificationsComponent
  },
  {
    path: 'MyConference', component: MyConfComponent,
    children: [
      { path: 'myConfPath', component: MyConfPathComponent }
    ]
  },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent},
  { path: 'userProfile', component: UsersComponent , canActivate: [UserAuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
