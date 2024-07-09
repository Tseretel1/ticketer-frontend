import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  standalone:true,
  imports:[
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  isFormSubmited:boolean = false;
  Registration_Response : any;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {

    this.registrationForm = this.formBuilder.group({     
      name: new FormControl("",[Validators.required,Validators.minLength(2)]),
      lastName: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required]),
      phone: new FormControl("",[Validators.required]),
    });
  }

  ngOnInit(): void {
  }
  get f() { return this.registrationForm.controls; }

  modalVisible = false;

  showModal() {
    this.modalVisible = true;
    setTimeout(() => {
      this.modalVisible = false;
    }, 5000);
  }
  hideModal() {
    this.modalVisible = false;
  }
  onSubmit() {
    this.isFormSubmited = true;
    const isFormValid = this.registrationForm.valid;
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.registrationService.register(formData).subscribe(
        (response) => {
          if (response && typeof response === 'object') {
            console.log('Registration successful!', response);
            this.Registration_Response = JSON.stringify(response);
          } 
          this.showModal();
          this.registrationForm.reset();
        },
        (error) => {
          this.showModal();
          console.error('Registration failed:', error);
          this.Registration_Response = JSON.stringify(error);
        }
      );
    } else {
      console.error('Form has validation errors.');
      this.registrationForm.markAllAsTouched();
    }
  }
  
}
