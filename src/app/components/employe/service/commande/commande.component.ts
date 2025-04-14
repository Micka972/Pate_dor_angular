import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableReservation } from '../../../../interfaces/table-reservation';
import { PopupService } from '../../../../services/popup.service';
import { CommandeService } from '../../../../services/commande.service';
import { Restaurant } from '../../../../interfaces/restaurant';
import { Commande } from '../../../../interfaces/commande';
import { CommandeUpdate } from '../../../../interfaces/commande_update';

@Component({
  selector: 'app-commande',
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css',
})
export class CommandeComponent {
  table: TableReservation;
  idRestaurant: number = 0;
  restaurant?: Restaurant;
  commande!: Commande;
  commandeUpdate!: CommandeUpdate;
  quantites: { [idPlat: number]: number } = {};

  constructor(
    private commandeService: CommandeService,
    private popupService: PopupService,
    private dialogRef: MatDialogRef<CommandeComponent>,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) data: TableReservation
  ) {
    this.table = data;
    this.idRestaurant = this.table.idRestaurant;
    this.loadData();
  }

  loadData() {
    // Récupérer les informations sur le restaurant
    this.commandeService.getRestaurant(this.idRestaurant).subscribe(
      (result) => {
        this.restaurant = result;
      },
      (error) => {
        console.error('Erreur lors du chargement du restaurant', error);
      }
    );

    // Créer la commande pour la table spécifique
    this.commandeService.createCommande(this.table.idTable).subscribe(
      (result) => {
        this.commande = result;
        console.log(result);
        if (this.commande && this.commande.id) {
          this.commandeUpdate = {
            idCommande: this.commande.id!,
            plats: [],
          };
          console.error('Commande récupérée ');
          console.error('idCommande :' + this.commande.id);
        } else {
          console.error('Commande non récupérée ou idCommande manquant');
          console.error('idCommande :' + this.commande.id);
        }
      },
      (error) => {
        console.error('Erreur lors de la création de la commande', error);
      }
    );
  }

  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCategories(plats: any[]) {
    const categories = plats.map((p) => p.categorie.libelle);
    return [...new Set(categories)]; // unicité
  }

  getPlatsParCategorie(plats: any[], categorie: string) {
    return plats.filter((p) => p.categorie.libelle === categorie);
  }

  updateQuantite(platId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.quantites[platId] = input.valueAsNumber || 0;
    this.mettreAJourCommandeDepuisQuantites();
    console.log(JSON.stringify(this.commandeUpdate));
  }

  terminerCommande() {
    if (this.commandeUpdate && this.commandeUpdate.idCommande) {
      this.commandeService.updateCommande(this.commandeUpdate).subscribe(
        (result) => {
          this.commandeUpdate = result;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la commande', error);
        }
      );
    } else {
      console.error('commandeUpdate ou idCommande non valide');
    }
    this.commandeService
      .updateStatutCommande(this.commande.id!, 'passee')
      .subscribe((result) => {
        this.commandeUpdate = result;
      });
      this.dialogRef.close(); // ferme le popup
      this.router.navigate(['/employe']); // redirection
  }

  mettreAJourCommandeDepuisQuantites() {
    if (!this.commandeUpdate || !this.commandeUpdate.idCommande) {
      console.error('commandeUpdate ou idCommande non initialisé');
      return;
    }

    const plats = Object.entries(this.quantites)
      .filter(([_, quantite]) => quantite > 0)
      .map(([idPlat, quantite]) => ({
        id: Number(idPlat),
        quantite: quantite,
      }));

    // Vérification pour s'assurer que 'plats' est bien un tableau
    if (Array.isArray(plats)) {
      this.commandeUpdate.plats = plats;
    } else {
      console.error("Erreur : 'plats' n'est pas un tableau valide");
    }
  }
}
