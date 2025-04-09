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
  idRestaurant = 1;


  constructor(private service: ReservationService) {
    console.log('id du restaurant :', this.idRestaurant);
    
    service.getReservationsFutures(this.idRestaurant).subscribe(response => {
      console.log('reservations : ', response );
      
    this.reservations = response;
    });
  }
}
