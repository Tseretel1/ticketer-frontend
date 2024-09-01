import { CommonModule, DatePipe, Location, NgClass, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FullTicketService } from './full-ticket.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-full-ticket',
  standalone: true,
  imports: [MatIcon,CommonModule,RouterLink,NgClass,ReactiveFormsModule],
  templateUrl: './full-ticket.component.html',
  styleUrls: ['./full-ticket.component.scss'],
  providers: [
    DatePipe
  ]
})
export class FullTicketComponent implements OnInit {

  id: number = 0;
  matchingTicket: any = null;
  foundtickets : any[] = [];

  SellingForm: FormGroup;

  constructor(
    private router: ActivatedRoute, 
    private myService: FullTicketService,
    private datePipe: DatePipe,
    private Route: Router,
    private location :Location,
    private fb :FormBuilder
  ) 
  {
    this.SellingForm = this.fb.group({
      TicketCount: new FormControl(1, [
        Validators.required,
      ]),
     });
   }
  
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = + params['id'];
    });
    this.findMatchingTicket();
  }

  Exit() {
    this.location.back();
  }
  



  findMatchingTicket() {
    this.myService.getMatchingTicket(this.id).subscribe(
      (resp: any) => {
        this.foundtickets = resp;
        this.Matchingticketfound();
      },
      (error: any) => {
        console.error('Error fetching matching ticket:', error);
      }
    );
  }
  
  Matchingticketfound() {
    this.matchingTicket = this.foundtickets.find(ticket => ticket.id === this.id); 
    
    if (this.matchingTicket) {
      this.matchingTicket.photo = this.matchingTicket.photo + '?v=' + new Date().getTime();
    } else {
      console.error("Matching ticket not found.");
    }
  }
  NewMatchingTicket(id: number) {
    this.matchingTicket = this.foundtickets.find(ticket => ticket.id === id);
    
    if (this.matchingTicket) {
      this.matchingTicket.photo = this.matchingTicket.photo + '?v=' + new Date().getTime();      
      this.id = id;
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
    const Hourr = this.datePipe.transform(date,'h : mm')
    if(Hourr){
       this.Hour = Hourr;   
    }

    return  this.Hour;
  }


  Modal :boolean  = false;
  HideModal(){
    this.Modal = false;
    this.ShowSmallModal();
    this.SmallModalText = "Canceled!";
  }
  ShowModal(){
    this.Modal = true;
  }

  get isTicketAvailable(): boolean {
    return this.matchingTicket && this.matchingTicket.ticketCount > 0;
  }
  SmallModal :boolean = false;
  SmallModalText  :string = "";
  ShowSmallModal(){
    this.SmallModal = true;
    setTimeout(() => {
      this.SmallModal = false;
    }, 5000);
  }
  //Buy ticket 
  BuyTicket() {
    this.myService.BuyTicket(this.id, this.SellingForm.value.TicketCount).subscribe(
      (resp: any) => {
        this.ShowSmallModal();
        this.HideModal();
        this.SmallModalText = resp.message;
        this.matchingTicket.ticketCount = this.matchingTicket.ticketCount;
        console.log(resp);
      },
      (error: any) => {
        this.ShowSmallModal();
        this.SmallModalText = error.error?.message || 'An unexpected error occurred.';
        console.error(error);
        this.HideModal();
      }
    );
  }
  
}
