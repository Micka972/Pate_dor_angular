import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private apiUrl = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const body = { nom: username, mdp: password };

    return this.http.post(this.apiUrl, body, {responseType: 'text'});
  }
}
