import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { PlansService } from  "../../services/plans.service";
import {Plan} from "../../model/plan.entity";
import { PlanCreateAndEditComponent } from "../../components/plan-create-and-edit/plan-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-plan-management',
  imports: [MatCardModule, CommonModule, MatPaginator, MatSort, MatIconModule, PlanCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './plan-management.component.html',
  styleUrl: './plan-management.component.css'
})

export class PlanManagementComponent implements OnInit, AfterViewInit {
  // Attributes
  planData: Plan;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['planName', 'id', 'description', 'price', 'duration', 'maxUsers', 'isActive', 'actions'];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  // Constructor
  constructor(private planService: PlansService) {
    this.isEditMode = false;
    this.planData = {} as Plan;
    this.dataSource = new MatTableDataSource<any>();
  }

  // Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.planData = {} as Plan;
  }

  // CRUD Actions

  private getAllPlans(): void {
    this.planService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createPlan(): void {
    this.planService.create(this.planData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        // Actualiza el dataSource.data con los plans actuales, para que Angular detecte el cambio y actualice la vista.
        this.dataSource.data = this.dataSource.data
          .map((plan: Plan) => {
            return plan;
          });
      });
  }

  private updatePlan(): void {
    let planToUpdate: Plan = this.planData;
    this.planService.update(this.planData.id, planToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data
          .map((plan: Plan) => {
            if (plan.id === response.id) {
              return response;
            }
            return plan;
          });
      });
  }

  private deletePlan(planId: number): void {
    this.planService.delete(planId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data
          .filter((plan: Plan) => {
            return plan.id !== planId ? plan : false;
          });
      });
  }

  // UI Event Handlers

  onEditItem(element: Plan) {
    this.isEditMode = true;
    this.planData = element;
  }

  onDeleteItem(element: Plan) {
    this.deletePlan(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllPlans();
  }

  onPlanAdded(element: Plan) {
    this.planData = element;
    this.createPlan();
    this.resetEditState();
  }

  onPlanUpdated(element: Plan) {
    this.planData = element;
    this.updatePlan();
    this.resetEditState();
  }

  // Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllPlans();
  }
}
