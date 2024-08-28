import { CommonModule, DatePipe } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { QRCodeModule } from 'angularx-qrcode';
import { UserService } from './user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MatIcon,QRCodeModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit{

  constructor(
    private router:Router,
    private service :UserService,
    private datepipe : DatePipe, 
    private authservice : AuthService,
    )
    { }
  ngOnInit(): void {
    this.UserProfile();
    this.myTickets();
  }
  Profile :any = {};
  Tickets : any[] = [];
  SingleTicket :any = {};
  QRVisible : boolean = false;
  Userid :string = "";
  QrData :string = "";

  BcakFromTicket(){
    this.QRVisible = false;
  }

  viewTicket(tkt: any){
    this.QRVisible = true;
    this.SingleTicket = tkt;
    const Token  = localStorage.getItem('token');
    if(Token){
       this.Userid = this.authservice.getUserId(Token);
       this.QrData = this.Userid + " " + this.SingleTicket.title + this.SingleTicket.publisher + this.SingleTicket.activation_Date
    }
  }

  UserProfile(){
     this.service.GetMyProfile().subscribe(
      (resp)=>{
        this.Profile = resp;
        console.log(this.Profile);
      },
      (error)=>{
        console.log(error);
      }
     )
  }
  myTickets(){
    this.service.GetMyTickets().subscribe(
     (resp)=>{
      this.Tickets  = resp;
     },
     (error)=>{
       console.log(error);
     }
    )
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
  const Month = this.datepipe.transform(date, 'M');
  if (Month) {
    this.MonthNumber = parseInt(Month, 10);
  }
  const Day = this.datepipe.transform(date, 'd');
  const Hour = this.datepipe.transform(date,'h : mm')
  this.MonthName = this.monthNames[ this.MonthNumber ];
  return this.MonthName + " " + Day;
}
formatHour(date: string | null): string {
  if (!date) {
    return '';
  }
  const parsedDate = new Date(date);
  const formattedHour = this.datepipe.transform(parsedDate, 'h:mm a'); 
  return formattedHour || '';
}





  ExitFromAccount(){
    const token = localStorage.getItem('token');
    const CreatorToken = localStorage.getItem('CreatorToken');
    if(token || CreatorToken){
      localStorage.removeItem('token');
      localStorage.removeItem('CreatorToken');
      this.router.navigate(['/Tickets']);
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
