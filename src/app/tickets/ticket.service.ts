import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  URL = "https://localhost:7081/"

  getTickets(): Observable<any> {
    return this.http.get(this.URL +  'all-tickets');
  }
  
  PopularEvents():Observable<any>{
    return this.http.get(this.URL + 'popular-events');
  }  

  MostPopularTickets():Observable<any>{
    return this.http.get(this.URL + 'popular-tickets ');
  } 

  UpcomingTickets():Observable<any>{
    return this.http.get(this.URL + 'upcoming-tickets');
  } 
  theaterTickets():Observable<any>{
    return this.http.get(this.URL + 'theater-tickets');
  } 
  otherTickets():Observable<any>{
    return this.http.get(this.URL + 'other-tickets');
  } 
  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.URL+ 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
