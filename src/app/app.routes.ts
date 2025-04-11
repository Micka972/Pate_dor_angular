import { Routes } from '@angular/router';
import { EmployeComponent } from './components/employe/employe/employe.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdministrateurComponent } from './components/administrateur/administrateur/administrateur.component';
import { ReservationComponent } from './components/employe/employe/reservation/reservation/reservation.component';
import { AccueilClientComponent } from './components/employe/employe/accueil_client/accueil-client/accueil-client.component';
import { PresentComponent } from './components/employe/employe/accueil_client/present/present/present.component';

export const routes: Routes = [
    { path: "accueil", component: ConnexionComponent},
    { path: "employe", component: EmployeComponent },
    { path: "employe/reservation/:id", component: ReservationComponent },
    { path: "employe/accueil_client/:id", component: AccueilClientComponent },
    { path: "administrateur", component: AdministrateurComponent },
    { path: "**", component: ConnexionComponent }
];
