import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { BreakpointObserver } from "@angular/cdk/layout";
import { TranslateService } from "@ngx-translate/core";
import { LanguageSwitcherComponent } from "./public/components/language-switcher/language-switcher.component";
import { HeaderContentComponent } from './public/components/header-content/header-content.component';
import { FooterContentComponent } from './public/components/footer-content/footer-content.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
                         MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent,HeaderContentComponent,FooterContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'PyschoHelp';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;


  options_student = [
    { title: 'Inicio', path: '/inicio-student', icon: 'home' },
    { title: 'Mi Perfil', path: '/perfil', icon: 'person' },
    { title: 'Mis Test', path: '/test', icon: 'quiz' },
    { title: 'Sesiones', path: '/sesiones-student', icon: 'schedule' },
    { title: 'Dashboard Student', path: '/student-dashboard', icon: 'dashboard' },
    { title: 'Configuración', path: '/configuration-student', icon: 'settings'},
  ];

  options_psychologist = [
    { title: 'Inicio', path: '/inicio-psychologist', icon: 'home' },
    { title: 'Mi Perfil', path: '/perfil', icon: 'person' },
    { title: 'Sesiones', path: '/sesiones-psychologist', icon: 'schedule' },
    { title: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { title: 'Pacientes', path: '/pacientes', icon: 'group' },
    { title: 'Configuración', path: '/configuration-student', icon: 'settings'},
  ];

  options = this.options_student;

  toggleOptions() {
    this.options = this.options === this.options_student ? this.options_psychologist : this.options_student;
  }



  constructor(private translate: TranslateService, private observer: BreakpointObserver) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.observer.observe(['(max-width: 1280px)']) // Observa el ancho de la pantalla
      .subscribe((response) => {  // Se suscribe a los cambios en el ancho de la pantalla
        if (response.matches) { // Si el ancho de la pantalla es menor a 1280px
          this.sidenav.mode = 'over'; // Se despliega sobre el contenido
          this.sidenav.close(); // Se cierra
        } else {
          this.sidenav.mode = 'side'; // Se despliega al lado del contenido
          this.sidenav.open();  // Se abre
        }
      });
  }


}
