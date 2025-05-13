import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Test } from "../../model/test.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-test-create-and-edit',
  imports: [TranslateModule, MatFormField, MatInputModule, MatButtonModule, FormsModule,MatSelectModule],
  templateUrl: './test-create-and-edit.component.html',
  styleUrl: './test-create-and-edit.component.css'
})

export class TestCreateAndEditComponent {
  // Atributos
  @Input() test: Test;
  @Input() editMode: boolean = false;
  @Output() testAdded: EventEmitter<Test> = new EventEmitter<Test>();
  @Output() testUpdated: EventEmitter<Test> = new EventEmitter<Test>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('testForm', { static: false }) testForm!: NgForm;

  // Métodos
  constructor() {
    this.test = {} as Test;
  }

  // Métodos privados
  private resetEditState(): void {
    this.test = {} as Test;
    this.editMode = false;
    this.testForm.resetForm();
  }

  // Manejadores de eventos

  onSubmit(): void {
    if (this.testForm.form.valid) {
      let emitter: EventEmitter<Test> = this.editMode ? this.testUpdated : this.testAdded;
      emitter.emit(this.test);
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
