import { TableRestaurant } from './table-restaurant';

export interface TableReservation extends TableRestaurant {
  statut: 'Réservée' | 'Libre';
  reservation?: {
    idReservation?: number;
    nomUtilisateur: string;
    prenomUtilisateur: string;
    dateReservation: Date;
    nbPersonnes: number;
  };
}
