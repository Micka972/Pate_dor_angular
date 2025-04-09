import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservation } from '../interfaces/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private API_URL = "http://localhost:8080/reservations/"

  constructor(private client : HttpClient) { }

  // Récupérer les réservations futures
  getReservationsFutures(id_restaurant : number) {
    return this.client.get(this.API_URL + id_restaurant);
  }

  // Mettre à jour une réservation avec PUT
  updateReservation(idReservation: number, nbPersonnes: number) {
    const url = `${this.API_URL}${idReservation}/${nbPersonnes}`;  // L'URL pour la mise à jour de la réservation
    return this.client.put(url, {});  // Pas de corps de requête, on envoie un objet vide
  }
}
