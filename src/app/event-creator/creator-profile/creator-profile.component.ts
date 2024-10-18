import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from './profile.service';
import { CommonModule, DatePipe, getLocaleNumberSymbol,  } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AuthService } from '../../auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes, Routes} from '../../route-paths';
@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, MatIcon, RouterLink,CdkDrag,TranslateModule],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
routes: Routes = appRoutes;

  EditPhotoForm :FormGroup
  constructor (private service :ProfileService, private authservice :AuthService, private router :Router,private fb: FormBuilder){
    this.EditPhotoForm = fb.group({
      logo:['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.LoadMyProfile();
    this.AccountManagment();
    this.LoadActiveTickets();
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
  

  savedImg : string ='';
  isimgUploaded :boolean = false;


  uploadImage(): void {
    if (this.selectedFile) {
        this.service.uploadImage(this.selectedFile).subscribe(
            (response) => {
                this.savedImg = response.secure_url; // URL of the uploaded image
                this.updateProfilePhoto(); // Update account with new logo
                console.log('Upload successful:', response.secure_url);
            },
            (error) => {
                console.error('Error uploading image:', error);
            }
        );
    } else {
        console.log('No file selected for upload.');
    }
}

updateProfilePhoto(): void {
    this.service.editProfilePhoto(this.savedImg).subscribe(
        (resp) => {
            if (resp.success) {
                this.editProfile = false; 
                console.log(resp);
            } else {
                console.error('Failed to update profile:', resp.message);
            }
        },
        (error) => {
            console.error('Error updating profile:', error); 
        }
    );
}


  updateAccount() {
      this.service.editProfilePhoto(this.savedImg).subscribe(
        (resp) => {
          console.log(resp);
            if (resp.success) {
                this.editProfile = false;
                console.log(resp);
            }
        },
        (error) => {
            console.error('Error updating profile:', error);
        }
    );
}



  editProfile :boolean = false;
  openEditProfile(){
    this.editProfile = true;
  }
  CloseEditProfile(){
    this.editProfile = false;
  }


  profile: any = {}; 
  LoadMyProfile() {
    this.service.GetMyProfile().subscribe(
      (resp: any) => {
        this.profile = resp;
        this.imagePreview = resp.logo;
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }

  ActiveTickets: any[] = []; 
  LoadActiveTickets() {
    this.service.GetAllActiveTickets().subscribe(
      (resp: any) => {
        this.ActiveTickets = resp;
        console.log(this.ActiveTickets);
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }

  Managment :any[] = [];
  AccountManagment(){
    this.service.GetAccountManagment().subscribe(
      (resp:any)=>{
        this.Managment = resp
        console.log(this.Managment)
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }


  switch:boolean = false


  RoleToChange: any = {};
  UsertoModify(id: number) {
    this.RoleToChange = this.Managment.find(t => t.userID === id);
    this.switch = true;
  }

  exitfromediting(){
    this.switch = false;
  }

  LoggedAccount(id: number): boolean {
    const token = localStorage.getItem("token");
    if (token) {
        const userIdString = this.authservice.getUserId(token);
        const userId = Number(userIdString);
        if (userId === id) {
            return true;
        }
    }
  return false;
}

  ModalPressed:boolean = false
  ExitFromAccunt(){
    localStorage.removeItem("CreatorToken");
    this.router.navigate([this.routes.creator]);
  } ;


  Showmodal(){
    this.ModalPressed = true;
  }

  hidemodal(){
    this.ModalPressed = false;
  }



  Removeuser(id:number){
    this.service.RemoveUserfromAccount(id).subscribe(
      (resp:any)=>{
        console.log(resp.message)
      },
      (error:any)=>{
        console.log(error.message);
      }
    )
  }
}
