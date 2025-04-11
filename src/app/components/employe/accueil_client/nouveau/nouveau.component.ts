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
import { Reservation } from '../../../../interfaces/reservation';
import { TableReservation } from '../../../../interfaces/table-reservation';
import { PopupService } from '../../../../services/popup.service';
import { ReservationService } from '../../../../services/reservation.service';

@Component({
  selector: 'app-nouveau',
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './nouveau.component.html',
  styleUrl: './nouveau.component.css',
})
export class NouveauComponent {
  nbPers: number = 1;
  table: TableReservation;

  constructor(
    private popupService: PopupService,
    private dialogRef: MatDialogRef<NouveauComponent>,
    private reservationService: ReservationService,
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
      const nouvelleReservation: Reservation = {
        idUtilisateur: 1,
        nomUtilisateur: 'Doe',
        prenomUtilisateur: 'John',
        idRestaurant: this.table.idRestaurant,
        idTable: this.table.idTable,
        nbPlaces: this.table.nbPlaces,
        nbPersonnes: this.nbPers,
        dateReservation: new Date(),
        statut: 'occupée',
      };
  
      this.reservationService
        .postNewReservation(nouvelleReservation)
        .subscribe({
          next: (resa) => {
            console.log('Réservation créée !', resa);
            this.dialogRef.close(); // ferme le popup
            this.router.navigate(['/employe']); // redirection
          },
          error: (err) => {
            console.error('Erreur lors de la création de la réservation', err);
          },
        });
    } else {
      console.log('Erreur : Nombre de personnes invalide');
      console.log('Places : ' + this.table.nbPlaces);
      console.log('Pers : ' + this.nbPers);
    }
  }  
}
