import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,DatePipe,MatIcon],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
  constructor (private service :ProfileService, private fb :FormBuilder,private datepipe:DatePipe){

  }

  DeleteSubmit(id :number){
      console.log( id);
      this.service.deleteTicket(id).subscribe(
      (resp :any)=>{
        console.log(resp.message);
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      },
    );
}




  ngOnInit(): void {
    this.LoadMyProfile();
    this.LoadMyTickets();
  }
  MyProfile: any = {}; 
  MyTickets: any[] = [];

  LoadMyProfile() {
    this.service.GetMyProfile().subscribe(
      (resp: any) => {
        this.MyProfile = resp;
        console.log(this.MyProfile);
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }
  LoadMyTickets(){
    this.service.GetMytickets().subscribe(
      (resp:any)=>{
        this.MyTickets = [];
        this.MyTickets = resp;
        console.log(resp)
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      },
    );
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

}
