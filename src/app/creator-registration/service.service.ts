import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor(private http :HttpClient) 
  {

  }
  private URL = "https://localhost:7081/api/Creator/"
  
  private CreatorURL = this.URL + "register-as-creator";
  CreatorRegistration(creatordata:Creator): Observable<any> {
    return this.http.post(this.CreatorURL, creatordata, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
   }

   private CheckURL =this.URL + "check-creator";
   CheckCreatorService(): Observable<any> {
    return this.http.get(this.CheckURL, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json'
    });
  }
}
export interface Creator{
  PersonalID :number,
  PhoneNumber :number,
  IdCardPhoto :string,
  UserID:number,
  Verified:boolean,
}
