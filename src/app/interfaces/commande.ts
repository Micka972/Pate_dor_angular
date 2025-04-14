export interface Commande {
  id?: number;
  idReservation: number;
  idTable: number;
  idRestaurant: number;
  statut: string;
  plats?: {
    id?: number;
    nom: string;
    prix: number;
    description: string;
    categorie: {
      id?: number;
      libelle: string;
    };
    quantite?: number;
  }[];
}
