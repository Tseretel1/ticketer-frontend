import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';
import { BaseURL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class CreateTicketService {
  BaseUrl: any = BaseURL;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}
  GetActiveTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.BaseUrl.CreatorURL}active-tickets?pageIndex=${pageIndex}`);
  }

  GetExpiredTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.BaseUrl.CreatorURL}expired-tickets?pageIndex=${pageIndex}`);
  }
}
