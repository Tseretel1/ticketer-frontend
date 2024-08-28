import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http :HttpClient)
   { }
   private URL = "https://localhost:7081/"
   GetMyProfile(): Observable<any> {
     return this.http.get( this.URL+ 'user-profile');
   }
   GetMyTickets(): Observable<any> {
    return this.http.get( this.URL+ 'my-tickets');
  }
}
