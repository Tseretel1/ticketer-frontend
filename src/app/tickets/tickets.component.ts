import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { find, max, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule,FormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  providers:[
    DatePipe,
    NgModel
  ]
})
export class TicketsComponent implements OnInit, OnDestroy{
 
  AllTickets: any[] = [];
  tickets: any[] = [];
  searchTerm: string = ''; 
  topTickets: any[] = [];
  loading: boolean = false;

  Popularevent: any[] = [];
  MostPopularEvent: any = null;
  private intervalId: any;
  private eventsSubscription: Subscription | undefined;
  
  constructor(
    private ticketService: TicketService,
    private datePipe: DatePipe ,
  ) {
    this.datePipe = new DatePipe('en-US');
  }

  ngOnInit(): void {
    this.fetchPopularEvents();
    this.loadTickets();
  }
  TicketViewCount(id:number){
    console.log("Ticket id " + id);
    this.ticketService.TicketViewCount(id).subscribe(
      (resp:any)=>{
        console.log(resp);
      },
      (error:any)=>{

      }
    )
  }


  loadTickets() {
    this.loading = true;
    this.ticketService.getTickets().subscribe(
      (resp: any[]) => {
        this.AllTickets = resp;
        this.tickets = this.AllTickets;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
        this.loading = false;
      }
    );
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




getTopTickets(tickets: any[], genre: string): any[] {
  return tickets
    .filter(ticket => ticket.genre === genre)
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);
}

isTopTicket(ticket: any): boolean {
  return this.topTickets.includes(ticket);
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

  monthNames:any = {
    1: 'January',   2: 'February',  3: 'March',     4: 'April',
    5: 'May',       6: 'June',      7: 'July',      8: 'August',
    9: 'September', 10: 'October',  11: 'November', 12: 'December'
};

MonthNumber : number = 0;
MonthName: string = " ";
DayNumber: number = 0;
Hour : string = "" ;

  formatDate(date: string | null): string {
    if (!date) {
      return ''; 
    }
    const Month = this.datePipe.transform(date, 'M');
    if (Month) {
      this.MonthNumber = parseInt(Month, 10);
    }
    const Day = this.datePipe.transform(date, 'd');
    const Hour = this.datePipe.transform(date,'h : mm')
    this.MonthName = this.monthNames[ this.MonthNumber ];
    return this.MonthName + " " + Day;
  }
  formatHour(date: string | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    const formattedHour = this.datePipe.transform(parsedDate, 'h:mm a'); 
    return formattedHour || '';
  }
  
}

