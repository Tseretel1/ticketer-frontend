import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TicketsComponent } from '../tickets/tickets.component';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, Register, ServiceService } from './service.service';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-event-creator',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TicketsComponent,
    ReactiveFormsModule,
    RouterOutlet,
    CdkDrag
],
  templateUrl: './event-creator.component.html',
  styleUrl: './event-creator.component.scss'
})
export class EventCreatorComponent implements OnInit{

  ngOnInit(): void {
    if (this.LoggedCheck()) {
      if(this.UserRole =='AccountAdmin'){
        this.router.navigate(['/EventCreator/CreatorProfile']);
      }
      else{
        this.router.navigate(['/EventCreator/TicketManagment']);
      }
    }
    this.Rolecheck();
  }

  
  Loginform :FormGroup;
  RegisterForm :FormGroup;
  CreateAccountForm :FormGroup
  constructor(private authService: AuthService, private fb :FormBuilder, private service :ServiceService, private router :Router){
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

  FormsTitleText :string = "Welcome Creator";

  LoggedCheck(){
    const token = localStorage.getItem('CreatorToken');
    if (token && !this.authService.isTokenExpired(token)) {
          return true;
    } else {
      return false;
    }
  }
  UserRole :string = "";
  LoginToaccount(){
    if(this.Loginform.valid){
    const Logincredentials: Login={
      userName  :this.Loginform.value.username,
      password: this.Loginform.value.password
    }
    this.service.onLogin(Logincredentials).subscribe(
      (resp)=>{
        localStorage.setItem('CreatorToken', resp.message);
        const token = localStorage.getItem('CreatorToken');
        if (token) {
          var UserRole = this.authService.getUserRole(token);
          if(UserRole == 'AccountAdmin'){
            this.UserRole = UserRole;
            this.router.navigate(['/EventCreator/CreatorProfile']);
          }
          else{
            this.router.navigate(['/EventCreator/TicketManagment']);
          }
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
  CreatorOrNot : boolean = false;
  Rolecheck (){
    const Token = localStorage.getItem("token");
    if(Token){
      var Role =  this.authService.getUserRole(Token);
      if(Role == "Creator"){
        this.CreatorOrNot = true;
        return true;
      }
      else if(Role == "User")
      {
        this.CreatorOrNot = false;
        return false;
      }
    }
    return false;
  }



  switch : boolean = true;
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
}
