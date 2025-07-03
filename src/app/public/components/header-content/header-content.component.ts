import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import {RouterLinkActive, RouterLink, Router, NavigationEnd} from '@angular/router';
import {Subscription} from 'rxjs';

import {AuthenticationSectionComponent} from '../../../iam/components/authentication-section/authentication-section.component';
import {AuthenticationService} from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-header-content',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, LanguageSwitcherComponent, RouterLinkActive, RouterLink,
    AuthenticationSectionComponent],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent implements OnInit, OnDestroy {
  nameRoute: string = '/home';
  private routerSub?: Subscription;
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.setNameRoute(this.router.url);
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setNameRoute(event.urlAfterRedirects);
      }
    });
  }

  setNameRoute(url: string) {
    this.nameRoute = url.startsWith('/psychologist') ? '/psychologist/home' : '/student/home';
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }
}
