import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
 

interface JwtPayload {
  id: number;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  decodeToken(token: string): JwtPayload {
    return jwt_decode.jwtDecode(token);
  }


    getUserId(token: string): number {
    const decoded = this.decodeToken(token);
    return decoded.id;
  }

  getUserRole(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded.role;
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}
