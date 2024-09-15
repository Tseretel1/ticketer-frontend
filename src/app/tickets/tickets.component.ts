import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { find, max, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule,FormsModule,MatIcon,DatePipe],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',

})
export class TicketsComponent implements OnInit, OnDestroy{
 
  AllTickets: any[] = [];
  tickets: any[] = [];
  searchTerm: string = ''; 
  topTickets: Set<number> = new Set(); 

  Popularevent: any[] = [];
  MostPopularEvent: any = null;
  private intervalId: any;
  private eventsSubscription: Subscription | undefined;
  
  constructor(
    private ticketService: TicketService,
  ) {
  }







  ngOnInit(): void {
    this.fetchPopularEvents();
    this.loadTickets();
  }
  TicketViewCount(id:number){
    this.ticketService.TicketViewCount(id).subscribe(
      (resp:any)=>{
      },
      (error:any)=>{
      }
    )
  }

  loadTickets() {
    this.ticketService.getTickets().subscribe(
      (resp: any[]) => {
        this.AllTickets = resp;
        this.tickets = this.AllTickets;
        this.getTopTickets(this.tickets);
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
  }

  getTopTickets(tickets: any[]): void {
    const sortedTickets = [...tickets]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
    const topTicketIds = new Set(sortedTickets.map(tkt => tkt.id));
    this.topTickets = topTicketIds;
  }
  

  isTopTicket(ticket: any): boolean {
    return this.topTickets.has(ticket.id);
  }
  
  AnimationFilter() {
    this.tickets = this.AllTickets.filter(ticket => ticket.genre === 'Animation');
  }

  FootballFilter() {
    this.tickets = this.AllTickets.filter(ticket => ticket.genre === 'Football');
  }

  MusicFilter() {
    this.tickets = this.AllTickets.filter(ticket => ticket.genre === 'Music');
  }

  resetFilters() {
    this.tickets = this.AllTickets;
  }

  onFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    switch (selectedValue) {
      case 'Animation':
        this.AnimationFilter();
        break;
      case 'Music':
        this.MusicFilter();
        break;
      case 'Football':
        this.FootballFilter();
        break;
      case 'All':
        this.resetFilters();
        break
      default:
        this.resetFilters();
        break;
    }
  }

  searchTickets() {
    if (this.searchTerm) {
      this.tickets = this.AllTickets.filter(ticket =>
        ticket.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.tickets = this.AllTickets;
    }
  }
  

fetchPopularEvents(): void {
  this.eventsSubscription = this.ticketService.PopularEvents().subscribe(
    (resp: any) => {
      this.Popularevent = resp;
      this.startEventLoop();
    },
    (error) => {
      console.error('Error fetching event data:', error);
    }
  );
}
PhotoOpacity: number = 1;
intervalMs: number = 5000;
fadeDurationMs: number = 200;

startEventLoop(): void {
  const maxIndex = 2;
  let currentIndex = Math.floor(Math.random() * (maxIndex + 1));
  this.MostPopularEvent = this.Popularevent[currentIndex];

  setInterval(() => {
    this.PhotoOpacity = 0;

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % this.Popularevent.length;
      this.MostPopularEvent = this.Popularevent[currentIndex];
      this.PhotoOpacity = 1;
    }, this.fadeDurationMs);
  }, this.intervalMs);
}

ngOnDestroy(): void {
  if (this.intervalId) {
    clearInterval(this.intervalId);
  }
  if (this.eventsSubscription) {
    this.eventsSubscription.unsubscribe();
  }
}

}

