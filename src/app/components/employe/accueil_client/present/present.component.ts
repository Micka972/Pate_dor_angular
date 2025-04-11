import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableReservation } from '../../../../interfaces/table-reservation';
import { PopupService } from '../../../../services/popup.service';
import { ReservationService } from '../../../../services/reservation.service';

@Component({
  selector: 'app-present',
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './present.component.html',
  styleUrl: './present.component.css',
})
export class PresentComponent {
  table: TableReservation;
  nbPers: number = 1;

  constructor(
    private popupService: PopupService,
    private reservationService: ReservationService,
    private dialogRef: MatDialogRef<PresentComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data: TableReservation
  ) {
    this.table = data;
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  valider() {
    if (this.nbPers >= 1 && this.nbPers <= this.table.nbPlaces + 1) {
      if (this.table.reservation && this.table.reservation.idReservation) {
        this.reservationService
          .updateReservation(this.table.reservation.idReservation, this.nbPers)
          .subscribe(
            (response) => {
              console.log('Réservation mise à jour avec succès!', response);
              this.dialogRef.close(); // ferme le popup
              this.router.navigate(['/employe']); // redirection
            },
            (error) => {
              console.error(
                'Erreur lors de la mise à jour de la réservation',
                error
              );
            }
          );
      } else {
        console.error('Aucune réservation associée à cette table.');
      }
    } else {
      console.log('Erreur : Nombre de personnes invalide');
    }
  }
}
