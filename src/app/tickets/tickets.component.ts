import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TicketService } from './ticket.service';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { appRoutes, Routes} from '../route-paths'


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
    DatePipe],
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

  ngOnInit(): void {
    this.fetchPopularEvents();
    this.MostpopularTickets();
    this.UpcomingTickets();
    this.theaterTickets();
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
      (resp: any[]) => {
        this.popularTickets = resp
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      }
    );
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

  theaterticketss :any[] = [];
  theaterTickets() {
    this.ticketService.theaterTickets().subscribe(
      (resp: any[]) => {
        this.theaterticketss = resp;
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


  @ViewChild('Ticket_parent') ticketParent!: ElementRef;
  @ViewChild('card_box_main') TciketWidth!: ElementRef;

  scrollLeft() {
    const ticketWidthElement = this.TciketWidth.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.ticketParent.nativeElement.scrollBy({ left: -ticketWidth + 30, behavior: 'smooth' });
  }

  scrollRight() {
    const ticketWidthElement = this.TciketWidth.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.ticketParent.nativeElement.scrollBy({ left: ticketWidth + 30, behavior: 'smooth' });
  }


  @ViewChild('Ticket_parent2') ticketParent2!: ElementRef;
  @ViewChild('card_box_main2') TciketWidth2!: ElementRef;

  scrollLeft2() {
    const ticketWidthElement = this.TciketWidth2.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.ticketParent2.nativeElement.scrollBy({ left: -ticketWidth + 30, behavior: 'smooth' });
  }

  scrollRight2() {
    const ticketWidthElement = this.TciketWidth2.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.ticketParent2.nativeElement.scrollBy({ left: ticketWidth + 30, behavior: 'smooth' });
  }

  
  @ViewChild('Headercarousel') coverscroll!: ElementRef;
  @ViewChild('eventParent') coverscrollchild!: ElementRef;

  coverScroolLeft() {
    const ticketWidthElement = this.coverscrollchild.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.coverscroll.nativeElement.scrollBy({ left: -ticketWidth + 20, behavior: 'smooth' });
  }

  coverScroolRight() {
    const ticketWidthElement = this.coverscrollchild.nativeElement;
    const ticketWidth = ticketWidthElement.offsetWidth;
    this.coverscroll.nativeElement.scrollBy({ left: ticketWidth + 30, behavior: 'smooth' });
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
intervalMs: number = 5000;
fadeDurationMs: number = 200;



startEventLoop(): void {
  setInterval(() => {
    setTimeout(() => {
      this.coverScroolRight();
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

