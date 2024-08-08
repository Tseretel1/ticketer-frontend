import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
 

interface JwtPayload {
  UserID: string; 
  email: string;
  role: string;
  exp: number;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  decodeToken(token: string): JwtPayload {
    return  jwt_decode.jwtDecode<JwtPayload>(token);
  }
  getUserId(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded.UserID;
  }
  getUserRole(token: string): string {
    const decoded = this.decodeToken(token);
    return decoded.role;
  }
  getuserEmail(token:string):string{
    const decoded = this.decodeToken(token);
    return decoded.email;
  }
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
}
