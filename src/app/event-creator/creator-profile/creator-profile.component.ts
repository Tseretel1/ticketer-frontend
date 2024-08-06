import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
  constructor (private service :ProfileService, private fb :FormBuilder){

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

}
