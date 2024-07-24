import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from './Interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CreateTicketService {
  private TicketURL: string = "https://localhost:7081/Add%20New%20Tickets";
  ticketForm: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.ticketForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      Genre: ['', Validators.required],
      Price: [0, Validators.required],
      Activation_Date: ['', Validators.required],
      Expiration_Date: ['', Validators.required],
      Photo: ['', Validators.required],
      PublisherID: [0, Validators.required], 
      TicketCount:[0]
    });
    
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
