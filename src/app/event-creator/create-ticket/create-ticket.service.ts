import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './Interface';
import { AuthService } from '../../auth.service';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {
  private URL = "https://localhost:7081/api/Creator/"

  constructor(private http: HttpClient, private authService: AuthService, private datePipe: DatePipe) { }

  GetMytickets(): Observable<any> {
    return this.http.get( this.URL + 'my-tickets');
  }
  formatDateToBackend(date: Date): string {
    const datePart = this.datePipe.transform(date, 'yyyy-MM-dd');
    const timePart = this.datePipe.transform(date, 'HH:mm:ss.SSS');
    return `${datePart}T${timePart}`;
  }

  combineDateAndTime(date: string, time: string): string {
    const combinedDateTime = `${date}T${time}:00.000`;
    return this.formatDateToBackend(new Date(combinedDateTime));
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(this.URL + "add-new-tickets", ticket, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
    
  }
}
