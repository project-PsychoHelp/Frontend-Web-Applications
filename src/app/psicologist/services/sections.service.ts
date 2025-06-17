import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Sections } from "../model/sections.entity";

@Injectable({
  providedIn: 'root'
})
export class SectionsService extends BaseService<Sections> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/sections';
  }

  // Métodos adicionales específicos para sections si los necesitas

  // Obtener secciones por fecha
  getSectionsByDate(date: string): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?date=${date}`);
  }

  // Obtener secciones por estudiante
  getSectionsByStudentId(studentId: number): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?studentId=${studentId}`);
  }

  // Obtener secciones por estado
  getSectionsByStatus(status: string): Observable<Sections[]> {
    return this.http.get<Sections[]>(`${this.basePath}${this.resourceEndpoint}?status=${status}`);
  }

  // Actualizar estado de una sección específicamente
  updateSectionStatus(id: number, status: string): Observable<Sections> {
    return this.update(id, { status } as Partial<Sections>);
  }
}
