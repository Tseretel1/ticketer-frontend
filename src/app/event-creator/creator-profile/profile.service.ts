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
  
  GetMytickets(): Observable<any> {
    return this.http.get('https://localhost:7081/My Tickets');
  }
  
  GetMyProfile():Observable<any>{
    return this.http.get('https://localhost:7081/My Profile');
  } 
  deleteTicket(id: number): Observable<any> {
    const url = `https://localhost:7081/DeleteTickets%20Creator`;
  
    return this.http.request('DELETE', url, {
      body: id,
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  } 
}
