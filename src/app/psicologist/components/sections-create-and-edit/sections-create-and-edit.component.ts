import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sections } from "../../model/sections.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

@Component({
  selector: 'app-sections-create-and-edit',
  imports: [
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './sections-create-and-edit.component.html',
  styleUrl: './sections-create-and-edit.component.css'
})
export class SectionsCreateAndEditComponent {
  // Attributes
  @Input() sections: Sections;
  @Input() editMode: boolean = false;
  @Output() sectionAdded: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() sectionUpdated: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('sectionsForm', {static: false}) sectionsForm!: NgForm;

  // Opciones para los dropdowns
  sessionTypes = [
    'Orientación Vocacional',
    'Seguimiento',
    'Primera Consulta',
    'Terapia Individual',
    'Evaluación Psicológica'
  ];

  sessionModes = [
    'videollamada',
    'presencial',
    'telefónica'
  ];

  sessionStatuses = [
    'confirmed',
    'pending',
    'completed',
    'cancelled'
  ];

  // Methods
  constructor() {
    this.sections = new Sections();
  }

  // Private methods
  private resetEditState(): void {
    this.sections = new Sections();
    this.editMode = false;
    if (this.sectionsForm) {
      this.sectionsForm.resetForm();
    }
  }

  // Event Handlers
  onSubmit(): void {
    if (this.sectionsForm.form.valid) {
      let emitter: EventEmitter<Sections> = this.editMode ? this.sectionUpdated : this.sectionAdded;
      emitter.emit(this.sections);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }

}
