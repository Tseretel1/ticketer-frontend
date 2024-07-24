import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTicketService } from './create-ticket.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketForm = this.ticketservice.ticketForm;
  constructor(private ticketservice :CreateTicketService) {
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
  AddTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketservice.onLogin(this.ticketForm.value).subscribe(
        (res) => {
          console.log('Ticket sent successfully!', res);
          console.log(this.ticketForm.value)
          this.ticketForm.reset();
          this.ModalMessgae = res.message;
          this.ModalShow();
        },
        (error) => {
          console.error('Error creating ticket', error);
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
