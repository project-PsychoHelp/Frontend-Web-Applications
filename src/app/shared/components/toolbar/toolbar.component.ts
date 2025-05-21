import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  studentName: string | null = null;

  constructor(private http: HttpClient) {}

  onToggleSidenav() : void {
    this.toggleSidenav.emit();
  }

  ngOnInit():void {
    this.http.get<{ students: any[] }>('http://localhost:3000/db')
      .subscribe({
        next: data => {
          const studentData = data.students.find(s => s.id === 1);
          this.studentName = studentData ? studentData.fullName : 'Unknown User';
        },
        error: err => {
          console.error('Error fetching the data: ',err);
          this.studentName = 'Unknown User';
        }
      })
  }
}
