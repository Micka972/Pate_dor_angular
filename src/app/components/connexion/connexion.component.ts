import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConnexionService } from '../../services/connexion.service';
import { TokenService } from '../../services/token.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css',
})
export class ConnexionComponent {
  form: FormGroup;

  constructor(
    private authService: ConnexionService,
    private router: Router,
    public titleService: Title,
    private tokenService: TokenService,
    private toastService: ToastService
    ) {
    this.form = new FormGroup({
      login: new FormControl(''),
      mdp: new FormControl(''),
    });
  }

  ngOnInit() {
    this.titleService.setTitle('Connexion');
  }

  login() {
    if (this.form.valid) {
      const { login, mdp } = this.form.value;

      this.authService.login(login, mdp).subscribe((response) => {
        console.log('Connexion réussie', response);
        localStorage.setItem('token', response);
        localStorage.setItem('login', login);
        const idRestaurant = this.tokenService.getIdRestaurant(response);
        localStorage.setItem('idRestaurant', idRestaurant?.toString() ?? '');
        this.router.navigate(['/employe']);
      });
    } else {
      error: (err: any) => {
        console.error('Erreur de connexion :', err);
        this.toastService.show("Échec de la connexion. Vérifiez vos identifiants.", "error");
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
