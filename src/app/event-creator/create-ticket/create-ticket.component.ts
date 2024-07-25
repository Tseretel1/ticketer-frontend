import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTicketService } from './create-ticket.service';
import { AuthService } from '../../auth.service';
import { Ticket } from './Interface';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DatePipe,FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  Title = new FormControl('');
  get TitleValue() {
    return this.Title.value;
  }
  Price = new FormControl('');
  get PriceValue() {
    return this.Price.value;
  }
  Date = new FormControl('');
  get DateValue() {
    return this.Date.value;
  }
  Genre = new FormControl('');
  get GenreValue() {
    return this.Genre.value;
  }
  Time = new FormControl('');
  get TimeValue() {
    return this.Time.value;
  }
  ticketForm = this.ticketservice.ticketForm;
  constructor(private ticketservice :CreateTicketService, private authService :AuthService, ) {
  }
  ngOnInit(): void {
    this.CreatorIDFinder();
  }

  ModalVisible : boolean = false;
  ModalMessgae :string  = "";

  ModalShow(){
    this.ModalVisible = true;
    setTimeout(() => {
      this.ModalVisible = false;
    }, 5000);
  }
  
  AddTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketservice.onLogin(this.ticketForm.value).subscribe(
        (res) => {
          console.log('Ticket sent successfully!', res);
          console.log(this.ticketForm)
          this.ticketForm.reset();
          this.ModalMessgae = res.message;
          this.ModalShow();
        },
        (error) => {
          console.error('Error creating ticket', error);
          switch (error.status) {
            case 400:
              this.ModalMessgae = "Something went wrong!";
              break;
            case 403:
              this.ModalMessgae = 'you Dont have Permissions to do such an activity!';
              break;
            default:
              this.ModalMessgae =  'Server encountered some errors!, we apologise and we are working on it!';
          }
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
  onSubmit(): void {
    if (this.ticketForm.valid) {
      const activationDate = this.ticketForm.value.ActivationDate;
      const activationTime = this.ticketForm.value.ActivationTime;
      const expirationDate = this.ticketForm.value.ExpirationDate;
      const expirationTime = this.ticketForm.value.ExpirationTime;
  
      const activationDateTime = new Date(`${activationDate}T${activationTime}`);
      const expirationDateTime = new Date(`${expirationDate}T${expirationTime}`);
  
      const ticket : Ticket= {
        Title: this.ticketForm.value.Title,
        description: this.ticketForm.value.Description,
        genre: this.ticketForm.value.Genre,
        price: this.ticketForm.value.Price,
        activation: activationDateTime, 
        expiration: expirationDateTime,
        photo: this.ticketForm.value.Photo,
        ticketCount: this.ticketForm.value.TicketCount,
        publisherID: this.ticketForm.value.PublisherID
      };
  
      this.ticketservice.createTicket(ticket).subscribe(
        response => {
          console.log('Ticket created successfully!', response);
        },
        error => {
          console.error('Error creating ticket', error);
        }
      );
    }
  }
  



  CreatorID :number = 0;
  CreatorIDFinder(){
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.authService.getUserId(token);
      this.CreatorID = userId;
      console.log("asdasd"+this.CreatorID);
      return this.CreatorID;
    }
    else{
      return null;
      console.log("asdasd");
    }
  }
}
