import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { URLs, URL} from '../route-paths'
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;
 

   private URL = this.BaseUrl.URL;

  MostPopularTickets():Observable<any>{
    return this.http.get(this.URL + 'popular-tickets ');
  }

  UpcomingTickets(): Observable<any> {
    return this.http.get(this.URL + 'upcoming-tickets');
  }

  otherTickets(): Observable<any> {
    return this.http.get(this.URL + 'other-tickets');
  }

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.URL + 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
