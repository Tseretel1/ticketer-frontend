import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-full-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-ticket.component.html',
  styleUrls: ['./full-ticket.component.scss'],
  providers: [
    DatePipe
  ]
})
export class FullTicketComponent implements OnInit {

  id: number = 0;
  tickets: any[] = [];
  matchingTicket: any = null;

  constructor(private router: ActivatedRoute, private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
      this.findMatchingTicket();
    });
    this.http.get('https://localhost:7081/See Tickets').subscribe(
      (resp: any) => {
        console.log(resp);
        this.tickets = resp;
        this.findMatchingTicket();
      },
      (error: any) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }

  findMatchingTicket() {
    this.matchingTicket = null; 

    for (let ticket of this.tickets) {
      if (ticket.id === this.id) {
        this.matchingTicket = ticket;
        break; 
      }
    }

    console.log('Matching Ticket:', this.matchingTicket);
  }

  formatDate(date: string | null): string {
    if (!date) {
      return '';
    }
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm') || '';
  }
}
