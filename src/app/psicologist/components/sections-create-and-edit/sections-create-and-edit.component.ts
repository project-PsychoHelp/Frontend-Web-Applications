import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sections } from "../../model/sections.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sections-create-and-edit',
  imports: [
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './sections-create-and-edit.component.html',
  styleUrl: './sections-create-and-edit.component.css'
})
export class SectionsCreateAndEditComponent implements OnInit {
  // Attributes
  @Input() sections: Sections = new Sections();
  @Input() editMode: boolean = false;
  @Output() sectionAdded: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() sectionUpdated: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('sessionForm', {static: false}) sectionsForm!: NgForm;

  // Opciones para los dropdowns - corregidas para coincidir con el HTML
  sessionTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'grupal', label: 'Grupal' },
    { value: 'seguimiento', label: 'Seguimiento' },
    { value: 'evaluacion', label: 'Evaluación' }
  ];

  sessionModes = [
    { value: 'presencial', label: 'Presencial' },
    { value: 'virtual', label: 'Virtual' },
    { value: 'hibrida', label: 'Híbrida' }
  ];

  sessionStatuses = [
    { value: 'programada', label: 'Programada' },
    { value: 'confirmada', label: 'Confirmada' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' },
    { value: 'pendiente', label: 'Pendiente' }
  ];

  // Methods
  constructor() {}

  ngOnInit(): void {
    // Si no se proporciona sections, crear uno nuevo
    if (!this.sections) {
      this.sections = new Sections();
    }
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
    if (this.sectionsForm && this.sectionsForm.form.valid) {
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
