import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient )
  { }
  private URL = "https://localhost:7081/";  
  loginToAccount(accountID: number): Observable<any> { 
    return this.http.get(`${this.URL}creator-account-login/${accountID}`);

  }

  accountCreated(): Observable<any> { 
    return this.http.get(`${this.URL}account-created`);
  }

  
  myCreatorAccounts(): Observable<any> {
    return this.http.get(this.URL + "my-creator-account");
  }  
  onRegister(r: Register): Observable<any> {
    return this.http.post(this.URL + "register-as-creator", r);
  }  

  accountCreation(accountName: string): Observable<any> {
    const payload = {
      accountName,
    };
    return this.http.post<any>(this.URL + "creator-account-registration", payload, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
    });  
  }
}


export interface Login{
  userName :string,
  password:string
}
export interface Register{
  PersonalID :number,
  PhoneNumber :number,
  IdCardPhoto:number
}
export interface CreatorAccount{
  UserName : string,
  Logo : string,
  Password: string,
}