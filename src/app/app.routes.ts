import { Routes } from '@angular/router';
import { EmployeComponent } from './components/employe/employe.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { AdministrateurComponent } from './components/administrateur/administrateur.component';
import { ReservationComponent } from './components/employe/reservation/reservation.component';
import { AccueilClientComponent } from './components/employe/accueil_client/accueil-client.component';
import { ServiceComponent } from './components/employe/service/service.component';

export const routes: Routes = [
    { path: "accueil", component: ConnexionComponent},
    { path: "employe", component: EmployeComponent },
    { path: "employe/reservation/:id", component: ReservationComponent },
    { path: "employe/accueil_client/:id", component: AccueilClientComponent },
    { path: "employe/service/:id", component: ServiceComponent },
    { path: "administrateur", component: AdministrateurComponent },
    { path: "**", component: ConnexionComponent }
];
