import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationService } from './registration.service';
import { User, LoginUser } from './User_Interface';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  //Registration
  LoginForm: FormGroup;
  registrationForm: FormGroup;
  isFormSubmited: boolean = false;
  EmailValidationForm: FormGroup;
  Server_response: any;
  dog: string = '@';


  //constructor
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router:Router,
  ) {
    this.LoginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]],
      Password: ['', [Validators.required]],
    });

    this.EmailValidationForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[^ @]*@[^ @]*'),
      ]),
    });

    this.registrationForm = this.formBuilder.group({
      passcode: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      password: new FormControl('', [Validators.required]),
      Phone: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  //Modal window
  modalVisible = false;
  showModal() {
    this.modalVisible = true;
    /*     setTimeout(() => {
      this.modalVisible = false;
    }, 10000); */
  }
  hideModal() {
    this.modalVisible = false;
  }
  LoginOpacity: number = 100;
  RegisterOpacity: number = 0;
  changeWidth() {
    this.LoginOpacity = this.LoginOpacity === 100 ? 0 : 100;
       this.RegisterOpacity = this.RegisterOpacity === 0 ? 100 : 0;   

  }
  //Toggle of registration and login
  loginVisible = true;
  registrationVisible = false;
  ToggleInnerText = 'Registration';
  Login_Registration_Togle() {
    if (this.loginVisible) {
      this.loginVisible = false;
      this.registrationVisible = true;
      this.ToggleInnerText = 'Login';
    } else {
      this.loginVisible = true;
      this.registrationVisible = false;
      this.ToggleInnerText = 'Registration';
    }
  }

  //Email validation
  EmailValidationForm_Visible = true;
  RegistrationForm_visible = false;

  RegistrationToggle() {
    this.EmailValidationForm_Visible = false;
    this.RegistrationForm_visible = true;
  }

  EmailValidation() {
    const isFormValid = this.EmailValidationForm.valid;
    if (isFormValid) {
      const email = this.EmailValidationForm.get('email')?.value;
      console.log('Data to be sent:', email);
      this.registrationService.EmailValidation(email).subscribe(
        (response) => {
          if (response && typeof response === 'object') {
            console.log('Validation successful!', response);
            this.Server_response = response.message;
            this.registrationForm.reset();
            this.RegistrationToggle();
          }
          this.showModal();
        },
        (error) => {
          this.showModal();
          console.error('Validation failed:', error);
          switch (error.status) {
            case 400:
              this.Server_response = error.error.message || 'Bad Request';
              break;
            case 404:
              this.Server_response = 'Resource not found';
              break;
            case 500:
              this.Server_response = 'Internal server error';
              break;
            default:
              this.Server_response = 'An unexpected error occurred.';
          }
        }
      );
    } else {
      console.error('Form has validation errors.');
      this.EmailValidationForm.markAllAsTouched();
    }
  }

  //Registration

  submitRegistration(): void {
    if (this.registrationForm.valid) {
      const user: User = {
        Name: this.registrationForm.value.name,
        LastName: this.registrationForm.value.LastName,
        Password: this.registrationForm.value.password,
        Phone: this.registrationForm.value.Phone,
        Email: this.EmailValidationForm.value.email,
      };
      const passcode: number = this.registrationForm.value.passcode;

      console.log('Data to be sent:', user, passcode);
      this.registrationService.registerUser(user, passcode).subscribe(
        (response) => {
          this.Server_response = response.message;
          this.showModal();
          this.registrationForm.reset();
          this.EmailValidationForm_Visible = true;
          this.RegistrationForm_visible = false;
          this.loginVisible = true;
          this.registrationVisible = false;
          this.RegistrationToggle();
        },
        (error) => {
          this.showModal();
          console.error('Registration failed:', error);
          switch (error.status) {
            case 400:
              this.Server_response = error.error.message || 'Bad Request';
              break;
            case 404:
              this.Server_response = 'Resource not found';
              break;
            case 500:
              this.Server_response = 'Internal server error';
              break;
            default:
              this.Server_response = 'An unexpected error occurred.';
          }
        }
      );

      this.isFormSubmited = true;
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  //Login_________________________

  Login() {
    const LoginUser: LoginUser = {
      Email: this.LoginForm.value.Email,
      Password: this.LoginForm.value.Password,
    };
    if(this.LoginForm.valid){
      console.log(LoginUser);
  
      this.registrationService.onLogin(LoginUser).subscribe(
        (res: any) => {
          if (res) {
            localStorage.setItem('token', res.message);
            this.router.navigate(['/Tickets']);
          }
        },
        (error) => {
          this.showModal();
          console.error('Login failed:', error);
          switch (error.status) {
            case 400:
              this.Server_response = error.error.message || 'Bad Request';
              break;
            case 404:
              this.Server_response = 'Email or Password is incorrect!, if you forgot your password Click "Forgot password" ';
              break;
            default:
              this.Server_response =  'Server encountered some errors!, we apologise and we are working on it!';
          }
        }
      );
    }
  }
  
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
