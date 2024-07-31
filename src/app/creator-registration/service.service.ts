import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {

  constructor(private http :HttpClient) 
  {

  }
  private CreatorURL = "https://localhost:7081/Register As creator";
  CreatorRegistration(creatordata:Creator): Observable<any> {
    return this.http.post(this.CreatorURL, creatordata, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
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
