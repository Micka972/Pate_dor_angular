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
    private toast_service: ToastService,
    public titleService: Title,
  ) {
    this.form = new FormGroup({
      login: new FormControl(''),
      mdp: new FormControl(''),
    });
  }

  ngOnInit() {
    this.titleService.setTitle("La Pâte d'Or");
  }

  login() {
    if (this.form.valid) {
      const { login, mdp } = this.form.value;

      this.authService.login(login, mdp).subscribe({
        next: (response) => {
          this.toast_service.show("Connexion réussie !", "success");
          localStorage.setItem('token', response);
          this.router.navigate(['/accueil']);
        },
        error: (err) => {
          console.error('Erreur de connexion :', err);
          this.toast_service.show("Échec de la connexion. Vérifiez vos identifiants.", "error");
        }
      });
    } else {
      error: (err: any) => {
        console.error('Erreur de connexion :', err);
        this.toast_service.show("Échec de la connexion. Vérifiez vos identifiants.", "error");
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
