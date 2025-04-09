import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public titleService: Title, private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle("La Pâte d'Or");
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('login');
    localStorage.removeItem('idRestaurant');
    this.router.navigate(['/']);
  }
}
