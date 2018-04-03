import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import { NewConfComponent } from './new-conf/new-conf.component';
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NewConfLecturesComponent } from './new-conf-lectures/new-conf-lectures.component';
import { NewConfSessionsComponent } from './new-conf-sessions/new-conf-sessions.component';
import { NewConfDetailsComponent } from './new-conf-details/new-conf-details.component';

const appRoutes: Routes =[
    { path: '', redirectTo: '/landing', pathMatch:'full'},
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
