import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { CrudService, Ticket, TicketToAdd } from './crud.service';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CommonModule,MatIcon,ReactiveFormsModule,TranslateModule],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent implements OnInit{
  id:number = 0
  TicketToedit: any = null;
  ticketForm : FormGroup;
  constructor ( 
    private fb :FormBuilder,
    private datepipe:DatePipe,
    private router : ActivatedRoute,
    private service: CrudService,
    private location:Location
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
      Photo: ['', ],
      TicketCount: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }
  isUpdateMode:boolean = false;

  addTicket :string = ''; 

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.id = + params['id'];
      this.addTicket = params['id'];
      this.MatchingTicket(); 
    });
    if (this.addTicket == 'add') {
      this.isUpdateMode = false;
    } else {
      this.isUpdateMode = true;
      this.MatchingTicket(); 
    }
  }

  photoTicket: string | null = '';
  MatchingTicket() {
    if (this.id) {
      this.service.getMatchingTicket(this.id).subscribe(
        (resp) => {
          if (resp) {
            this.TicketToedit = resp;
            this.photoTicket = resp.photo;
            this.imagePreview = this.photoTicket;

            this.ticketForm.patchValue({
              Title :resp.title,
              Description: resp.description,
              Genre: resp.genre,
              Price: resp.price,
              Activation_Date: this.datepipe.transform(resp.activation_Date, 'yyyy-MM-dd'),
              Expiration_Date: this.datepipe.transform(resp.expiration_Date, 'yyyy-MM-dd'),
              ActivationTime: this.datepipe.transform(resp.activation_Date, 'HH:mm'),
              ExpirationTime: this.datepipe.transform(resp.expiration_Date, 'HH:mm'),       
            });
            console.log('patch value', this.ticketForm.value)
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



  imagePreview: string | ArrayBuffer | null = null;
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      this.imagePreview = null;
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('photo') as HTMLInputElement;
    fileInput.click();
  }

  onFileChange2(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      console.log('Selected file:', file);
    }
  }

  CancelTicketCreation (){
    this.location.back();
  }
  

  addOrUpdate(): void {
    if (this.isUpdateMode) {
      this.UPdateTicket();
    } else {
      this.addticket();
    }
  }
  
  
  //Ticket creation
  UPdateTicket(): void {
    if (this.ticketForm.valid) {
      const TicketToUpdate: Ticket = {
        ID :this.id,
        title: this.ticketForm.value.Title,
        description: this.ticketForm.value.Description,
        price: this.ticketForm.value.Price,
        ticketCount: this.ticketForm.value.TicketCount,
        activation_Date: this.service.combineDateAndTime(this.ticketForm.value.Activation_Date, this.ticketForm.value.ActivationTime),
        expiration_Date: this.service.combineDateAndTime(this.ticketForm.value.Expiration_Date, this.ticketForm.value.ExpirationTime),
        photo: this.ticketForm.value.Photo,
        genre: this.ticketForm.value.Genre,
      };
      this.service.Updateticket(TicketToUpdate).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.error(error.message);
          console.log(TicketToUpdate);

        }
      );
    } 
    else {
      console.error('Form is invalid');
      console.log(this.ticketForm.value);

      Object.values(this.ticketForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
  addticket(): void {
    if (this.ticketForm.valid) {
      const TicketADD: TicketToAdd = {
        title: this.ticketForm.value.Title,
        description: this.ticketForm.value.Description,
        price: this.ticketForm.value.Price,
        ticketCount: this.ticketForm.value.TicketCount,
        activation_Date: this.service.combineDateAndTime(this.ticketForm.value.Activation_Date, this.ticketForm.value.ActivationTime),
        expiration_Date: this.service.combineDateAndTime(this.ticketForm.value.Expiration_Date, this.ticketForm.value.ExpirationTime),
        photo: this.ticketForm.value.Photo,
        genre: this.ticketForm.value.Genre,
      };
      this.service.createTicket(TicketADD).subscribe(
        (res) => {
          console.log(this.ticketForm.value);
          console.log(res);
        },
        (error) => {
          console.log(this.ticketForm.value);
          console.error(error.message);
          console.log(TicketADD);
        }
      );
    } 
    else {
      console.error('Form is invalid');
      console.log(this.ticketForm.value);
      Object.values(this.ticketForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}
