import { Component } from '@angular/core';
import { ReservationService } from '../../../../../services/reservation.service';
import { CommonModule } from '@angular/common';
import { Reservation } from '../../../../../interfaces/reservation';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  reservations : Reservation[] = [];
  idRestaurant: number = 0;


  constructor(private service: ReservationService) {
    const idRestaurantString = localStorage.getItem('idRestaurant');
    this.idRestaurant = idRestaurantString ? +idRestaurantString : 0;
  }

  ngOnInit() {
    console.log('id du restaurant :', this.idRestaurant);

    if (this.idRestaurant) {
      this.service.getReservationsFutures(this.idRestaurant).subscribe(response => {
        console.log('Réservations reçues :', response);
        this.reservations = response;
      });
    } else {
      console.warn('Aucun idRestaurant trouvé');
    }
  
  }
}
