import { Component } from '@angular/core';
import {Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';

import { ProgressComponent } from './student-dashboard/components/progress/progress.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatDialogModule } from '@angular/material/dialog';

import {  RecommendedCareersComponent } from './student-dashboard/components/recommended-careers/recommended-careers.component';
import { CareerDialogComponent } from './student-dashboard/components/career-dialog/career-dialog.component';
import {SidebarComponent} from './shared/components/sidebar/sidebar.component';
import {ToolbarComponent} from './shared/components/toolbar/toolbar.component';
import { HomeComponent } from './public/pages/home/home.component';
import { SectionsManagementComponent } from './psychologist-dashboard/pages/sections-management/sections-management.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule,
    MatDividerModule, MatListModule, LanguageSwitcherComponent,
    HeaderContentComponent, FooterContentComponent, MatProgressBarModule, ProgressComponent,
    MatDialogModule, RecommendedCareersComponent,
    CareerDialogComponent, SidebarComponent, ToolbarComponent, TranslatePipe,HomeComponent,  CommonModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'PsychoHelp';

  @ViewChild(MatSidenav, {static: false}) sidenav!: MatSidenav;
  isSidenavOpen = true;
  sidenavMode: 'side' | 'over' = 'side';
  options = [];
  showToolbarAndSidenav = true; // Controls visibility



  constructor(private translate: TranslateService, private observer: BreakpointObserver, private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']) // Observa el ancho de la pantalla
      .subscribe((response) => {  // Se suscribe a los cambios en el ancho de la pantalla
        if (response.matches) { // Si el ancho de la pantalla es menor a 1280px
          this.sidenavMode = 'over'; // Se despliega sobre el contenido
          this.isSidenavOpen = false; // Se cierra
        } else {
          this.sidenavMode = 'side'; // Se despliega al lado del contenido
          this.isSidenavOpen = true;  // Se abre
        }
      });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showToolbarAndSidenav = event.urlAfterRedirects !== '/home';
        this.ngAfterViewInit();
      }
    });
  }
  ngAfterViewInit(): void {
    // Ensure sidenav is initialized only when rendered
    if (this.sidenav) {
      this.sidenav.mode = this.sidenavMode;
      this.sidenav.opened = this.isSidenavOpen;
    }
  }


  toggleSidenav(): void {
    this.sidenav.toggle();
    this.isSidenavOpen = !this.isSidenavOpen;
    this.ngAfterViewInit();
  }
}

