import { Component, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  providers:[
    DatePipe
  ]
})
export class TicketsComponent implements OnInit{
 
  public tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private datePipe: DatePipe 
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (resp: any) => {
        console.log(resp);
        this.tickets = resp;
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
  }

  formatDate(date: string | null): string {
    if (!date) {
      return ''; 
    }
    return this.datePipe.transform(date, 'yyyy-MM  dd HH:mm') || '';
  }
}
