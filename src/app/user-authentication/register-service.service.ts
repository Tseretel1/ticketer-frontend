import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterServiceService {

  constructor(private http: HttpClient) { }
  private URL :string = "https://localhost:7081/";
  
  login(login: login): Observable<any> {
    return this.http.post(this.URL + "login", login);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.post(`${this.URL}email-validation/${email}`, {});
  }
  
  validatePasscode(passcode: passcode): Observable<any> {
    return this.http.post(this.URL + "passcode-confirmation", passcode);
  }
  
  registration(reg: login): Observable<any> {
    return this.http.post(this.URL + "user-registration", reg);
  }    
}

export interface passcode{
  email:string;
  passcode :number;
  password :string;
}
export interface login{
  email:string;
  password :string;
}
