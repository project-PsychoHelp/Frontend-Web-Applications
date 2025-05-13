import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Testcontent } from "../../model/testcontent.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-testcontent-create-and-edit',
  imports: [MatIconModule, CommonModule, TranslateModule, MatFormField, MatInputModule, MatButtonModule, FormsModule, MatSelectModule],
  templateUrl: './testcontent-create-and-edit.component.html',
  styleUrl: './testcontent-create-and-edit.component.css'
})
export class TestcontentCreateAndEditComponent {
  // Atributos
  @Input() testcontent: Testcontent;
  @Input() editMode: boolean = false;
  @Output() testcontentAdded: EventEmitter<Testcontent> = new EventEmitter<Testcontent>();
  @Output() testcontentUpdated: EventEmitter<Testcontent> = new EventEmitter<Testcontent>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('testcontentForm', { static: false }) testcontentForm!: NgForm;

  // Métodos
  constructor() {
    this.testcontent = {} as Testcontent;
  }

  // Métodos privados
  private resetEditState(): void {
    this.testcontent = {} as Testcontent;
    this.editMode = false;
    this.testcontentForm.resetForm();
  }

  // Manejadores de eventos

  trackByIndex(index: number, item: any): number {
    return index;
  }

  removeOption(index: number): void {
    if (this.testcontent && this.testcontent.options) {
      this.testcontent.options.splice(index, 1);
    }
  }
  addOption(): void {
    if (this.testcontent && this.testcontent.options) {
      this.testcontent.options.push(''); // Agrega un string vacío
    } else if (this.testcontent) {
      this.testcontent.options = ['']; // Inicializa el array con un string vacío
    }
  }


  onSubmit(): void {
    if (this.testcontentForm.form.valid) {
      let emitter: EventEmitter<Testcontent> = this.editMode ? this.testcontentUpdated : this.testcontentAdded;
      emitter.emit(this.testcontent);
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
