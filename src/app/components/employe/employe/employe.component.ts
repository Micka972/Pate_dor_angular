import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employe',
  imports: [RouterModule],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent {
  idRestaurant: string = '';

  constructor(public titleService: Title) {}

  ngOnInit() {
    const login = localStorage.getItem('login');
    this.idRestaurant = localStorage.getItem('idRestaurant') || '';
    this.titleService.setTitle("Bonjour, " + login);
  }
}
