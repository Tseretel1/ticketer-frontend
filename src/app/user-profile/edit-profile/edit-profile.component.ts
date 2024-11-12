import { Component, OnInit } from '@angular/core';
import { EditService, RegisterAsCreatorDTO } from './edit.service';
import { CommonModule,Location } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { appRoutes, Routes } from '../../route-paths';
import { MatIcon } from '@angular/material/icon';
import { edit } from '@cloudinary/url-gen/actions/animated';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    MatIcon,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  routes: Routes = appRoutes;
  registerForm: FormGroup;
  percentage: number = 0;
  
    
  ngOnInit() {
    this.registerForm.valueChanges.subscribe(() => this.calculatePercentage());
    this.UserProfile();
  }
  
  constructor(private fb: FormBuilder, private service: EditService,private router :Router,private location :Location) {
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      photo: ['',],
    });
    
  }
  
  calculatePercentage(): void {
    const totalFields = Object.keys(this.registerForm.controls).length;
    const validFields = Object.keys(this.registerForm.controls).filter(
      (field) => this.registerForm.get(field)?.valid
    ).length;
  
    const newPercentage = (validFields / totalFields) * 100;
    this.animatePercentageChange(this.percentage, newPercentage, 300);
  }
  
  animatePercentageChange(start: number, end: number, duration: number): void {
    const startTime = performance.now();
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      this.percentage = Math.floor(start + (end - start) * progress);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
  }
  
  getProgressWidth(): string {
    const totalControls = Object.keys(this.registerForm.controls).length;
    const validControls = Object.keys(this.registerForm.controls).filter(
      (field) => this.registerForm.get(field)?.valid
    ).length;
  
    const widthPercentage = (validControls / totalControls) * 100;
    return `${widthPercentage}%`;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('Photo') as HTMLInputElement;
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
  UserProfile(){
    this.service.GetMyProfile().subscribe(
     (resp)=>{
      this.registerForm.patchValue({
        Name :resp.name,
        lastName: resp.lastName,
      });
       this.imagePreview = resp.photo;
       this.uploadedImageURL = resp.photo;
     },
     (error)=>{
       console.log(error);
     }
    )
 }

  editProfile(): void {
    if (this.selectedFile) {
        this.service.uploadImage(this.selectedFile).subscribe(
            (response) => {
                this.imagePreview = response.secure_url;
                this.uploadedImageURL = response.secure_url;
                console.log(response.secure_url);
                this.editUser();
            },
            (error) => {
                console.error('Error uploading image:', error);
            }
        );
    } else {
        this.editUser();
    }
 }
 
 
 editUser(){
  if(this.registerForm.valid){
    const userUPT :RegisterAsCreatorDTO = {
      Name  : this.registerForm.value.Name,
      LastName : this.registerForm.value.lastName,
      photo : this.uploadedImageURL,     
    };
    console.log("is empty?",userUPT);
    this.service.UpdateUser(userUPT).subscribe(
      (resp)=>{
        if(resp){
          this.router.navigate([this.routes.userProfile]);
        }
        console.log(resp);
      }
    )
  }
 }

   back(){
     this.location.back();
   }

   modalvisible :boolean = false;
   Showmodal(){
     this.modalvisible = true;
   }
   hidemodal(){
     this.modalvisible = false;
   }
   
   
  ExitFromAccountVisible :boolean = true;
  ExitFromAccount(){
    const token = localStorage.getItem('token');
    const CreatorToken = localStorage.getItem('CreatorToken');
    if(token || CreatorToken){
      localStorage.removeItem('token');
      localStorage.removeItem('CreatorToken');
      this.router.navigate([this.routes.login]);
    }
  }
}
