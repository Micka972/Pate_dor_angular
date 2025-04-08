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

  constructor(private service: ReservationService) {
    service.get_reservations().subscribe(response => {
      this.reservations = response;
    });
  }
}
