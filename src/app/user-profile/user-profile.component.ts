import { CommonModule } from '@angular/common';
import { Component, Directive, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ServiceService } from '../event-creator/service.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,MatIcon],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  constructor(private authservice :AuthService,private router:Router, private service :UserService){

  }
  ngOnInit(): void {
    this.UserProfile();
  }
  Profile :any = {};

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
