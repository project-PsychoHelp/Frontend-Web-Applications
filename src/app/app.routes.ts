import {Routes} from '@angular/router';
import {ProgressComponent} from './student-dashboard/components/progress/progress.component';
import {
  RecommendedCareersComponent
} from './student-dashboard/components/recommended-careers/recommended-careers.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {SectionsManagementComponent} from './psychologist-dashboard/pages/sections-management/sections-management.component';
import {HomeComponent} from './public/pages/home/home.component';

import { StudentPageInitComponent } from "./public/pages/student-page-init/student-page-init.component";
import { PsychologistPageInitComponent } from "./public/pages/psychologist-page-init/psychologist-page-init.component";
import {TestManagementComponent} from './customTests/pages/test-management/test-management.component';
import {authenticationGuard} from './iam/services/authentication.guard';
import {SignInComponent} from './iam/pages/sign-in/sign-in.component';
import {SignUpComponent} from './iam/pages/sign-up/sign-up.component';
export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'about', component: PageNotFoundComponent },
  { path: 'student',
  children: [
    { path: 'home', component: StudentPageInitComponent, canActivate: [authenticationGuard] },
    {path: 'dashboard', component: ProgressComponent, canActivate: [authenticationGuard]}, //Dashboard shows the ProgressComponent
    {path: 'careers', component: PageNotFoundComponent, canActivate: [authenticationGuard]}, //Careers route
    {path: 'tests', component: TestManagementComponent, canActivate: [authenticationGuard]}, //Placeholder for tests
    {path: 'profile', component: PageNotFoundComponent, canActivate: [authenticationGuard]}, //Placeholder for Profile
    {path: 'sessions', component: PageNotFoundComponent, canActivate: [authenticationGuard]}, //Placeholder for sessions
    {path: 'resources', component: PageNotFoundComponent, canActivate: [authenticationGuard]}, //Placeholder for resources
    {path: 'settings', component: PageNotFoundComponent, canActivate: [authenticationGuard]}, //Placeholder for settings
    { path: '**', component: PageNotFoundComponent }
  ]
  },
  {path: 'psychologist',
  children: [
    { path: '', component: PageNotFoundComponent },
    { path: 'sessions', component: SectionsManagementComponent, canActivate: [authenticationGuard] },
    { path: 'home', component: PsychologistPageInitComponent, canActivate: [authenticationGuard] },
    { path: '**', component: PageNotFoundComponent, canActivate: [authenticationGuard]}
  ]},
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent},
  {path: '**', component: PageNotFoundComponent},


];

