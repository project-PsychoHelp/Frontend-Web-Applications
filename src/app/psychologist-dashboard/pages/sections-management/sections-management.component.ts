import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { SectionsService  } from "../../services/sections.service";
import { Sections } from "../../model/sections.entity";
import { SectionsCreateAndEditComponent } from "../../components/sections-create-and-edit/sections-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-sections-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, SectionsCreateAndEditComponent, MatTableModule, NgClass, TranslateModule, MatButton],
  templateUrl: './sections-management.component.html',
  styleUrl: './sections-management.component.css'
})
export class SectionsManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  currentDate: Date = new Date();
  sectionData :Sections;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [

    'id', 'studentId',
    'type',
    'date',
    'time',
    'endTime',
    'status',
    'mode',
    'notes', 'actions' // Esto suele ser una columna para botones de editar/eliminar
  ];
  isEditMode: boolean;
  editingSectionId: number | null = null;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private sectionService: SectionsService) {
    this.isEditMode = false;
    this.sectionData = {} as Sections;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.sectionData = {} as Sections;
    this.editingSectionId = null;
  }


  // CRUD Actions

  private getAllSections(): void {
    this.sectionService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
        console.log('Secciones cargadas:', response);
      });

  };

  private createSection(): void {
    this.sectionService.create(this.sectionData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((sections: Sections) => {
            return sections;
          });
      });
  };



  private deleteSection(sectionId: number): void {
    this.sectionService.delete(sectionId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((sections: Sections) => {
            return sections.id !== sectionId ? sections : false;
          });
        console.log('Sección eliminada:', sectionId);
      });
  };
  // UI Event Handlers

  /*onEditItem(element: Sections) {
    this.isEditMode = true;
    this.sectionData = element;
  }*/

  onDeleteItem(element: Sections) {
    this.deleteSection(element.id);
  }

  /*onCancelEdit() {
    this.resetEditState();
    this.getAllSections();
  }*/

  onStudentAdded(element: Sections) {
    this.sectionData = element;
    this.createSection();
    this.resetEditState();
  }
//FALTA IMPLEMENTACION DEL UPDATE PARA SECTIONES
  /*onStudentUpdated(element: Sections) {
    this.sectionData = element;
    this.resetEditState();
  }     */



  get filteredSections(): Sections[] {
    return this.dataSource.data.filter((s: Sections) => {
      const today = new Date();
      const sessionDate = new Date(s.date);
      return (
        sessionDate.getFullYear() != today.getFullYear() &&
        sessionDate.getMonth() != today.getMonth() &&
        sessionDate.getDate() != today.getDate()
      );
    });
  }
  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllSections();
  }

  onEditItem(element: Sections) {
    this.isEditMode = true;
    this.sectionData = { ...element };
    this.editingSectionId = element.id; // Activa el formulario debajo de esta sección
  }

  onCancelEdit() {
    this.resetEditState();
    this.editingSectionId = null;
  }

  onStudentUpdated(element: Sections) {
    console.log('Evento onStudentUpdated recibido:', element);
    this.sectionData = { ...element }; // Asegurar que tenemos los datos actualizados
    this.updateSection(); // Llamar al método que hace la petición HTTP
    this.resetEditState();
  }

  private updateSection(): void {
    if (!this.sectionData.id) {
      console.error('ID de sección faltante para actualización');
      return;
    }

    console.log('Actualizando sección con datos:', this.sectionData);

    this.sectionService.update(this.sectionData.id, this.sectionData)
      .subscribe({
        next: (response: any) => {
          console.log('Sección actualizada en servidor:', response);

          // Actualizar el dataSource local
          const index = this.dataSource.data.findIndex(s => s.id === this.sectionData.id);
          if (index !== -1) {
            this.dataSource.data[index] = { ...response };
            this.dataSource.data = [...this.dataSource.data]; // Forzar render
          }

          console.log('DataSource actualizado:', this.dataSource.data);
          alert('Sección actualizada correctamente');
        },
        error: (error) => {
          console.error('Error al actualizar sección:', error);
          alert('Error al actualizar la sección: ' + (error.error?.message || error.message));
        }
      });
  };

}
