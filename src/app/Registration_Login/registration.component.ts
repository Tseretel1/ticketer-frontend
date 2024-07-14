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
import { User } from './User_Interface';

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
  Registration_Response: any;
  dog: string = '@';
  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
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
            this.Registration_Response = response.message;
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
              this.Registration_Response = error.error.message || 'Bad Request';
              break;
            case 404:
              this.Registration_Response = 'Resource not found';
              break;
            case 500:
              this.Registration_Response = 'Internal server error';
              break;
            default:
              this.Registration_Response = 'An unexpected error occurred.';
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
          this.Registration_Response = response.message;
          this.showModal();
          this.registrationForm.reset;
          this.Login_Registration_Togle();
          this.RegistrationToggle();
        },
        (error) => {
          this.showModal();
          console.error('Registration failed:', error);
          switch (error.status) {
            case 400:
              this.Registration_Response = error.error.message || 'Bad Request';
              break;
            case 404:
              this.Registration_Response = 'Resource not found';
              break;
            case 500:
              this.Registration_Response = 'Internal server error';
              break;
            default:
              this.Registration_Response = 'An unexpected error occurred.';
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
    this.registrationService
      .onLogin(this.registrationService.onLogin)
      .subscribe((res: any) => {
        console.log('res', res);
        localStorage.setItem('token', res.token);
      });
  }
}
