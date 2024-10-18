import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { appRoutes, Routes} from '../route-paths'
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    FormsModule,
    MatIcon,
    DatePipe,
    TranslateModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',

})
export class TicketsComponent implements OnInit, OnDestroy{
  routes: Routes = appRoutes;

  tickets: any[] = [];
  searchTerm: string = ''; 
  topTickets: Set<number> = new Set(); 

  Popularevent: any[] = [];
  MostPopularEvent: any = null;
  private intervalId: any;
  private eventsSubscription: Subscription | undefined;
  
  constructor
  (
    private ticketService: TicketService,
  ) 
  {
  }

  scrollonTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit(): void {
    this.MostpopularTickets();
    this.UpcomingTickets();
    this.getotherTickets();
  }

  TicketViewCount(id:number){
    this.ticketService.TicketViewCount(id).subscribe(
      (resp:any)=>{
      },
      (error:any)=>{
      }
    )
  }

  popularTickets :any[] = [];
  MostpopularTickets() {
    this.ticketService.MostPopularTickets().subscribe(
      (resp) => {
        this.popularTickets = resp;        
        if (this.popularTickets.length > 0) {
          this.coverImages = this.popularTickets[this.currentIndex];
          this.coverFlow();
        }
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
  }

   
  currentIndex: number = 0;
  coverImages : any = {};

  coverFlow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      if (this.popularTickets.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % this.popularTickets.length;
        this.coverImages = this.popularTickets[this.currentIndex];
      }
    }, 5000);
  }
  scrollLeft() {
    if (this.popularTickets.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.popularTickets.length) % this.popularTickets.length;
      this.coverImages = this.popularTickets[this.currentIndex];
    }
  }
  
  scrollRight() {
    if (this.popularTickets.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.popularTickets.length;
      this.coverImages = this.popularTickets[this.currentIndex]; 
    }
  }
  

  upcomingTickets :any[] = [];
  UpcomingTickets() {
    this.ticketService.UpcomingTickets().subscribe(
      (resp: any[]) => {
        this.upcomingTickets = resp;
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
  }
  otherTickets :any[] = [];

  getotherTickets() {
    this.ticketService.otherTickets().subscribe(
      (resp: any[]) => {
        this.otherTickets = resp;
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
  }
  allTicketsVisible = false;
  everyTicketTitle = "";

  seeAllPopularTickets(){
    this.tickets = this.popularTickets;
    this.allTicketsVisible = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.everyTicketTitle = "Most popular events";
  }

  seeAllUpcomingTickets(){
    this.tickets = this.upcomingTickets;
    this.allTicketsVisible = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.everyTicketTitle = `Upcoming events `;
    console.log(this.upcomingTickets);
  }

  BackButton(){
    this.allTicketsVisible = false;
    this.tickets = [];
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

