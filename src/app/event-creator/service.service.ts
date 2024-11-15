import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../route-paths';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  constructor(private http : HttpClient )
  { }
  BaseUrl: any = BaseURL;

  
  loginToAccount(accountID: number): Observable<any> {
    return this.http.get(`${this.BaseUrl.URL}creator-account-login/${accountID}`);
  }

  accountCreated(): Observable<any> {
    return this.http.get(`${this.BaseUrl.URL}account-created`);
  }

  myCreatorAccounts(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'my-creator-account');
  }
  onRegister(r: Register): Observable<any> {
    return this.http.post(this.BaseUrl.URL + 'register-as-creator', r);
  }

  accountCreation(accountName: string): Observable<any> {
    const payload = {
      accountName,
    };
    return this.http.post<any>(
      this.BaseUrl.URL + 'creator-account-registration',
      payload,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }
}

export interface Login {
  userName: string;
  password: string;
}
export interface Register {
  PersonalID: number;
  PhoneNumber: number;
  IdCardPhoto: number;
}
export interface CreatorAccount {
  UserName: string;
  Logo: string;
  Password: string;
}
