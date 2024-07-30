import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getTickets(): Observable<any> {
    return this.http.get('https://localhost:7081/all Tickets');
  }
  
  PopularEvents():Observable<any>{
    return this.http.get('https://localhost:7081/Popular Events');
  }   

  TicketURL = "https://localhost:7081/View Count";
  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.TicketURL, id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
