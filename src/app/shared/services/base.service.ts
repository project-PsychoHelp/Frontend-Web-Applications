import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  basePath: string = environment.serverBasePath;
  resourceEndpoint: string = '/resources'; // Should be overridden in extending services

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(protected http: HttpClient) {}

  /** Returns full resource path */
  protected resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  /** Handle all HTTP errors */
  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`Client-side error: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  /** Get all resources */
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** Get single resource by ID */
  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** Create new resource */
  create(item: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** Update existing resource */
  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /** Delete resource by ID */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
