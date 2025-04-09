import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;          // correspond au username
  idRestaurant: number; // mis dans le token
  exp: number;          // date d'expiration
  iat: number;          // date d'émission
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {}

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }

  getIdRestaurant(token: string): number | null {
    const payload = this.decodeToken(token);
    return payload?.idRestaurant || null;
  }

  isTokenExpired(token: string): boolean {
    const payload = this.decodeToken(token);
    if (!payload) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  }
}

