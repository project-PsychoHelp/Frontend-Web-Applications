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
@Component({
  selector: 'app-sections-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, SectionsCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './sections-management.component.html',
  styleUrl: './sections-management.component.css'
})
export class SectionsManagementComponent implements OnInit, AfterViewInit  {
  // Attributes
  studentData: Sections;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false}) sort!: MatSort;

  // Constructor
  constructor(private studentService: SectionsService) {
    this.isEditMode = false;
    this.studentData = {} as Sections;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.studentData = {} as Sections;
  }

  // CRUD Actions

  private getAllStudents(): void {
    this.studentService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };

  private createStudent(): void {
    this.studentService.create(this.studentData)
      .subscribe((response: any) => {
        this.dataSource.data.push({...response});
        // Actualiza el dataSource.data con los students actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((students: Sections) => {
            return students;
          });
      });
  };

  private updateStudent(): void {
    let studentToUpdate: Sections = this.studentData;
    this.studentService.update(this.studentData.id, studentToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((students: Sections) => {
            if (students.id === response.id) {
              return response;
            }
            return students;
          });
      });
  };

  private deleteStudent(studentId: number): void {
    this.studentService.delete(studentId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((student: Sections) => {
            return student.id !== studentId ? student : false;
          });
      });
  };

  // UI Event Handlers

  onEditItem(element: Sections) {
    this.isEditMode = true;
    this.studentData = element;
  }

  onDeleteItem(element: Sections) {
    this.deleteStudent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllStudents();
  }

  onStudentAdded(element: Sections) {
    this.studentData = element;
    this.createStudent();
    this.resetEditState();
  }

  onStudentUpdated(element: Sections) {
    this.studentData = element;
    this.updateStudent();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllStudents();
  }

}
