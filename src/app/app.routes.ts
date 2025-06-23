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
export const routes: Routes = [
  {path: '', redirectTo: 'student/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  { path: 'about', component: PageNotFoundComponent },
  { path: 'student',
  children: [
    { path: 'home', component: StudentPageInitComponent },
    {path: 'dashboard', component: ProgressComponent}, //Dashboard shows the ProgressComponent
    {path: 'careers', component: PageNotFoundComponent}, //Careers route
    {path: 'tests', component: TestManagementComponent}, //Placeholder for tests
    {path: 'profile', component: PageNotFoundComponent}, //Placeholder for Profile
    {path: 'sessions', component: PageNotFoundComponent}, //Placeholder for sessions
    {path: 'resources', component: PageNotFoundComponent}, //Placeholder for resources
    {path: 'settings', component: PageNotFoundComponent}, //Placeholder for settings
    { path: '**', component: PageNotFoundComponent }
  ]
  },
  {path: 'psychologist',
  children: [
    { path: '', component: PageNotFoundComponent },
    { path: 'sessions', component: SectionsManagementComponent },
    { path: 'home', component: PsychologistPageInitComponent },
    { path: '**', component: PageNotFoundComponent }
  ]},
  {path: '**', component: PageNotFoundComponent},


];

