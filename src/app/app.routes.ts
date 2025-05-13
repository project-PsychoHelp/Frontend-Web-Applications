import { Routes } from '@angular/router';
import { TestManagementComponent } from "./customTests/pages/test-management/test-management.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";


export const routes: Routes = [
  { path: 'customTests/tests', component: TestManagementComponent },
  { path: '', redirectTo: 'customTests/tests', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  ];
