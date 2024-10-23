import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { CrudService, Ticket, TicketToAdd } from './crud.service';
import { CommonModule, DatePipe, Location, provideCloudinaryLoader } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CloudinaryModule} from '@cloudinary/ng';
import { Observable } from 'rxjs';
import { appRoutes, Routes } from '../../route-paths';
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule,MatIcon,ReactiveFormsModule,TranslateModule, CloudinaryModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit{
routes: Routes = appRoutes;

  id:number = 0
  ticketResp: any = {};
  
  ticketForm : FormGroup;
  constructor ( 
    private fb :FormBuilder,
    private datepipe:DatePipe,
    private route : ActivatedRoute,
    private service: CrudService,
    private location:Location,
    private router :Router
  ){
    this.ticketForm = this.fb.group({
      Title:  ['', Validators.required],
      Description: ['', Validators.required],
      Genre: ['', Validators.required],
      Price: ['', Validators.required],
      Activation_Date: ['', Validators.required],
      Expiration_Date: ['', Validators.required],
      ActivationTime: ['', Validators.required],
      ExpirationTime: ['', Validators.required],
      TicketCount: ['', Validators.required],
      Photo: [''],
    });
  }


  AddOrUpdateTicket:boolean = false;
  addTicket :string = ''; 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.addTicket = params['id'];
      if(this.addTicket === 'addnewticket'){
        this.AddOrUpdateTicket = false;
      }
      else{
        this.AddOrUpdateTicket = true;
        console.log(this.AddOrUpdateTicket);
        this.MatchingTicket();
      }
    }); 
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }
  

  isPhotoChanged: boolean  = false;
  MatchingTicket() {
    if (this.id) {
      this.service.getMatchingTicket(this.id).subscribe(
        (resp) => {
          if (resp) {
            this.ticketResp = resp;
            this.imagePreview = resp.photo;
            this.ticketForm.patchValue({
              Title :resp.title,
              Description: resp.description,
              Genre: resp.genre,
              Price: resp.price,
              Activation_Date: this.datepipe.transform(resp.activation_Date, 'yyyy-MM-dd'),
              Expiration_Date: this.datepipe.transform(resp.expiration_Date, 'yyyy-MM-dd'),
              ActivationTime: this.datepipe.transform(resp.activation_Date, 'HH:mm'),
              ExpirationTime: this.datepipe.transform(resp.expiration_Date, 'HH:mm'),  
              Photo :resp.photo,
            });
          } else {
            console.log('No response data available.');
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }


   formatHour(date: string | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    const formattedHour = this.datepipe.transform(parsedDate, 'h:mm '); 
    return formattedHour || '';
  }

  get title(): FormControl {
    return this.ticketForm.get('Title') as FormControl || null;
  }
  get Date(): FormControl {
    return this.ticketForm.get('Activation_Date') as FormControl || null;
  }
  get Genre(): FormControl{
    return this.ticketForm.get('Genre') as FormControl || null;
  }
  get Time(): FormControl {
    return this.ticketForm.get('ActivationTime') as FormControl || null;
  }
  get Description(): FormControl {
    return this.ticketForm.get('Description') as FormControl || null;
  }
  get Price(): FormControl {
    return this.ticketForm.get('Price') as FormControl || null;
  }
  get ticketCount(): FormControl {
    return this.ticketForm.get('TicketCount') as FormControl || null;
  }

  countInputswitch :boolean = false
  showTicketcountInput(){
    if(this.countInputswitch == false)
      {   
        this.countInputswitch = true;
      }
      else{
        this.countInputswitch = false;
      }
  }





  triggerFileInput(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    fileInput.click();
  }

  CancelTicketCreation (){
    this.location.back();
  }
  
  modalvisible :boolean = false;
  opendeletemodal(){
    this.modalvisible = true;
  }
  closedeletemodal(){
    this.modalvisible = false;
  }

  deleteTicket(id:number){
    this.service.deleteTicket(id).subscribe(
      (res) => {
        if(res.success){
          this.closedeletemodal();
          setTimeout(() => {            
            this.location.back();
          }, 500);
        }
      },
      (error) => {
        console.error(error.message);
      }
    );
    console.log("id of this ticket" ,id)
  }
  


 //Ticket creation
 imagePreview: string | ArrayBuffer | null = null;
 selectedFile: File | null = null;
 onFileChange(event: Event) {
   const input = event.target as HTMLInputElement;
   if (input.files && input.files[0]) {
     this.selectedFile = input.files[0]; 
     const reader = new FileReader();
     reader.onload = () => {
       this.imagePreview = reader.result; 
     };
     this.isPhotoChanged = true;
     reader.readAsDataURL(this.selectedFile);
   } 
   else {
     this.selectedFile = null;
     this.imagePreview = null;
   }
 }

 savedImg: string |null = null;
 isimgUploaded :boolean = false;
 AddOrUpdate() {
  if (this.AddOrUpdateTicket) {
    if(!this.selectedFile){
      this.savedImg = this.ticketForm.value.Photo;
      this.proceedToUpdateTicket();
    }
    this.uploadImage().subscribe(() => {
      this.proceedToUpdateTicket();
    });
  } else {
    this.uploadImage().subscribe(() => {
      this.proceedToAddTicket();
    });
  }
}

uploadImage(): Observable<any> {
  return new Observable(observer => {
    if (this.selectedFile) {
      this.service.uploadImage(this.selectedFile).subscribe(
        (response) => {
          this.savedImg = response.secure_url;
          this.isimgUploaded = true
          observer.next(response);
          observer.complete();
        },
        (error) => {
          console.error('Error uploading image:', error);
          this.isFormSubmited = false;
          observer.error(error);
        }
      );
    }
    else {
      observer.complete();
    }
  });
}

  
  proceedToAddTicket(): void {
    if (this.isimgUploaded && this.savedImg) {
      const TicketADD: TicketToAdd = {
        title: this.ticketForm.value.Title,
        description: this.ticketForm.value.Description,
        price: this.ticketForm.value.Price,
        ticketCount: this.ticketForm.value.TicketCount,
        activation_Date: this.service.combineDateAndTime(this.ticketForm.value.Activation_Date, this.ticketForm.value.ActivationTime),
        expiration_Date: this.service.combineDateAndTime(this.ticketForm.value.Expiration_Date, this.ticketForm.value.ExpirationTime),
        photo: this.savedImg,
        genre: this.ticketForm.value.Genre,
      };
  
      this.service.createTicket(TicketADD).subscribe(
        (res) => {
          this.isFormSubmited = false;
          console.log(res)
          if (res.success) {
            this.ticketForm.reset();
            this.router.navigate([this.routes.creatorTicketManagement]);
          }
        },
        (error) => {
          console.log(error);
          this.isFormSubmited = false;
          console.error(error.message);
        }
      );
    }
  }
  





  isFormSubmited: boolean = false;
  ticketCountChanged :number = 0;
  proceedToUpdateTicket(): void {
    if (this.savedImg) {
      if(this.ticketCountChanged == 0){

      }
      const TicketToUpdate: Ticket = {
        ID: this.id,
        title: this.ticketForm.value.Title,
        description: this.ticketForm.value.Description,
        price: this.ticketForm.value.Price,
        ticketCount: this.ticketForm.value.TicketCount,
        activation_Date: this.service.combineDateAndTime(this.ticketForm.value.Activation_Date, this.ticketForm.value.ActivationTime),
        expiration_Date: this.service.combineDateAndTime(this.ticketForm.value.Expiration_Date, this.ticketForm.value.ExpirationTime),
        photo: this.savedImg,
        genre: this.ticketForm.value.Genre,
      };
      this.service.Updateticket(TicketToUpdate).subscribe(
        (res) => {
          this.isFormSubmited = false;
          console.log(res)
          if (res.success) {
            this.ticketForm.reset();
            this.router.navigate([this.routes.creatorTicketManagement]);
          }
        },
        (error) => {
          this.isFormSubmited = false;
          console.error(error.message);
        }
      );
    }
    else{
      console.log("this is the problem");
    }
  } 
}
