import { Routes } from '@angular/router';
import { EmployeComponent } from './components/employe/employe/employe.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdministrateurComponent } from './components/administrateur/administrateur/administrateur.component';
import { ReservationComponent } from './components/employe/employe/reservation/reservation/reservation.component';
import { AccueilClientComponent } from './components/employe/employe/accueil_client/accueil-client/accueil-client.component';
import { PresentComponent } from './components/employe/employe/accueil_client/present/present/present.component';

export const routes: Routes = [
    { path: "employe", component: EmployeComponent },
    { path: "employe/reservation", component: ReservationComponent },
    { path: "employe/accueil_client/:id", component: AccueilClientComponent },
    { path: "employe/accueil_client/present/:id", component: PresentComponent },
    { path: "administrateur", component: AdministrateurComponent },
    { path: "**", component: ConnexionComponent }
];
