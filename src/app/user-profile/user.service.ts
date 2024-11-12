import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs ,URL} from '../route-paths';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;
 

  private URL = this.BaseUrl.URL;

  GetMyProfile(): Observable<any> {
    return this.http.get(this.URL + 'user-profile');
  }
  GetActiveTickets(): Observable<any> {
    return this.http.get(this.URL + 'my-active-tickets');
  }
  GetExpiredTickets(): Observable<any> {
    return this.http.get(this.URL + 'my-expired-tickets');
  }
  TicketInstances(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}my-tickets-instances/${id}`);
  }
}
