import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FullTicketService } from './full-ticket.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-full-ticket',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    RouterLink, 
    ReactiveFormsModule, 
    DatePipe,
    TranslateModule
  ],
  templateUrl: './full-ticket.component.html',
  styleUrls: ['./full-ticket.component.scss'],
})
export class FullTicketComponent implements OnInit, OnDestroy {
  id: number = 0;
  matchingTicket: any = {};
  foundtickets: any[] = [];
  SellingForm: FormGroup;
  private destroy$ = new Subject<void>(); // Subject for managing unsubscriptions

  constructor(
    private router: ActivatedRoute, 
    private myService: FullTicketService,
    private datePipe: DatePipe,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.SellingForm = this.fb.group({
      TicketCount: new FormControl(1, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.router.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.id = +params['id'];
      this.findMatchingTicket();
    });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  Exit() {
    this.location.back();
  }

  ticketCount: number = 1;
  incrementVisible = true;
  soldOut = true;

  increment(): void {
    if (this.ticketCount < 10) {
      this.ticketCount++;
      this.SellingForm.get('TicketCount')?.setValue(this.ticketCount);
    }
    this.incrementVisible = this.ticketCount < 10;
  }

  decrement(): void {
    if (this.ticketCount > 1) {  
      this.ticketCount--;
      this.SellingForm.get('TicketCount')?.setValue(this.ticketCount);
    }
    this.incrementVisible = this.ticketCount < 10;
  }

  findMatchingTicket() {
    this.myService.getMatchingTicket(this.id).pipe(takeUntil(this.destroy$)).subscribe(
      (resp: any) => {
        this.foundtickets = resp;
        this.matchingTicketFound();
      },
      (error: any) => {
        console.error('Error fetching matching ticket:', error);
      }
    );
  }

  matchingTicketFound() {
    this.matchingTicket = this.foundtickets.find(ticket => ticket.id === this.id); 
    if (this.matchingTicket) {
      this.matchingTicket.photo = `${this.matchingTicket.photo}?v=${new Date().getTime()}`;
      this.soldOut = this.matchingTicket.ticketCount <= 0;
    } else {
      console.error("Matching ticket not found.");
    }
  }

  NewMatchingTicket(id: number) {
    this.matchingTicket = this.foundtickets.find(ticket => ticket.id === id);
    if (this.matchingTicket) {
      this.matchingTicket.photo = `${this.matchingTicket.photo}?v=${new Date().getTime()}`;
      this.id = id;
      this.ticketCount = 1;
      this.SellingForm.get('TicketCount')?.setValue(this.ticketCount);
      this.soldOut = this.matchingTicket.ticketCount <= 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  Modal: boolean = false;

  hideModal() {
    this.Modal = false;
    this.showSmallModal("Canceled!");
  }

  showModal() {
    this.Modal = true;
  }

  SmallModal: boolean = false;
  SmallModalText: string = "";

  showSmallModal(message: string) {
    this.SmallModalText = message;
    this.SmallModal = true;
    setTimeout(() => {
      this.SmallModal = false;
    }, 5000);
  }

  get isTicketAvailable(): boolean {
    return this.matchingTicket && this.matchingTicket.ticketCount > 0;
  }

  BuyTicket() {
    this.myService.BuyTicket(this.id, this.SellingForm.value.TicketCount).pipe(takeUntil(this.destroy$)).subscribe(
      (resp: any) => {
        this.showSmallModal(resp.message);
        this.hideModal();
        this.matchingTicket.ticketCount -= this.SellingForm.value.TicketCount; // Decrement the ticket count
      },
      (error: any) => {
        this.showSmallModal(error.error?.message || 'An unexpected error occurred.');
        this.hideModal();
      }
    );
  }
}
