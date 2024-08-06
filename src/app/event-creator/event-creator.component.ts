import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketsComponent } from '../tickets/tickets.component';
import { RegistrationComponent } from "../Registration_Login/registration.component";
import { FullTicketComponent } from "../tickets/full-ticket/full-ticket.component";
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreatorProfileComponent } from "./creator-profile/creator-profile.component";
import { AuthService } from '../auth.service';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreatorAccountLogin, ServiceService } from './service.service';

@Component({
  selector: 'app-event-creator',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, TicketsComponent, 
    RegistrationComponent,
    CreateTicketComponent,
    CreatorProfileComponent,
    DashboardComponent,
    ReactiveFormsModule
  ],
  templateUrl: './event-creator.component.html',
  styleUrl: './event-creator.component.scss'
})
export class EventCreatorComponent implements OnInit{
  ngOnInit(): void {
    this.Dashboard();
  }
  Loginform :FormGroup;
  constructor(private authService: AuthService, private fb :FormBuilder, private service :ServiceService){
    this.Loginform =  fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  LoggedCheck(){
    const token = localStorage.getItem('CreatorToken');
    if (token && !this.authService.isTokenExpired(token)) {
          return true;
    } else {
      return false;
    }
  }
  LoginToaccount(){
    const Logincredentials: CreatorAccountLogin={
      userName  :this.Loginform.value.username,
      password: this.Loginform.value.password
    }
    this.service.onLogin(Logincredentials).subscribe(
      (resp)=>{
        const token = localStorage.getItem('CreatorToken');
        if (token) {
          localStorage.setItem('CreatorToken', resp.message);
        }
        else{
          localStorage.setItem('CreatorToken', resp.message);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  DashboardVisible : boolean = false;
  CreateTicketVisible : boolean = false;
  ProfileVisible : boolean = false;
  TicketCreate(){
    this.DashboardVisible= false;
    this.CreateTicketVisible = true;
    this.ProfileVisible = false;
  }
  Dashboard(){
    this.DashboardVisible= true;
    this.CreateTicketVisible = false;
    this.ProfileVisible = false;
  }
  Profile(){
    this.DashboardVisible= false;
    this.CreateTicketVisible = false;
    this.ProfileVisible = true;
  }
}
