import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PopupService } from '../../../../../../services/popup.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableReservation } from '../../../../../../interfaces/table-reservation';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-present',
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './present.component.html',
  styleUrl: './present.component.css'
})
export class PresentComponent {
  table: TableReservation;
  nbPers: number = 1;

  constructor(private popupService: PopupService, private dialogRef: MatDialogRef<PresentComponent>, @Inject(MAT_DIALOG_DATA) data: TableReservation) {
    this.table = data;
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  valider() {
    if (this.nbPers >= 1 && this.nbPers <= this.table.nbPlaces+1) {
      this.table.reservation!.nbPersonnes = this.nbPers;
      console.log("Nb Pers : " + this.nbPers);
    } else {
      console.log("Erreur");
    }
  }
    
}
