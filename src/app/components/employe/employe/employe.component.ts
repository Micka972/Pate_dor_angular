import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employe',
  imports: [],
  templateUrl: './employe.component.html',
  styleUrl: './employe.component.css'
})
export class EmployeComponent {
  constructor(public titleService: Title) {}

  ngOnInit() {
    const login = localStorage.getItem('login');
    this.titleService.setTitle("Bonjour, " + login);
  }
}
