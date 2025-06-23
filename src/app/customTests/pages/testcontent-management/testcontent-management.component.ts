import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { TestscontentService } from "../../services/testscontent.service";
import { Testcontent } from "../../model/testcontent.entity";
import { TestcontentCreateAndEditComponent } from "../../components/testcontent-create-and-edit/testcontent-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-testcontent-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, TestcontentCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './testcontent-management.component.html',
  styleUrl: './testcontent-management.component.css'
})
export class TestcontentManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  testcontentData: Testcontent;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'question', 'options', 'correctAnswer', 'explanation', 'points', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Constructor
  constructor(private testcontentService: TestscontentService) {
    this.isEditMode = false;
    this.testcontentData = {} as Testcontent;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.testcontentData = {} as Testcontent;
  }

  // CRUD Actions

  private getAllTestcontents(): void {
    this.testcontentService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createTestcontent(): void {
    this.testcontentService.create(this.testcontentData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map((testcontent: Testcontent) => testcontent);
      });
  }

  private updateTestcontent(): void {
    let testcontentToUpdate: Testcontent = this.testcontentData;
    this.testcontentService.update(this.testcontentData.id, testcontentToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((testcontent: Testcontent) => {
          if (testcontent.id === response.id) {
            return response;
          }
          return testcontent;
        });
      });
  }

  private deleteTestcontent(testcontentId: number): void {
    this.testcontentService.delete(testcontentId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((testcontent: Testcontent) => testcontent.id !== testcontentId);
      });
  }

  // UI Event Handlers

  onEditItem(element: Testcontent) {
    this.isEditMode = true;
    this.testcontentData = element;
  }

  onDeleteItem(element: Testcontent) {
    this.deleteTestcontent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllTestcontents();
  }

  onTestcontentAdded(element: Testcontent) {
    this.testcontentData = element;
    this.createTestcontent();
    this.resetEditState();
  }

  onTestcontentUpdated(element: Testcontent) {
    this.testcontentData = element;
    this.updateTestcontent();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTestcontents();
  }
}
