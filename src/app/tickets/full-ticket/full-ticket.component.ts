import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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


  constructor(
     private router: ActivatedRoute, 
     private http: HttpClient,
     private datePipe: DatePipe, )
      { 
      }
  
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = +params['id'];
      this.findMatchingTicket();
    });

    this.http.get('https://localhost:7081/all Tickets').subscribe(
      (resp: any) => {
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
        this.matchingTicket.photo = ticket.photo + '?v=' + new Date().getTime();
        console.log('Matching Ticket Photo:', this.matchingTicket.photo);
        break; 
      }
    }

    console.log('Matching Ticket:', this.matchingTicket);
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
    const Hourr = this.datePipe.transform(date,'h : mm')
    if(Hourr){
       this.Hour = Hourr;   
    }

    return  this.Hour;
  }
}
