import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
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
