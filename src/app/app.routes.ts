import {Routes} from '@angular/router';
import {ProgressComponent} from './student-dashboard/components/progress/progress.component';
import {
  RecommendedCareersComponent
} from './student-dashboard/components/recommended-careers/recommended-careers.component';
import {PageNotFoundComponent} from './public/pages/page-not-found/page-not-found.component';
import {SectionsManagementComponent} from './psicologist/pages/sections-managament/sections-managament.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'about', component: PageNotFoundComponent },
  { path: 'psicologist/sections', component: SectionsManagementComponent },
  { path: 'psicologist/', component: SectionsManagementComponent},
  {path: 'dashboard', component: ProgressComponent}, //Dashboard shows the ProgressComponent
  {path: 'careers', component: ProgressComponent}, //Careers route
  {path: 'tests', component: ProgressComponent}, //Placeholder for tests
  {path: 'profile', component: ProgressComponent}, //Placeholder for Profile
  {path: 'sessions', component: ProgressComponent}, //Placeholder for sessions
  {path: 'resources', component: ProgressComponent}, //Placeholder for resources
  {path: 'settings', component: ProgressComponent}, //Placeholder for settings
  {path: '**', component: PageNotFoundComponent}

];

