import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { UserService } from './user.service';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes, Routes } from '../route-paths';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    DatePipe,
    TranslateModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit,OnDestroy{
  routes: Routes = appRoutes;
  qrData: string = '';
  constructor(
    private router:Router,
    private service :UserService,
    )
    { }
  ngOnDestroy(): void {
    this.Profile ={};
  }
  ngOnInit(): void {
    this.UserProfile();
    this.activeTickets();
  }
  Profile :any = {};
  actTickets : any[] = [];
  expTickets : any[] = [];
  Instances : any[] = [];
  SingleTicket :any = {};
  QRVisible : boolean = false;
  Userid :string = "";
  QrData :string = "";
  ExitFromAccountVisible :boolean = true;

  BackFromTicket(){
    this.QRVisible = false;
    this.ExitFromAccountVisible = true;
    this.Instances = [];
  }

  viewTicket(tkt: any){
    this.QRVisible = true;
    this.SingleTicket = tkt;
    this.ExitFromAccountVisible = false;
    this.service.TicketInstances(tkt.id).subscribe(
      (resp)=>{
        this.Instances = resp;
      },
      (error)=>{
      }
     )
  }

  

  UserProfile(){
     this.service.GetMyProfile().subscribe(
      (resp)=>{
        this.Profile = resp;
      },
      (error)=>{
        console.log(error);
      }
     )
  }
  noTicketsMessage: boolean = false;

  checkTickets() {
    this.noTicketsMessage = this.actTickets == null || this.actTickets.length === 0;
  }
  
  activeTickets() {
    this.service.GetActiveTickets().subscribe(
      (resp) => {
        this.actTickets = resp;
        this.checkTickets();
      },
      (error) => {
        console.log(error);
      }
    );
  }
expiredTickets(){
  this.service.GetExpiredTickets().subscribe(
   (resp)=>{
    this.expTickets  = resp;
   },
   (error)=>{
     console.log(error);
   }
  )
}
ticketSwitch : boolean = true;

switchToActive(){
  this.ticketSwitch = true;
}
switchToExpired(){
  this.ticketSwitch = false;
  if(this.expTickets != null){
    this.expiredTickets();
  }
}

  ExitFromAccount(){
    const token = localStorage.getItem('token');
    const CreatorToken = localStorage.getItem('CreatorToken');
    if(token || CreatorToken){
      localStorage.removeItem('token');
      localStorage.removeItem('CreatorToken');
      this.router.navigate([this.routes.login]);
    }
  }
  



  modalvisible :boolean = false;
  Showmodal(){
    this.modalvisible = true;
  }
  hidemodal(){
    this.modalvisible = false;
  }
}
