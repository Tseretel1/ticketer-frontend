import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { CreateTicketService } from './create-ticket.service';
import { AuthService } from '../../auth.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { Ticket } from './Interface';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DatePipe,FormsModule,DragDropModule,MatIcon,RouterLink],
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketForm : FormGroup;
  constructor(private ticketservice :CreateTicketService, private authService :AuthService,
     private fb:FormBuilder,private route :Router, private datepipe :DatePipe) {
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
  ticketId?: string;

  ngOnInit(): void {
    this.LoadMyTickets();
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

  EditTicket :boolean = false;
  CreateTicketButton(){
    this.EditTicket = true;
  }
  CancelTicketCreation (){
    this.EditTicket = false;
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

  AllTickets: any[] = [];
  MyTickets: any[] = [];
  ExpiredTickets: any[] = [];
  LoadMyTickets(){
    this.ticketservice.GetMytickets().subscribe(
      (resp:any)=>{
        this.MyTickets = [];
        this.MyTickets = resp;
        this.AllTickets = resp;
        this.sortTicketsByDate(this.AllTickets);
        this.ExpiredTickets = this.findExpiredTickets(this.AllTickets);
        console.log(resp)
      },
      (error) => {
        console.error('Error fetching ticket data:', error);
      },
    );
  }
  sortTicketsByDate(tickets: any[]): any[] {
    return tickets.sort((a, b) => {
      const dateA = new Date(a.activation_Date).getTime();
      const dateB = new Date(b.activation_Date).getTime();
      return dateB - dateA;
    });
  }

  searchTerm: string = ''; 
  searchTickets() {
    if (this.searchTerm) {
      this.MyTickets = this.AllTickets.filter(ticket =>
        ticket.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.MyTickets = this.AllTickets;
    }
  }

  findExpiredTickets(tickets: any[]): any[] {
    const now = new Date().getTime();
    return tickets.filter(ticket => {
      const expirationDate = new Date(ticket.expiration_Date).getTime();
      return expirationDate < now;
    });
  }

  isExpired(ticket: any): boolean {
    const now = new Date().getTime();
    const expirationDate = new Date(ticket.expiration_Date).getTime();
    return expirationDate < now;
  }


  
  monthNames:any = {
    1: 'January',   2: 'February',  3: 'March',     4: 'April',
    5: 'May',       6: 'June',      7: 'July',      8: 'August',
    9: 'September', 10: 'October',  11: 'November', 12: 'December'
};

MonthNumber : number = 0;
MonthName: string = " ";
DayNumber: number = 0;
Hour : string = "" ;

  formatDate(date: string | null): string {
    if (!date) {
      return ''; 
    }
    const Month = this.datepipe.transform(date, 'M');
    if (Month) {
      this.MonthNumber = parseInt(Month, 10);
    }
    const Day = this.datepipe.transform(date, 'd');
    const Hour = this.datepipe.transform(date,'h : mm')
    this.MonthName = this.monthNames[ this.MonthNumber ];
    return this.MonthName + " " + Day;
  }
  formatHour(date: string | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    const formattedHour = this.datepipe.transform(parsedDate, 'h:mm a'); 
    return formattedHour || '';
  }

}

