import { Component, EventEmitter, Output } from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {MatSelect} from '@angular/material/select';
import {MatOption} from '@angular/material/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    MatFormField,
    MatIcon,
    MatSelect,
    MatOption,
    MatInput,
    FormsModule,
    NgForOf,
    MatLabel,
  ],
  styleUrls: ['./search-bar.component.css'],
  standalone: true
})
export class SearchBarComponent {
  searchTerm = '';
  selectedSpecialty = '';

  specialties: string[] = [
    'Orientación Profesional',
    'Coaching Vocacional',
    'Orientacion Educativa',
    'Consejería Individual/Familiar',
    'Psicometria'
  ];

  @Output() search = new EventEmitter<string>();
  @Output() filter = new EventEmitter<string>();

  onSearchTermChanged() {
    this.search.emit(this.searchTerm);
  }

  onFilterChange() {
    this.filter.emit(this.selectedSpecialty);
  }
}
