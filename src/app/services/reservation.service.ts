import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private backURL = 'http://localhost:4200/reservations'

  constructor(private http: HttpClient) { }

  get_reservations() {
    return this.http.get<Reservation[]>(this.backURL + "/employe/reservation");
  }
}
