import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PsychologistService } from '../../PsychologistSearch/services/psychologists.service';
import { Psychologist } from '../../PsychologistSearch/model/psychologist.entity';

@Component({
  selector: 'app-psychologist-management',
  templateUrl: './psychologist-managment-component.html',
  styleUrls: ['./psychologist-managment-component.css']
})
export class PsychologistManagementComponent implements OnInit, AfterViewInit {

  psychologistData: Psychologist = new Psychologist();
  dataSource!: MatTableDataSource<Psychologist>;
  displayedColumns: string[] = ['id', 'name', 'age', 'email', 'experience', 'speciality', 'actions'];
  isEditMode: boolean = false;
  filteredPsychologists: Psychologist[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private psychologistService: PsychologistService) {}

  ngOnInit(): void {
    this.getAllPsychologists();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  private getAllPsychologists(): void {
    this.psychologistService.getAll().subscribe((data: Psychologist[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.filteredPsychologists = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  private resetEditState(): void {
    this.psychologistData = new Psychologist();
    this.isEditMode = false;
  }

  private createPsychologist(): void {
    this.psychologistService.create(this.psychologistData).subscribe(() => {
      this.getAllPsychologists();
      this.resetEditState();
    });
  }

  private updatePsychologist(): void {
    this.psychologistService.update(this.psychologistData).subscribe(() => {
      this.getAllPsychologists();
      this.resetEditState();
    });
  }

  private deletePsychologist(id: number): void {
    this.psychologistService.delete(id).subscribe(() => {
      this.getAllPsychologists();
    });
  }

  onEditItem(element: Psychologist) {
    this.psychologistData = { ...element };
    this.isEditMode = true;
  }

  onDeleteItem(element: Psychologist) {
    if (confirm(`¿Eliminar al psicólogo ${element.name}?`)) {
      this.deletePsychologist(element.id);
    }
  }

  onCancelEdit() {
    this.resetEditState();
  }

  onSubmitForm() {
    this.isEditMode ? this.updatePsychologist() : this.createPsychologist();
  }

  onSearch(searchTerm: string): void {
    this.filteredPsychologists = this.dataSource.data.filter(psychologist =>
      psychologist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onFilter(filterCriteria: any): void {
    // Implementa la lógica de filtrado según los criterios
    console.log('Filtrar:', filterCriteria);
  }
}
