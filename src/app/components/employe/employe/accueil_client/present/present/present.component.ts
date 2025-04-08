import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PopupService } from '../../../../../../services/popup.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableReservation } from '../../../../../../interfaces/table-reservation';

@Component({
  selector: 'app-present',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './present.component.html',
  styleUrl: './present.component.css'
})
export class PresentComponent {
  table: TableReservation;
  constructor(private popupService: PopupService, private dialogRef: MatDialogRef<PresentComponent>, @Inject(MAT_DIALOG_DATA) data: TableReservation) {
    this.table = data;
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
