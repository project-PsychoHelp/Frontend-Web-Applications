import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Psychologist } from '../model/psychologist.entity';

@Injectable({
  providedIn: 'root'
})
export class PsychologistService {
  private baseUrl = '/api/psychologists';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Psychologist[]> {
    return this.http.get<Psychologist[]>(this.baseUrl);
  }

  create(psychologist: Psychologist): Observable<Psychologist> {
    return this.http.post<Psychologist>(this.baseUrl, psychologist);
  }

  update(psychologist: Psychologist): Observable<Psychologist> {
    return this.http.put<Psychologist>(`${this.baseUrl}/${psychologist.id}`, psychologist);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
