import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { TestsService } from "../../services/tests.service";
import { Test } from "../../model/test.entity";
import { TestCreateAndEditComponent } from "../../components/test-create-and-edit/test-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-test-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, TestCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './test-management.component.html',
  styleUrl: './test-management.component.css'
})

export class TestManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  testData: Test;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title', 'id', 'description', 'category', 'recommendationPercentage','numberOfQuestions','isFree', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Constructor
  constructor(private testService: TestsService) {
    this.isEditMode = false;
    this.testData = {} as Test;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.testData = {} as Test;
  }

  // CRUD Actions

  private getAllTests(): void {
    this.testService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createTest(): void {
    this.testService.create(this.testData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        // Actualiza el dataSource.data con los tests actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((test: Test) => {
            return test;
          });
      });
  }

  private updateTest(): void {
    let testToUpdate: Test = this.testData;
    this.testService.update(this.testData.id, testToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((test: Test) => {
            if (test.id === response.id) {
              return response;
            }
            return test;
          });
      });
  }

  private deleteTest(testId: number): void {
    this.testService.delete(testId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((test: Test) => {
            return test.id !== testId ? test : false;
          });
      });
  }

  // UI Event Handlers

  onEditItem(element: Test) {
    this.isEditMode = true;
    this.testData = element;
  }

  onDeleteItem(element: Test) {
    this.deleteTest(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllTests();
  }

  onTestAdded(element: Test) {
    this.testData = element;
    this.createTest();
    this.resetEditState();
  }

  onTestUpdated(element: Test) {
    this.testData = element;
    this.updateTest();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTests();
  }
}



