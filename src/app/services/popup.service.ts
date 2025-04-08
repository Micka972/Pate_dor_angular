import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PresentComponent } from '../components/employe/employe/accueil_client/present/present/present.component';


@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(PresentComponent);
  }
}