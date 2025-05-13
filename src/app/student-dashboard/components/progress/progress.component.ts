import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Student} from '../../model/student.entity';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-progress',
  imports: [
    NgClass,
    MatProgressBar,
    MatIcon,
    TranslateModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})

export class ProgressComponent implements OnInit {
  student: Student | undefined;

  constructor(private http: HttpClient, private translate: TranslateService) {}

  ngOnInit(): void {
    // Fetch the student data from db.json (assuming we're showing data for student ID 1)
    this.http.get<{ students: Student[] }>('http://localhost:3000/db')
      .subscribe(data => {
        this.student = data.students.find(s => s.id === 1);
      });
  }
}
