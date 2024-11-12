import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class CreateTicketService {
  BaseUrl: URL = URLs;
  private URL = this.BaseUrl.CreatorURL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}
  GetActiveTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.URL}active-tickets?pageIndex=${pageIndex}`);
  }

  GetExpiredTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.URL}expired-tickets?pageIndex=${pageIndex}`);
  }
}
