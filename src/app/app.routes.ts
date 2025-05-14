import {Routes} from '@angular/router';
import {ProgressComponent} from './student-dashboard/components/progress/progress.component';
import {
  RecommendedCareersComponent
} from './student-dashboard/components/recommended-careers/recommended-careers.component';

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: ProgressComponent}, //Dashboard shows the ProgressComponent
  {path: 'careers', component: RecommendedCareersComponent}, //Careers route
  {path: 'tests', component: ProgressComponent}, //Placeholder for tests
  {path: 'profile', component: ProgressComponent}, //Placeholder for Profile


];
