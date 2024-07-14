import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './User_Interface';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private ValidationURL = 'https://localhost:7081/Registration Validation';

  constructor(private http: HttpClient) {}

  EmailValidation(email: string): Observable<any> {
    return this.http.post(this.ValidationURL, JSON.stringify(email), {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }

  private RegistrationURL = 'https://localhost:7081/Registration';

  registerUser(user: User, passcode: number): Observable<any> {
    const payload = {
      user,
      passcode,
    };

    return this.http.post<any>(this.RegistrationURL, payload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  onLogin(obj: any): Observable<any> {
    return this.http.post('https://localhost:7081/Login', obj);
  }
}
