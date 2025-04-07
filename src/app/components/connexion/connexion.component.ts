import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-connexion',
  imports: [],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  constructor(public titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("La Pâte d'Or");
  }
}
