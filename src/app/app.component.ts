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

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  isSidenavOpen = true;
  isStudent = true; // Toggle between student and psychologist
  sidenavMode: 'side' | 'over' = 'side';
  showToolbarAndSidenav = true; // Controls visibility

  options_student = [
    { label: 'SIDEBAR.HOME', route: 'student/home', icon: 'home' },
    { label: 'SIDEBAR.PROFILE', route: 'student/profile', icon: 'person' },
    { label: 'SIDEBAR.TESTS', route: 'student/tests', icon: 'quiz' },
    { label: 'SIDEBAR.SESSIONS', route: 'student/sessions', icon: 'calendar_month' },
    { label: 'SIDEBAR.DASHBOARD', route: 'student/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.SETTINGS', route: 'student/settings', icon: 'settings' }
  ];

  options_psychologist = [
    { label: 'SIDEBAR.HOME', route: 'psychologist/home', icon: 'home' },
    { label: 'SIDEBAR.PROFILE', route: 'psychologist/profile', icon: 'person' },
    { label: 'SIDEBAR.SESSIONS', route: 'psychologist/sessions', icon: 'schedule' },
    { label: 'SIDEBAR.DASHBOARD', route: 'psychologist/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.PATIENTS', route: 'psychologist/students', icon: 'group' },
    { label: 'SIDEBAR.SETTINGS', route: 'psychologist/settings', icon: 'settings'},
  ];

  options = this.options_student;

  /*toggleOptions() {
    this.options = this.options === this.options_student ? this.options_psychologist : this.options_student;
  }*/


  constructor(private translate: TranslateService, private observer: BreakpointObserver, private router: Router) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
 // Observer to handle screen size changes and adjust sidenav mode
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

    // Subscription to router events to update options based on the current route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (/^\/psychologist(\/|$)/.test(event.urlAfterRedirects)) {
          this.isStudent = false;
          this.options = this.options_psychologist;
        } else if (/^\/student(\/|$)/.test(event.urlAfterRedirects)) {
          this.isStudent = true;
          this.options = this.options_student;
        }
      }
    });

    // Initially set options based on the current URL
    if (/^\/psychologist(\/|$)/.test(this.router.url)) {
      this.isStudent = false;
      this.options = this.options_psychologist;
    } else if (/^\/student(\/|$)/.test(this.router.url)) {
      this.isStudent = true;
      this.options = this.options_student;
    }
    /*this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showToolbarAndSidenav = event.urlAfterRedirects !== '/home';
        this.ngAfterViewInit();
      }
    });*/
  }
  toggleOptions() {
    // Cambia el tipo de usuario y la lista de opciones
    this.isStudent = !this.isStudent;
    this.options = this.isStudent ? this.options_student : this.options_psychologist;

    // Obtiene la ruta actual
    const currentUrl = this.router.url;
    let newUrl = currentUrl;

    // Reemplaza la parte del tipo de usuario en la URL
    if (currentUrl.startsWith('/student/')) {
      newUrl = currentUrl.replace('/student/', '/psychologist/');
    } else if (currentUrl.startsWith('/psychologist/')) {
      newUrl = currentUrl.replace('/psychologist/', '/student/');
    }

    // Navega a la nueva ruta si cambió
    if (newUrl !== currentUrl) {
      this.router.navigateByUrl(newUrl);
    }
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

