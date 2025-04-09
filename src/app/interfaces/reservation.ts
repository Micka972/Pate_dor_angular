export interface Reservation {
  idReservation?: number;
  idUtilisateur: number;
  nomUtilisateur: string;
  prenomUtilisateur: string;
  idRestaurant: number;
  idTable: number;
  nbPlaces: number;
  nbPersonnes: number;
  dateReservation: Date;
  statut: string;
}
