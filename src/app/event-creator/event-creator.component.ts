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
import { Login, Register, ServiceService } from './service.service';

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
    this.Profile();
  }

  Loginform :FormGroup;
  RegisterForm :FormGroup;
  CreateAccountForm :FormGroup
  constructor(private authService: AuthService, private fb :FormBuilder, private service :ServiceService){
    this.Loginform =  fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.RegisterForm = fb.group({
      PersonalID :['',[Validators.required]],
      PhoneNumber :['',[Validators.required]],
      IdCardPhoto :['',[Validators.required]],
    });
    this.CreateAccountForm = fb.group({
      UserName :['',[Validators.required]],
      Logo :['',[Validators.required]],
      Password :['',[Validators.required]],
    })
  }

  modalvisible : boolean = false;
  Server_response : string = "";
  hideModal(){
      this.modalvisible = false;
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
    if(this.Loginform.valid){
    const Logincredentials: Login={
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
        if (error.status === 404) {
          this.Server_response = 'UserName or password is incorrect. please Try again!';
        } else if (error.status === 400) {
          this.Server_response = 'Bad request. Please verify the data you are sending.';
        } else if (error.status === 500) {
          this.Server_response = 'Server error. Please try again later.';
        }

        this.modalvisible = true;
        console.log(error);
      }
    )
  }
  }
  Rolecheck (){
    const Token = localStorage.getItem("token");
    if(Token){
      var Role =  this.authService.getUserRole(Token);
      if(Role == "Creator"){
        return true;
      }
      else if(Role == "User")
      {
        return false;
      }
    }
    return false;
  }



  switch : boolean = false;
  switchText :string = "Register as Creator";
  SwitchForms(){
    if(this.switch == false){
      this.switch = true;
      this.switchText  = "Log into Creator Space";

    }
    else if(this.switch){
      this.switch = false;
      this.switchText  = "Register as Creator";
    }
  }

  RegisterAscreator(){
    const reg: Register={
      IdCardPhoto : this.RegisterForm.value.IdCardPhoto,
      PhoneNumber : this.RegisterForm.value.PhoneNumber,
      PersonalID : this.RegisterForm.value.PersonalID
    }
    this.service.onRegister(reg).subscribe(
      (resp)=>{
        if(resp.message.success == true)
        {
          this.Server_response = resp.message;
          this.modalvisible = true;
        }
        else{
          this.Server_response = resp.message;
          this.modalvisible = true;
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
