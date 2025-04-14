export interface CommandeUpdate {
  idCommande: number;
  plats: {
    id: number;
    quantite: number;
  }[];
}
