import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TableReservation } from '../../../interfaces/table-reservation';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TableRestaurantService } from '../../../services/table-restaurant.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CommandeComponent } from './commande/commande.component';

@Component({
  selector: 'app-service',
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
})
export class ServiceComponent {
  tables_restaurant: TableReservation[] = [];
  idRestaurant: number = 0;

  constructor(
    public titleService: Title,
    private tableService: TableRestaurantService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Tables occupées');
    const login = localStorage.getItem('login');
    // Récupérer l'ID du restaurant depuis l'URL
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idRestaurant = +id; // Convertir en nombre
        this.loadData();
      }
    })
  }

  loadData() {
    this.tableService
      .getTablesOccupees(this.idRestaurant)
      .subscribe((result) => {
        this.tables_restaurant = result
      })
  }

  openDialog(table: TableReservation) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = table;
    dialogConfig.width = '50vw';
    dialogConfig.height = '90vh';
    this.dialog.open(CommandeComponent, dialogConfig);
  }
}  

