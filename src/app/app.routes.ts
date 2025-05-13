import { Routes } from '@angular/router';
import {PlanManagementComponent} from "./premiumPlans/pages/plan-management/plan-management.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  { path: 'premiumPlans/plans', component: PlanManagementComponent },
  { path: '', redirectTo: 'premiumPlans/plans', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  ];
