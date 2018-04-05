import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { NewConfComponent } from './new-conf/new-conf.component';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NewConfLecturesComponent } from './new-conf-lectures/new-conf-lectures.component';
import { NewConfSessionsComponent } from './new-conf-sessions/new-conf-sessions.component';
import { NewConfDetailsComponent } from './new-conf-details/new-conf-details.component';
import { VisitorLandingComponent } from './visitor-landing/visitor-landing.component';
import { SigninSelectionComponent } from './signin-selection/signin-selection.component';
import { RecentConfVisitorComponent } from './recent-conf-visitor/recent-conf-visitor.component';
import { RegisterConfComponent } from './register-conf/register-conf.component';
import { RegisterConfDetailsComponent } from './register-conf-details/register-conf-details.component';
import { RegisterConfLecturesComponent } from './register-conf-lectures/register-conf-lectures.component';

const appRoutes: Routes =[
    { path: 'visitorLanding', component: VisitorLandingComponent},
    { path: 'RegisterToConf', component: RegisterConfComponent,
      children:[
        { path: '', redirectTo: 'details', pathMatch: 'full' },
        { path: 'details', component: RegisterConfDetailsComponent },
        { path: 'lectures', component: RegisterConfLecturesComponent }
      ]},
    { path: '', redirectTo: '/signinSelection', pathMatch:'full'},
    { path: 'signinSelection', component: SigninSelectionComponent},
    { path: 'landing', component: LandingPageComponent},
    { path: 'newConf', component: NewConfComponent,
      children:[
        { path: '', redirectTo: 'details', pathMatch: 'full' },
        { path: 'details', component: NewConfDetailsComponent },
        { path: 'lectures', component: NewConfLecturesComponent },
        { path: 'sessions', component: NewConfSessionsComponent }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
