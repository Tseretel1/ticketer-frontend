import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { find, max, Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,ReactiveFormsModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  providers:[
    DatePipe
  ]
})
export class TicketsComponent implements OnInit, OnDestroy{
 
  public tickets: any[] = [];
  Popularevent: any[] = [];
  MostPopularEvent: any = null;
  private intervalId: any;
  private eventsSubscription: Subscription | undefined;
  
  constructor(
    private ticketService: TicketService,
    private datePipe: DatePipe ,
    private FormBulilder :FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.fetchPopularEvents();
    this.Tickets();
  }
Tickets(){
  this.ticketService.getTickets().subscribe(
    (resp: any) => {
      this.tickets = resp;
    },
    (error) => {
      console.error('Error fetching ticket data:', error);
    }
  );
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
    const Hourr = this.datePipe.transform(date,'h:mm')
    if(Hourr){
       this.Hour = Hourr;   
    }

    return  this.Hour;
  }
}
