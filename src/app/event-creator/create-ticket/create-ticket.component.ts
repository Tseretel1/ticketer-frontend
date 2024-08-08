import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { CreateTicketService } from './create-ticket.service';
import { AuthService } from '../../auth.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ticket } from './Interface';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DatePipe,FormsModule,DragDropModule],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketForm : FormGroup;
  constructor(private ticketservice :CreateTicketService, private authService :AuthService, private fb:FormBuilder,) {
    this.ticketForm = this.fb.group({
      Title:  ['', Validators.required],
      Description: ['', Validators.required],
      Genre: ['', Validators.required],
      Price: [0, Validators.required],
      Activation_Date: ['', Validators.required],
      Expiration_Date: ['', Validators.required],
      ActivationTime: ['', Validators.required],
      ExpirationTime: ['', Validators.required],
      Photo: ['', Validators.required],
      TicketCount: [0, [Validators.required, Validators.maxLength(3)]],
    });
    
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

  ngOnInit(): void {
  }
  ModalVisible : boolean = false;
  ModalMessgae :string  = "";

  ModalShow(){
    this.ModalVisible = true;
    setTimeout(() => {
      this.ModalVisible = false;
    }, 5000);
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
  
  //Ticket creation
  addTicket(): void {
    if (this.ticketForm.valid) {
      const ticket: Ticket = {
        Title: this.ticketForm.value.Title,
        Description: this.ticketForm.value.Description,
        Price: this.ticketForm.value.Price,
        TicketCount: this.ticketForm.value.TicketCount,
        Expiration_Date: this.ticketservice.combineDateAndTime(this.ticketForm.value.Expiration_Date, this.ticketForm.value.ExpirationTime),
        Activation_Date: this.ticketservice.combineDateAndTime(this.ticketForm.value.Activation_Date, this.ticketForm.value.ActivationTime),
        Photo: this.ticketForm.value.Photo,
        Genre: this.ticketForm.value.Genre,
      };

      this.ticketservice.createTicket(ticket).subscribe(
        (res) => {
          console.log(res);
          console.log(ticket);
          this.ModalMessgae = res.message;
          this.ModalShow();
        },
        (error) => {
          console.error('Error creating ticket', error);
          console.log(ticket);
          this.ModalMessgae = error.message;
          this.ModalShow();
        }
      );
    } else {
      console.error('Form is invalid');
      Object.values(this.ticketForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }
}

