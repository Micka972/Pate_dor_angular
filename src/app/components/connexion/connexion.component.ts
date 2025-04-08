import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent {
  constructor(public titleService: Title) {}

  form: FormGroup;

  constructor(private authService: ConnexionService, private router: Router) {
    this.form = new FormGroup({
      login: new FormControl(''),
      mdp: new FormControl('')
    });
  }

  ngOnInit() {
    this.titleService.setTitle("La Pâte d'Or");
  }

  login() {
    if(this.form.valid) {
      const { login, mdp } = this.form.value;

      this.authService.login(login, mdp).subscribe((response) => {
          console.log('Connexion réussie', response);
          localStorage.setItem('token', response);
          
          this.router.navigate(['/accueil']);
        });
    }
  }
}
