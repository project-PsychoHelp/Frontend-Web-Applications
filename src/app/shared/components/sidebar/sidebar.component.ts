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
    { label: 'SIDEBAR.DASHBOARD', route: 'student/dashboard', icon: 'dashboard' },
    { label: 'SIDEBAR.TESTS', route: 'student/tests', icon: 'assignment' },
    { label: 'SIDEBAR.CAREERS', route: 'student/careers', icon: 'school' },
    { label: 'SIDEBAR.SESSIONS', route: 'student/sessions', icon: 'calendar_month' },
    { label: 'SIDEBAR.RESOURCES', route: 'student/resources', icon: 'import_contacts' },
    { label: 'SIDEBAR.PROFILE', route: 'student/profile', icon: 'person' },
    { label: 'SIDEBAR.SETTINGS', route: 'student/settings', icon: 'settings' }
  ];
}
