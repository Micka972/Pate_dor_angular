import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../interfaces/restaurant';
import { Commande } from '../interfaces/commande';
import { CommandeUpdate } from '../interfaces/commande_update';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private API_URL_RESTAURANT = 'http://localhost:8080/restaurants/';
  private API_URL_COMMANDE = 'http://localhost:8080/commandes';

  constructor(private client: HttpClient) {}

  getRestaurant(id_restaurant: number) {
    return this.client.get<Restaurant>(this.API_URL_RESTAURANT + id_restaurant);
  }

  createCommande(id_table: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.client
      .post<Commande>(this.API_URL_COMMANDE, { idTable: id_table }, { headers })
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de la création de la commande:', error);
          return throwError(error);
        })
      );
  }

  updateCommande(commande: CommandeUpdate) {
    console.log(commande.idCommande);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.client.put<CommandeUpdate>(
      `${this.API_URL_COMMANDE}/${commande.idCommande}`,
      commande,
      { headers }
    );
  }

  updateStatutCommande(id_commande: number, statut: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.client.put<CommandeUpdate>(
      `${this.API_URL_COMMANDE}/${id_commande}/${statut}`,
      { headers }
    );
  }
}
