import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Sections } from "../../model/sections.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
@Component({
  selector: 'app-sections-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './sections-create-and-edit.component.html',
  styleUrl: './sections-create-and-edit.component.css'
})
export class SectionsCreateAndEditComponent {
  // Attributes
  @Input() student: Sections;
  @Input() editMode: boolean = false;
  @Output() studentAdded: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() studentUpdated: EventEmitter<Sections> = new EventEmitter<Sections>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('studentForm', {static: false}) studentForm!: NgForm;

  // Methods
  constructor() {
    this.student = {} as Sections;
  }

  // Private methods
  private resetEditState(): void {
    this.student = {} as Sections;
    this.editMode = false;
    this.studentForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.studentForm.form.valid) {
      let emitter: EventEmitter<Sections> = this.editMode ? this.studentUpdated : this.studentAdded;
      emitter.emit(this.student);
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
