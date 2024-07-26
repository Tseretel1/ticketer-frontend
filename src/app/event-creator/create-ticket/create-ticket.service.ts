import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './Interface';
import { AbstractControl, ControlContainer, FormBuilder, FormControl, FormGroup, MaxLengthValidator, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {
  private TicketURL: string = "https://localhost:7081/Add%20New%20Tickets";
  constructor(private http: HttpClient,private authService :AuthService) {    
  }

  createTicket(ticket: Ticket): Observable<any> {
    return this.http.post(this.TicketURL, ticket, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
  onLogin(user: Ticket): Observable<any> {
    return this.http.post(this.TicketURL, user);
  }
}
