import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableReservation } from '../interfaces/table-reservation';

@Injectable({
  providedIn: 'root'
})
export class TableRestaurantService {
  private API_URL = "http://localhost:8080/tables/"

  constructor(private client : HttpClient) { }

  getTablesLibres(id_restaurant : number) {
    return this.client.get(this.API_URL+"libres/" + id_restaurant);
  }

  getTablesOccupees(id_restaurant : number) {
    return this.client.get<TableReservation[]>(this.API_URL+"occupees/" + id_restaurant);
  }
}