import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TableRestaurantService } from '../../../../../services/table-restaurant.service';
import { TableRestaurant } from '../../../../../interfaces/table-restaurant';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReservationService } from '../../../../../services/reservation.service';
import { Reservation } from '../../../../../interfaces/reservation';
import { TableReservation } from '../../../../../interfaces/table-reservation';
import { forkJoin } from 'rxjs';
import { PresentComponent } from '../present/present/present.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { NouveauComponent } from '../nouveau/nouveau/nouveau.component';

@Component({
  selector: 'app-accueil-client',
  standalone: true,
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './accueil-client.component.html',
  styleUrl: './accueil-client.component.css',
})
export class AccueilClientComponent {
  tables_restaurant: TableReservation[] = [];
  reservations: Reservation[] = [];
  idRestaurant: number = 0;

  constructor(
    public titleService: Title,
    private tableService: TableRestaurantService,
    private reservationservice: ReservationService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Accueil clientèle');
    // Récupérer l'ID du restaurant depuis l'URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idRestaurant = +id; // Convertir en nombre
        this.loadData();
      }
    });
  }

  // forkjoin permet de lancer les 2 requêtes et attendre les deux
  loadData() {
    forkJoin({
      tables: this.tableService.getTablesLibres(this.idRestaurant),
      reservations: this.reservationservice.getReservationsFutures(
        this.idRestaurant
      ),
    }).subscribe(({ tables, reservations }) => {
      this.reservations = reservations as Reservation[];
      const today = new Date();
      console.log('Today:', today);

      this.tables_restaurant = (tables as TableRestaurant[]).map((table) => {
        // Filtrer les réservations pour aujourd'hui pour cette table
        const reservationsForToday = this.reservations.filter((res) => {
          const resDate = new Date(res.dateReservation);
          console.log(`Reservation date for table ${table.idTable}:`, resDate);

          // Comparer seulement la date (pas l'heure) et ignorer les réservations du passé si elles ne sont pas encore terminées
          return (
            res.idTable === table.idTable &&
            resDate.getDate() === today.getDate() &&
            resDate.getMonth() === today.getMonth() &&
            resDate.getFullYear() === today.getFullYear()
          );
        });

        console.log(
          `Reservations for table ${table.idTable}:`,
          reservationsForToday
        );

        if (reservationsForToday.length > 0) {
          // Trier par heure croissante (plus tôt d'abord)
          const firstReservation = reservationsForToday.sort((a, b) => {
            const aTime = new Date(a.dateReservation).getTime();
            const bTime = new Date(b.dateReservation).getTime();
            return aTime - bTime;
          })[0]; // Prendre la première après le tri

          console.log(
            `First reservation for table ${table.idTable}:`,
            firstReservation
          );

          // Si la première réservation est valide
          if (
            firstReservation &&
            firstReservation.nomUtilisateur &&
            firstReservation.prenomUtilisateur
          ) {
            return {
              ...table,
              statut: 'Réservée',
              reservation: {
                idReservation: firstReservation.idReservation,
                nomUtilisateur: firstReservation.nomUtilisateur,
                prenomUtilisateur: firstReservation.prenomUtilisateur,
                dateReservation: firstReservation.dateReservation,
                nbPersonnes: firstReservation.nbPersonnes,
              },
            };
          } else {
            console.warn(`Aucune donnée pour la table ${table.idTable}`);
          }
        }

        return {
          ...table,
          statut: 'Libre',
        };
      });
    });
  }

  openDialog(table: TableReservation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = table;
    dialogConfig.width = '50vw';
    dialogConfig.height = '50vh';
    if (table.statut === 'Réservée') {
      this.dialog.open(PresentComponent, dialogConfig);      
    } else {
      this.dialog.open(NouveauComponent, dialogConfig);      
    }
  }
}
