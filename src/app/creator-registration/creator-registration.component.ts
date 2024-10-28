import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { CreatorRegisterService, RegisterAsCreatorDTO } from './creator-register.service';
import { appRoutes, Routes } from '../route-paths';
@Component({
  selector: 'app-creator-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    MatIcon
  ],
  templateUrl: './creator-registration.component.html',
  styleUrl: './creator-registration.component.scss'
})
export class CreatorRegistrationComponent {
  routes: Routes = appRoutes;
  registerForm :FormGroup;
  constructor(private fb :FormBuilder,  private router :Router,private service :CreatorRegisterService){
    this.registerForm = fb.group({
      Name :['',[Validators.required]],
      lastName :['',[Validators.required]],
      PhoneNumber :['',[Validators.required]],
      PersonalID :['',[Validators.required]],
      IdCardPhoto :['',[Validators.required]],
    });
  }
  
  getProgressWidth(): string {
    const controls = [
      this.registerForm.get('Name'),
      this.registerForm.get('lastName'),
      this.registerForm.get('PhoneNumber'),
      this.registerForm.get('PersonalID'),
      this.registerForm.get('IdCardPhoto')
    ];
  
    const validCount = controls.filter(control => control?.valid).length;
    const widthPercentage = (validCount / controls.length) * 100; 
    return `${widthPercentage}%`;
  }
  
  secondStep :boolean = false;
  isFirstStepValid(): boolean {
    const name = this.registerForm.value.Name;
    const lastName = this.registerForm.value.LastName;
    const phoneNumber = this.registerForm.value.PhoneNumber;
    if(this.registerForm.value.Name&& this.registerForm.value.lastName && this.registerForm.value.PhoneNumber){
      this.secondStep = true;
      return true;
    }
    return false;
  }
  
  twoStep:boolean = true;
  next() {
    console.log(this.registerForm.value)
    console.log(this.isFirstStepValid())
    if (this.isFirstStepValid()) {
      this.twoStep = !this.twoStep;
    }
  }
  

  triggerFileInput(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    fileInput.click();
  }
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; 
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

 uploadedImageURL = '';
  uploadImage(): void {
    if (this.selectedFile) {
        this.service.uploadImage(this.selectedFile).subscribe(
            (response) => {
                this.imagePreview = response.secure_url;
                this.uploadedImageURL = response.secure_url;
                console.log(this.uploadedImageURL);
                this.registerAsCreator();
            },
            (error) => {
                console.error('Error uploading image:', error);
            }
        );
    } else {
        console.log('No file selected for upload.');
  }
 }
 
 
 registerAsCreator(){
  if(this.registerForm.valid){
    const userUPT :RegisterAsCreatorDTO = {
      Name  : this.registerForm.value.Name,
      LastName : this.registerForm.value.lastName,
      PhoneNumber : this.registerForm.value.PhoneNumber,
      PersonalID : this.registerForm.value.PersonalID,
      IdCardPhoto : this.uploadedImageURL,     
    };
    console.log("is empty?",userUPT);
    this.service.UpdateUser(userUPT).subscribe(
      (resp)=>{
        if(resp.success){
          localStorage.removeItem('token');
          localStorage.setItem("token",resp.message);
          this.router.navigate([this.routes.creator]);
        }
        console.log(resp);
      }
    )
  }
 }
}
