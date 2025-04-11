import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private API_URL = "http://localhost:8080/restaurants/"

  constructor(private client : HttpClient) { }

  getRestaurant(id_restaurant : number) {
    return this.client.get<Restaurant>(this.API_URL + id_restaurant);
  }
}
