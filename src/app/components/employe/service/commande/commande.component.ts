import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TableReservation } from '../../../../interfaces/table-reservation';
import { PopupService } from '../../../../services/popup.service';
import { CommandeService } from '../../../../services/commande.service';
import { Restaurant } from '../../../../interfaces/restaurant';

@Component({
  selector: 'app-commande',
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './commande.component.html',
  styleUrl: './commande.component.css'
})
export class CommandeComponent {
  table: TableReservation;
  idRestaurant: number = 0;
  restaurant?: Restaurant;
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
    console.log("CommandeComponent chargé 2!");
  }
  
  loadData() {
    this.commandeService
      .getRestaurant(this.idRestaurant)
      .subscribe((result) => {
        this.restaurant = result;
      });
  }
  openPopup() {
    this.popupService.openPopup();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  getCategories(plats: any[]) {
    const categories = plats.map(p => p.categorie.libelle);
    return [...new Set(categories)]; // unicité
  }
  
  getPlatsParCategorie(plats: any[], categorie: string) {
    return plats.filter(p => p.categorie.libelle === categorie);
  }

  updateQuantite(platId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.quantites[platId] = input.valueAsNumber || 0;
  }  
}
