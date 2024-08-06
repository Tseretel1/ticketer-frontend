import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http :HttpClient) 
  {

  }
  private URL = "https://localhost:7081/api/Creator/"
  GetMytickets(): Observable<any> {
    return this.http.get( this.URL+'my-tickets');
  }
  
  GetMyProfile():Observable<any>{
    return this.http.get(this.URL + 'my-profile');
  } 
  deleteTicket(id: number): Observable<any> {
    const url = this.URL + `delete-tickets`;
  
    return this.http.request('DELETE', url, {
      body: id,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  } 
}
