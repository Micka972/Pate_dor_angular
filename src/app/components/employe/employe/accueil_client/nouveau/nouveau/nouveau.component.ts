import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PopupService } from '../../../../../../services/popup.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableReservation } from '../../../../../../interfaces/table-reservation';

@Component({
  selector: 'app-nouveau',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './nouveau.component.html',
  styleUrl: './nouveau.component.css'
})
export class NouveauComponent {

  table: TableReservation;
  constructor(private popupService: PopupService, private dialogRef: MatDialogRef<NouveauComponent>, @Inject(MAT_DIALOG_DATA) data: TableReservation) {
    this.table = data;
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  
}