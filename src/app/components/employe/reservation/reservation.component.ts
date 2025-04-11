import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Reservation } from '../../../interfaces/reservation';
import { ReservationService } from '../../../services/reservation.service';

@Component({
  selector: 'app-reservation',
  imports: [CommonModule, RouterModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css',
})
export class ReservationComponent {
  reservations: Reservation[] = [];
  todayReservations: Reservation[] = [];
  futureReservationsByDate: Map<string, Reservation[]> = new Map();
  idRestaurant: number = 0;

  constructor(
    public titleService: Title,
    private reservationservice: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Réservations');
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.idRestaurant = +id;
        this.loadData();
      }
    });
  }

  loadData() {
    this.reservationservice
      .getReservationsFutures(this.idRestaurant)
      .subscribe((result) => {
        this.reservations = result;
        this.filterReservations();
      });
  }

  filterReservations() {
    const today = new Date();
    this.todayReservations = [];
    this.futureReservationsByDate.clear();

    for (let res of this.reservations) {
      const resDate = new Date(res.dateReservation);
      const isToday = resDate.toDateString() === today.toDateString();

      if (isToday) {
        this.todayReservations.push(res);
      } else {
        const options: Intl.DateTimeFormatOptions = {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        };
        const formattedDate = resDate.toLocaleDateString('fr-FR', options);

        if (!this.futureReservationsByDate.has(formattedDate)) {
          this.futureReservationsByDate.set(formattedDate, []);
        }

        this.futureReservationsByDate.get(formattedDate)!.push(res);
      }
    }
  }

  get futureReservationDates(): string[] {
    return Array.from(this.futureReservationsByDate.keys());
  }
}
