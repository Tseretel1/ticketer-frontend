import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoriesService } from './categories.service';
import { ObservableInput, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, MatIcon,DatePipe,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy{

  constructor(private service :CategoriesService, private router : ActivatedRoute ){
  }
  categoryName :string = ''; 
  private destroy$ = new Subject<void>(); 
  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.categoryName =params['id'];
    });
    this.loadCategorisedTicket();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }



  
  categorisedTickets :any[] = [];
  popular  = this.service.popularEvents();
  upcoming  = this.service.upcomingEvents();
  categoryHandler = this.service.popularEvents();

  everyTicketTitle:string = '';
  sendrequsest: boolean = false;
  loadCategorisedTicket() {
    this.sendrequsest = true;
    if(this.categoryName =='popular'){
      this.categoryHandler = this.popular;
      this.sendrequsest = true;
      this.everyTicketTitle = "Most popular events"
    }
    else if(this.categoryName =="upcoming"){
      this.categoryHandler = this.upcoming;
      this.sendrequsest = true;
      this.everyTicketTitle = "Upcoming events"
    }
    else if(this.categoryName =="transport"){
      this.categoryHandler = this.upcoming;
      this.sendrequsest = true;
      this.everyTicketTitle = "Transport"
    }
    else{
      this.everyTicketTitle = this.categoryName;
      this.sendrequsest = false;
      this.service.categorisedTicket(this.categoryName).subscribe(
        (resp: any) => {
          this.categorisedTickets = resp;
        },
        (error: any) => {
          console.error('Error fetching matching ticket:', error);
        }
      );
    }
    if(this.sendrequsest){
    this.categoryHandler.subscribe(
      (resp: any) => {
        this.categorisedTickets = resp;
      },
      (error: any) => {
        console.error('Error fetching matching ticket:', error);
      }
    );}
  }



  topTickets: Set<number> = new Set(); 
  isTopTicket(ticket: any): boolean {
    return this.topTickets.has(ticket.id);
  }

  TicketViewCount(id:number){
    this.service.TicketViewCount(id).subscribe(
      (resp:any)=>{
      },
      (error:any)=>{
      }
    )
  }
}
