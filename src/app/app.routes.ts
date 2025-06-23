import { Routes } from '@angular/router';
//import { TestManagementComponent } from "./customTests/pages/test-management/test-management.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
//import { TestcontentManagementComponent } from "./customTests/pages/testcontent-management/testcontent-management.component";

import { StudentPageInitComponent } from "./public/pages/student-page-init/student-page-init.component";
import { PyschologistPageInitComponent } from "./public/pages/pyschologist-page-init/pyschologist-page-init.component";


export const routes: Routes = [
  //{ path: 'customTests/tests', component: TestManagementComponent },
  { path: '', redirectTo: 'customTests/tests', pathMatch: 'full' },
  //{ path: 'customTests/testscontent', component: TestcontentManagementComponent },
  { path: 'inicio-student', component: StudentPageInitComponent },
  { path: 'inicio-psychologist', component: PyschologistPageInitComponent },
  { path: '**', component: PageNotFoundComponent },
  ];
