import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../route-paths';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;
 

  private URL = this.BaseUrl.URL;

  login(login: login): Observable<any> {
    return this.http.post(this.URL + 'login', login);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.post(`${this.URL}email-validation/${email}`, {});
  }

  validatePasscode(passcode: passcode): Observable<any> {
    return this.http.post(this.URL + 'passcode-confirmation', passcode);
  }

  registration(reg: login): Observable<any> {
    return this.http.post(this.URL + 'user-registration', reg);
  }
}

export interface passcode {
  email: string;
  passcode: number;
  password: string;
}
export interface login {
  email: string;
  password: string;
}
