import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor(private http :HttpClient)
   { }
   private URL = "https://localhost:7081/"
   GetMyProfile(): Observable<any> {
     return this.http.get( this.URL+'user-profile');
   }
   search(searchTerm :string): Observable<any> {
    return this.http.get(`${this.URL}search-by-title/${searchTerm}`);
  }
   
}
