import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TicketsComponent } from '../tickets/tickets.component';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Login, Register, ServiceService } from './service.service';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { appRoutes, Routes} from '../route-paths';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';



@Component({
  selector: 'app-event-creator',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TicketsComponent,
    ReactiveFormsModule,
    RouterOutlet,
    CdkDrag,
    TranslateModule,
    RouterLinkActive,
    MatIcon
],
  templateUrl: './event-creator.component.html',
  styleUrl: './event-creator.component.scss'
})
export class EventCreatorComponent implements OnInit{
  routes: Routes = appRoutes;

  ngOnInit(): void {
    this.LoggedCheck();
    this.mycreatorAccounts();
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
      accountName :['',[Validators.required]],
    })
  }

  modalvisible : boolean = false;
  Server_response : string = "";
  hideModal(){
      this.modalvisible = false;
  }
  showmModal(){
    this.modalvisible = true;
    setTimeout(() => {
      this.modalvisible = false;
    }, 5000);
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

 myAccounts :any []= [];
  mycreatorAccounts(){
    this.service.myCreatorAccounts().subscribe(
      (resp)=>{
        this.myAccounts = resp;
        if(resp.length<=0){
          this.switch = false;
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  LoginToaccount(accountID :number){
    this.service.loginToAccount(accountID).subscribe(
      (resp)=>{
        localStorage.setItem('CreatorToken', resp.message);
        const token = localStorage.getItem('CreatorToken');
        if (token) {
            this.router.navigate([this.routes.creatorProfile]);
            this.Loginform.reset();
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

  creatorCheck(){
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

  createNewAccount() {
    if (this.CreateAccountForm.valid) {
        const accountName = this.CreateAccountForm.value.accountName;
        console.log(accountName);
        
        this.service.accountCreation(accountName).subscribe(
            (resp) => {
                if (resp.success) {
                  this.CreateAccountForm.reset();
                    this.myAccounts.push(resp);
                    this.LoginToaccount(resp.accountID);
                } else {
                    this.CreateAccountForm.reset();
                    this.showmModal();
                    this.Server_response = resp.message;
                }
            },
            (error) => {
                console.error("Error creating account:", error);
            }
        );
    } else {
        console.error("Form is invalid");
    }
}

}
