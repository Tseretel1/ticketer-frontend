import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class FullTicketService {

  BaseUrl: any = BaseURL;

  

  constructor(private http: HttpClient) {}

  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.BaseUrl.URL}matching-ticket/${ticketId}`);
  }

  BuyTicket(ticketid: number, ticketCount: number): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl.URL}buy-ticket`, {
      ticketid,
      ticketCount,
    });
  }
}
