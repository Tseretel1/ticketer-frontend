import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullTicketService {

  private url = "https://localhost:7081/";

  constructor(private http: HttpClient) { }
  
  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.url}matching-ticket/${ticketId}`);
  }

  BuyTicket(ticketid: number): Observable<any> {
    return this.http.post<any>(`${this.url}buy-ticket`, { ticketid });
  }
}
