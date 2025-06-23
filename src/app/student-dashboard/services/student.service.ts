import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators'; // Import operators
import { Student } from '../model/student.entity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = environment.studentsEndpointPath; // '/students'
    this.basePath = environment.serverBasePath; // 'http://localhost:3000/api/v1'
  }

  // New method to fetch all students as an array
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.basePath}${this.resourceEndpoint}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  // Get student by ID
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.basePath}${this.resourceEndpoint}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Additional methods specific to students (optional)
  getStudentsByProgress(percentage: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.basePath}${this.resourceEndpoint}?progress.overallPercentage=${percentage}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
