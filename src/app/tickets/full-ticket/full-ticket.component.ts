import { CommonModule, DatePipe,Location, registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FullTicketService } from './full-ticket.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes, Routes } from '../../route-paths';
import { CloudinaryModule } from '@cloudinary/ng';
import localeKa from '@angular/common/locales/ka'; // Correctly import Georgian locale

registerLocaleData(localeKa);

@Component({
  selector: 'app-full-ticket',
  standalone: true,
  imports: [
    MatIcon,
    CommonModule,
    RouterLink, 
    ReactiveFormsModule, 
    DatePipe,
    TranslateModule,
    CloudinaryModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ka' }  // Correct locale code for Georgian
  ],
  templateUrl: './full-ticket.component.html',
  styleUrls: ['./full-ticket.component.scss'],
})
export class FullTicketComponent implements OnInit, OnDestroy {
  routes: Routes = appRoutes;

  id: number = 0;
  matchingTicket: any = {};
  foundtickets: any[] = [];
  SellingForm: FormGroup;
  private destroy$ = new Subject<void>();

  constructor(
    private router: ActivatedRoute, 
    private myService: FullTicketService,
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

  ticketCount: number = 0;
  incrementVisible = true;
  soldOut = true;

  increment(): void {
    if (this.ticketCount < this.matchingTicket.ticketCount &&this.ticketCount<10) {
        this.ticketCount ++;
        this.SellingForm.get('TicketCount')?.setValue(this.ticketCount);
    }
    this.incrementVisible = this.ticketCount < 10;
  }

  decrement(): void {
    if (this.ticketCount > 0) {  
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
      this.ticketCount = 0;
      this.SellingForm.get('TicketCount')?.setValue(this.ticketCount);
      this.soldOut = this.matchingTicket.ticketCount <= 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  Modal: boolean = false;

  hideModal() {
    this.Modal = false;
  }

  showModal() {
    this.Modal = true;
  }

  SmallModal: boolean = false;
  SmallModalText: string = "";

  showSmallModal() {
    this.SmallModal = true;
  }
  closeSmallModal(){
    this.SmallModal = false;
  }

  get isTicketAvailable(): boolean {
    return this.matchingTicket && this.matchingTicket.ticketCount > 0;
  }

  
  IsIncrementMoreThanZero(): boolean {
    if(this.ticketCount > 0){
      return false;
    }
    return true;
  }

  notLoggedModal :boolean = false;
  ShowNotLoggedModal(){
    this.notLoggedModal = true;
  }
  HideNotLoggedModal(){
    this.notLoggedModal = false;
  }

  BuyTicket() {
    this.myService.BuyTicket(this.id, this.SellingForm.value.TicketCount).pipe(takeUntil(this.destroy$)).subscribe(
      (resp: any) => {
        if(resp.success){    
          this.showSmallModal();
          this.hideModal();
          this.matchingTicket.ticketCount -= this.SellingForm.value.TicketCount;
      }
      },
      (error: any) => {
        if (error.status === 401 || error.status === 403) {
          this.ShowNotLoggedModal();
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );
  }
}
