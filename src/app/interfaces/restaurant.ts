export interface Restaurant {
	id?: number;
	nom: string;
	adresse: string;
	telephone: string;
	email: string;
	carte: {
        id?: number;
        nom: string;
        description: string;
        plats: {
            id?: number;
            nom: string;
            prix: number;
            description: string;
            categorie: {
                id?: number;
                libelle: string; 
            };
        }[];
    };
}
