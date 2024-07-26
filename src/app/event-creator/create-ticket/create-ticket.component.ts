import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTicketService } from './create-ticket.service';
import { AuthService } from '../../auth.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
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
      PublisherID: [null, Validators.required], 
      TicketCount: [null, [Validators.required, Validators.maxLength(3)]],
    });
    
  }
  get title(): FormControl {
    return this.ticketForm.get('Title') as FormControl || null;
  }
  get Date(): FormControl {
    return this.ticketForm.get('Activation_Date') as FormControl || null;
  }
  get Genre(): FormControl {
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
  AddTicket(): void {
    if (this.ticketForm.valid) {
      this.ticketservice.onLogin(this.ticketForm.value).subscribe(
        (res) => {
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
      console.log(this.ticketForm.value);
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
