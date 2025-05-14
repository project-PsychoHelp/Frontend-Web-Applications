import { Component, EventEmitter, Output } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatIcon,
    TranslatePipe,
    MatIconButton
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
