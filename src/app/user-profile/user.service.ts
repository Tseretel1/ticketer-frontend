import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL} from '../route-paths';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  BaseUrl: any = BaseURL;
 

  GetMyProfile(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'user-profile');
  }
  GetActiveTickets(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'my-active-tickets');
  }
  GetExpiredTickets(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'my-expired-tickets');
  }
  TicketInstances(id: number): Observable<any> {
    return this.http.get<any>(`${this.BaseUrl.URL}my-tickets-instances/${id}`);
  }
}
