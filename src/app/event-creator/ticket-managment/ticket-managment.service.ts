import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {
  private URL = "https://localhost:7081/api/Creator/"

  constructor(private http: HttpClient, private authService: AuthService, private datePipe: DatePipe) { }
  GetActiveTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.URL}active-tickets?pageIndex=${pageIndex}`);
  }

  GetExpiredTickets(pageIndex: number): Observable<any> {
    return this.http.get(`${this.URL}expired-tickets?pageIndex=${pageIndex}`);
  }
}
