import {Component, OnInit} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Student } from '../../model/student.entity';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import {CareerDialogComponent} from '../career-dialog/career-dialog.component';

@Component({
  selector: 'app-recommended-careers',
  imports: [
    MatIcon,
    NgIf,
    MatButton,
    TranslatePipe
  ],
  templateUrl: './recommended-careers.component.html',
  styleUrl: './recommended-careers.component.css'
})
export class RecommendedCareersComponent implements OnInit {
  student: Student | null = null;
  private dialog: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch student data (using ID 1 for now, same as ProgressComponent)
    this.http.get<{ students: any[] }>('http://localhost:3000/db')
      .subscribe(data => {
        const studentData = data.students.find(s => s.id === 1);
        this.student = studentData ? new Student(studentData) : null;
      });
  }
  openCareerDialog(): void {
    if (this.student && this.student.recommendedCareers.length > 0) {
      this.dialog.open(CareerDialogComponent, {
        width: '600px',
        data: { careers: this.student.recommendedCareers }
      });
    }
  }


}
