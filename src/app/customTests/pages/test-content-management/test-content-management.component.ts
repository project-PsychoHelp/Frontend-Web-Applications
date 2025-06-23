import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { TestsContentService } from "../../services/testscontent.service";
import { TestContent } from "../../model/testcontent.entity";
import { TestcontentCreateAndEditComponent } from "../../components/testcontent-create-and-edit/testcontent-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-test-content-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, TestcontentCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './test-content-management.component.html',
  styleUrl: './test-content-management.component.css'
})
export class TestContentManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  testContentData: TestContent;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'question', 'options', 'correctAnswer', 'explanation', 'points', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Constructor
  constructor(private testContentService: TestsContentService) {
    this.isEditMode = false;
    this.testContentData = {} as TestContent;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.testContentData = {} as TestContent;
  }

  // CRUD Actions

  private getAllTestContents(): void {
    this.testContentService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createTestContent(): void {
    this.testContentService.create(this.testContentData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map((testContent: TestContent) => testContent);
      });
  }

  private updateTestContent(): void {
    let testContentToUpdate: TestContent = this.testContentData;
    this.testContentService.update(this.testContentData.id, testContentToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((testContent: TestContent) => {
          if (testContent.id === response.id) {
            return response;
          }
          return testContent;
        });
      });
  }

  private deleteTestContent(testContentId: number): void {
    this.testContentService.delete(testContentId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((testContent: TestContent) => testContent.id !== testContentId);
      });
  }

  // UI Event Handlers

  onEditItem(element: TestContent) {
    this.isEditMode = true;
    this.testContentData = element;
  }

  onDeleteItem(element: TestContent) {
    this.deleteTestContent(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllTestContents();
  }

  onTestContentAdded(element: TestContent) {
    this.testContentData = element;
    this.createTestContent();
    this.resetEditState();
  }

  onTestContentUpdated(element: TestContent) {
    this.testContentData = element;
    this.updateTestContent();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTestContents();
  }
}
