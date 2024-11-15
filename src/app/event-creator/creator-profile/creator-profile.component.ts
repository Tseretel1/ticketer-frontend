import { Component, OnInit } from '@angular/core';
import { Profile, ProfileService } from './profile.service';
import { CommonModule, DatePipe, getLocaleNumberSymbol,  } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AuthService } from '../../auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes, Routes} from '../../route-paths';
import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatIcon, 
    RouterLink,
    TranslateModule,
    QRCodeModule
  ],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
routes: Routes = appRoutes;

EditnameForm :FormGroup
  constructor (
    private service :ProfileService,
    private authservice :AuthService, 
    private router :Router,
    private fb: FormBuilder,
  ){
    this.EditnameForm = fb.group({
      username:['', Validators.required],
    })
    
  }
  ngOnInit(): void {
    this.LoadMyProfile();
    this.AccountManagment();
    this.LoadActiveTickets();
    this.creatorCheck();
  }


  triggerFileInput(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    fileInput.click();
    this.DesableInput();
  }

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imagePreviewSec: string | ArrayBuffer | null = null;
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.savePhotobButton = true;
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
                this.savedImg = response.secure_url;
                this.updateProfilePhoto();
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
              this.imagePreviewSec = this.imagePreview;
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
                console.log(resp);
            }
        },
        (error) => {
            console.error('Error updating profile:', error);
        }
    );
}

profile: any = {}; 
savedUserName :string = '';
LoadMyProfile() {
  this.service.GetMyProfile().subscribe(
    (resp: any) => {
      this.profile = resp;
      this.imagePreview = resp.logo;
      this.imagePreviewSec = resp.logo
      this.EditnameForm.patchValue({
        username :resp.userName,
      });
      this.savedUserName = resp.userName;
    },
    (error) => {
      console.error('Error fetching Profile data:', error);
    }
  );
}
get username(): FormControl {
  return this.EditnameForm.get('username') as FormControl || null;
}

  savePhotobButton :boolean = false;

  inputDisable :boolean = false;
  EnableInput(){
    this.inputDisable = true;
    this.savePhotobButton = false;
    this.imagePreview = this.imagePreviewSec;
  }

  DesableInput(){
    this.inputDisable = false;
    this.EditnameForm.patchValue({
      username: this.savedUserName,
    });
  }



  editNameFunc(){
    if(this.EditnameForm.valid){
      console.log(this.EditnameForm.value.username);
      this.service.editProfileName(this.EditnameForm.value.username).subscribe(
        (resp)=>{
          if(resp.success){
            this.inputDisable = false;
            this.savedUserName = this.EditnameForm.value.username;
          }
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  ActiveTickets: any[] = []; 
  LoadActiveTickets() {
    this.service.GetAllActiveTickets().subscribe(
      (resp: any) => {
        this.ActiveTickets = resp;
        this.getTotalSold();
        this.getTotalViews();
        this.getTotalPrice();
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }
  totalSold: number = 0;

  getTotalSold(): number {
    this.totalSold = this.ActiveTickets.reduce((total, ticket) => {
      return total + (ticket.sold || 0);
    }, 0);
    return this.totalSold; 
  }
  totalPrice: number = 0;

  getTotalPrice(): number {
    this.totalPrice = this.ActiveTickets.reduce((total, ticket) => {
      return total + ((ticket.sold || 0) * (ticket.price || 0)); 
    }, 0);
    return this.totalPrice;
  }

  totalViews: number = 0;
  getTotalViews(): number {
    this.totalViews = this.ActiveTickets.reduce((total, ticket) => {
      return total + (ticket.viewCount || 0);
    }, 0);
    return this.totalViews;
  }



  Managment :any[] = [];
  AccountManagment(){
    this.service.GetAccountManagment().subscribe(
      (resp:any)=>{
        this.Managment = resp
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
  creatorCheck(){
    const Token = localStorage.getItem("CreatorToken");
    if(Token){
      var Role =  this.authservice.getUserRole(Token);
      if(Role == "Creator"){
        return true;
      }
      else
      {
        return false;
      }
    }
    return false;
  }


  managmentVisible :boolean = false;
  expandManagment(){
    if(!this.managmentVisible){
      this.managmentVisible = true;
    }
    else{
      this.managmentVisible = false;
    }
  }
}
