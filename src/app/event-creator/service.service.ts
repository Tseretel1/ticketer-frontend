import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient )
  { }
  private URL = "https://localhost:7081/api/Creator/";  

  private LoginURL = this.URL + 'creator-account-login';

  onLogin(login: CreatorAccountLogin): Observable<any> {
    const params = new HttpParams()
      .set('username', login.userName)
      .set('password', login.password)
    return this.http.get(this.LoginURL, { params });
  }
}

export interface CreatorAccountLogin{
  userName :string,
  password:string
}