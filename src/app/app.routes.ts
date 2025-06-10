import { Routes } from '@angular/router';

import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import {SectionsManagementComponent} from './psicologist/pages/sections-managament/sections-managament.component';

export const routes: Routes = [

  { path: 'about', component: PageNotFoundComponent },
  { path: 'psicologist/sections', component: SectionsManagementComponent },
  { path: '', redirectTo: 'psicologist/sections', pathMatch: 'full' },
  { path: 'psicologist/sections', component: SectionsManagementComponent},
  { path: '**', component: PageNotFoundComponent }
];

