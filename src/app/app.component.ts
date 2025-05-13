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

import { ProgressComponent } from './student-dashboard/components/progress/progress.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { MatDialogModule } from '@angular/material/dialog';

import {
  RecommendedCareersComponent
} from './student-dashboard/components/recommended-careers/recommended-careers.component';
import {CareerDialogComponent} from './student-dashboard/components/career-dialog/career-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, MatIconModule,
    MatSidenavModule, MatDividerModule, MatListModule, LanguageSwitcherComponent,
    HeaderContentComponent, FooterContentComponent, MatProgressBarModule, ProgressComponent,
    MatDialogModule, RecommendedCareersComponent,
    CareerDialogComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'PyschoHelp';

  @ViewChild(MatSidenav, {static: true}) sidenav!: MatSidenav;
  options = [

  ];


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
