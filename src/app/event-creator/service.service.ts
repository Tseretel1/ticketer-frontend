import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient )
  { }
  private apicall = "https://localhost:7081/";  

  private LoginURL = this.apicall + 'creator-account-login';

  private RegisterURL = this.apicall + 'register-as-creator';
  
  onLogin(login: Login): Observable<any> {
    const params = new HttpParams()
      .set('username', login.userName)
      .set('password', login.password)
    return this.http.get(this.LoginURL, { params });
  }

  onRegister(r: Register): Observable<any> {
    return this.http.post(this.RegisterURL, r);
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