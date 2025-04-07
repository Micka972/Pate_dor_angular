import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private API_URL = "http://localhost:8080/reservations/"

  constructor(private client : HttpClient) { }

  getReservationsFutures(id_restaurant : number) {
    return this.client.get(this.API_URL + id_restaurant);
  }
}
