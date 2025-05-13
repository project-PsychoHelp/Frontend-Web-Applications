import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {Plan} from "../../model/plan.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-plan-create-and-edit',
  imports: [TranslateModule, MatFormField, MatInputModule, MatButtonModule, FormsModule,MatSelectModule],
  templateUrl: './plan-create-and-edit.component.html',
  styleUrl: './plan-create-and-edit.component.css'
})

export class PlanCreateAndEditComponent {
  // Atributos
  @Input() plan: Plan;
  @Input() editMode: boolean = false;
  @Output() planAdded: EventEmitter<Plan> = new EventEmitter<Plan>();
  @Output() planUpdated: EventEmitter<Plan> = new EventEmitter<Plan>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('planForm', { static: false }) planForm!: NgForm;

  // Métodos
  constructor() {
    this.plan = {} as Plan;
  }

  // Métodos privados
  private resetEditState(): void {
    this.plan = {} as Plan;
    this.editMode = false;
    this.planForm.resetForm();
  }


  // Manejadores de eventos

  onSubmit(): void {
    if (this.planForm.form.valid) {
      let emitter: EventEmitter<Plan> = this.editMode ? this.planUpdated : this.planAdded;
      emitter.emit(this.plan);
      this.resetEditState();
    } else {
      console.error('Datos inválidos en el formulario');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }
}
