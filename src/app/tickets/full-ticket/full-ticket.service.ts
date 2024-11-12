import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class FullTicketService {

  BaseUrl: URL = URLs;

  
  private url = this.BaseUrl.URL;

  constructor(private http: HttpClient) {}

  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.url}matching-ticket/${ticketId}`);
  }

  BuyTicket(ticketid: number, ticketCount: number): Observable<any> {
    return this.http.post<any>(`${this.url}buy-ticket`, {
      ticketid,
      ticketCount,
    });
  }
}
