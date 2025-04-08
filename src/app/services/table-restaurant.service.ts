import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableRestaurantService {
  private API_URL = "http://localhost:8080/tables/"

  constructor(private client : HttpClient) { }

  getTablesLibres(id_restaurant : number) {
    return this.client.get(this.API_URL + id_restaurant);
  }
}
