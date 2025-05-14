import {Component, Inject} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Career } from '../../model/career.entity';

import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-career-dialog',
  imports: [
    TranslatePipe,
    MatIcon,
    MatButton,
    NgForOf
  ],
  templateUrl: './career-dialog.component.html',
  styleUrl: './career-dialog.component.css'
})
export class CareerDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CareerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { careers: Career[] }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
