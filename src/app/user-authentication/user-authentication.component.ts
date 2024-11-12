import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { login, passcode, RegisterServiceService } from './register-service.service';
import { appRoutes, Routes} from '../route-paths';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-authentication',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterLink
  ],
  templateUrl: './user-authentication.component.html',
  styleUrl: './user-authentication.component.scss'
})

export class UserAuthenticationComponent {
  routes: Routes = appRoutes;
  loginForm :FormGroup;
  emailValidationForm :FormGroup;
  passcodeValidationForm :FormGroup;
  registrationForm :FormGroup;


  constructor(private fb:FormBuilder, private service:RegisterServiceService,private router :Router,){
    this.loginForm =  fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.emailValidationForm =  fb.group({
      email: ['', [Validators.required]],
    });
    this.passcodeValidationForm =  fb.group({
      passcode: ['', [Validators.required]],
    });
    this.registrationForm =  fb.group({
      password: ['', [Validators.required]],
    });
  }




  login(login?:login) {
    if (this.loginForm.valid) {
      const loginP: login = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.service.login(loginP).subscribe(
        (resp) => {
          if (resp.success) {
            localStorage.setItem("token",resp.message);
            this.router.navigate([this.routes.ticket]);       
          } else {
            this.openModal();
            this.openEmailResp(); 
          }
        },
        (error) => {
          this.openModal();
          this.openLoginResp();
        }
      );
    }
  }



  switch:boolean = true;
  switchReg(){
    this.switch = false;
  }
  switchLog(){
    this.switch = true;
  }

  emailVisible :boolean = true;
  passcodeVisible :boolean = false;
  passwordVisible :boolean = false;
  loginresp :boolean = false;

  openLoginResp(){
    this.emailVisible = false;
    this.passwordVisible = false;
    this.passcodeVisible = false;
    this.loginresp = true;
  }

  openPasscodeForm(){
    this.emailVisible = false;
    this.passwordVisible = false;
    this.passcodeVisible = true;
    this.loginresp = false;
  }
  
  openPasswordForm(){
    this.emailVisible = false;
    this.passwordVisible = true;
    this.passcodeVisible = false;
    this.loginresp = false;
  }
  
  openEmailForm(){
    this.emailVisible = true;
    this.passwordVisible = false;
    this.loginresp = false;
    this.passcodeVisible = false;
  }




  modalVisible :boolean = false;
  pascodeResp :boolean = false;
  emailResp :boolean = false;
  passwordResp :boolean = false;
  
  closeModal(){
    this.pascodeResp = false;
    this.emailResp = false;
    this.passwordResp = false;
    this.modalVisible = false;
    this.loginresp = false;
  }

  openModal(){
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false
    }, 10000);
  }

  openPasscodeResp(){
    this.pascodeResp = true;
    this.emailResp = false;
    this.passwordResp = false;
    this.loginresp = false;
    setTimeout(() => {
      this.pascodeResp = false;
    }, 5000);
  }
  openEmailResp(){
    this.pascodeResp = false;
    this.emailResp = true;
    this.passwordResp = false;
    this.loginresp = false;
    setTimeout(() => {
      this.emailResp = false;
    }, 5000);
  }

  openPasswordResp(){
    this.pascodeResp = false;
    this.emailResp = false;
    this.passwordResp = true;
    this.loginresp = false;
    setTimeout(() => {
      this.passwordResp = false;
    }, 5000);
  }


  validateEmail() {
    if (this.emailValidationForm.valid) {
      console.log(this.emailValidationForm.value.email);
      this.service.validateEmail(this.emailValidationForm.value.email).subscribe(
        (resp) => {
          if (resp.success) {
            this.openPasscodeForm();
            this.closeModal();
          } else {
            this.openModal();
            this.openEmailResp(); 
          }
        },
        (error) => {
          this.openModal();
          this.openEmailResp();
        }
      );
    }
  }
  
  passcodeValidation() {
    if (this.passcodeValidationForm.valid) {
      const passcodes: passcode = {
        email: this.emailValidationForm.value.email,
        passcode: this.passcodeValidationForm.value.passcode,
        password: '',
      };
  
      this.service.validatePasscode(passcodes).subscribe(
        (resp) => {
          if (resp.success) {
            this.openPasswordForm();
            this.closeModal();
          } else {
            this.openModal();
            this.openPasscodeResp(); 
          }
        },
        (error) => {
          this.openModal();
          this.openPasscodeResp(); 
        }
      );
    }
  }
  
  RegistrationFinish() {
    if (this.registrationForm.valid) {
      const reg: login = {
        email: this.emailValidationForm.value.email,
        password: this.registrationForm.value.password,
      };
  
      this.service.registration(reg).subscribe(
        (resp) => {
          if (resp.success) {
            this.loginForm.value.email = reg.email;
            this.loginForm.value.password = reg.password;
            console.log(this.loginForm.value);
            this.login(reg);
            this.openEmailForm(); 
            this.closeModal(); 
          } else {
            this.openModal();
            this.openPasswordResp();
          }
        },
        (error) => {
          this.openModal();
          this.openPasswordResp();
        }
      );
    }
  }
  
}
