import { Component } from '@angular/core';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatLine} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatNavList,
    MatIcon,
    MatLine,
    MatListItem,
    RouterLinkActive,
    MatListItemIcon,
    RouterLink,
    TranslatePipe,
    NgForOf,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navItems = [
    { label: 'SIDEBAR.DASHBOARD', route: '/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.TESTS', route: '/tests', icon: 'assignment' },
    { label: 'SIDEBAR.CAREERS', route: '/careers', icon: 'school' },
    { label: 'SIDEBAR.PROFILE', route: '/profile', icon: 'person' }
  ];
}
