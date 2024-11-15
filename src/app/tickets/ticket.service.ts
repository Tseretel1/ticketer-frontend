import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { BaseURL} from '../route-paths'
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}
  BaseUrl: any= BaseURL;
 


  MostPopularTickets():Observable<any>{
    return this.http.get(this.BaseUrl.URL + 'popular-tickets ');
  }

  UpcomingTickets(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'upcoming-tickets');
  }

  otherTickets(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'other-tickets');
  }

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.BaseUrl.URL + 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
