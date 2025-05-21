import { Component, EventEmitter, Output } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {LanguageSwitcherComponent} from '../../../public/components/language-switcher/language-switcher.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    TranslatePipe,
    MatIconButton,
    LanguageSwitcherComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  onToggleSidenav() : void {
    this.toggleSidenav.emit();
  }
}
