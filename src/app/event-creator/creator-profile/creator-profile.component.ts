import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, MatIcon, RouterLink],
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
  }
  MyProfile: any = {}; 
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
}
