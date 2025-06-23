import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Sections } from "../model/sections.entity";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionsService extends BaseService<Sections> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/sections';
    this.basePath = environment.serverBasePath; // Ensure basePath is set
  }

  // New method to fetch all sections as an array
  getAllSections(): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


  // Métodos adicionales específicos para sections
  getSectionsByDate(date: string): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?date=${date}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSectionsByStudentId(studentId: number): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?studentId=${studentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getSectionsByStatus(status: string): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?status=${status}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateSectionStatus(id: number, status: string): Observable<Sections> {
    return this.update(id, { status } as Partial<Sections>);
  }
}
