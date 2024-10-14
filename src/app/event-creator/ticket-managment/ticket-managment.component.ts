import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { CreateTicketService } from './ticket-managment.service';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Routes, appRoutes } from '../../route-paths';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DatePipe,
    FormsModule,
    DragDropModule,
    MatIcon,
    RouterLink,
    CdkDrag,
    TranslateModule,
  ],
  templateUrl: './ticket-managment.component.html',
  styleUrls: ['./ticket-managment.component.scss'],
})
export class ticketmanagmentComponent implements OnInit {
  routes: Routes = appRoutes;
  constructor(private ticketservice: CreateTicketService,private authservice:AuthService) {}
  ticketId?: string;

  ngOnInit(): void {
    this.LoadMyTickets();
  }

  ticketSwtich: boolean = true;

  switchToActive() {
    this.ticketSwtich = true;
  }
  switchToExpired() {
    this.ticketSwtich = false;
  }

  ModalVisible: boolean = false;
  ModalMessgae: string = '';

  ModalShow() {
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
  activeTickets: any[] = [];
  expiredTickets: any[] = [];
  activePageIndex = 0;
  expiredPageIndex = 0;
  loadingActive = false;
  loadingExpired = false;
  hasMoreActiveTickets = true;
  hasMoreExpiredTickets = true;

  LoadMyTickets() {
    this.loadActiveTickets();
    this.loadExpiredTickets();
    var token = localStorage.getItem("CreatorToken");
    if(token){
      console.log(this.authservice.getUserRole(token));
    }
  }

  loadActiveTickets() {
    if (this.loadingActive || !this.hasMoreActiveTickets) return;
    this.loadingActive = true;

    this.ticketservice.GetActiveTickets(this.activePageIndex).subscribe(
      (resp: any) => {
        if (resp.length === 0) {
          this.hasMoreActiveTickets = false;
        } else {
          this.activeTickets = [...this.activeTickets, ...resp];
          this.activePageIndex++;
        }
        this.loadingActive = false;
      },
      (error) => {
        console.error('Error fetching active ticket data:', error);
        this.loadingActive = false;
      }
    );
  }

  loadExpiredTickets() {
    if (this.loadingExpired || !this.hasMoreExpiredTickets) return;
    this.loadingExpired = true;

    this.ticketservice.GetExpiredTickets(this.expiredPageIndex).subscribe(
      (resp: any) => {
        if (resp.length === 0) {
          this.hasMoreExpiredTickets = false;
        } else {
          this.expiredTickets = [...this.expiredTickets, ...resp];
          this.expiredPageIndex++;
        }
        this.loadingExpired = false;
      },
      (error) => {
        console.error('Error fetching expired ticket data:', error);
        this.loadingExpired = false;
      }
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY + window.innerHeight-50;
    const windowHeight = document.body.offsetHeight;

    if (scrollPosition >= windowHeight) {
      setTimeout(() => {
        this.loadActiveTickets();
        this.loadExpiredTickets();
      }, 500);
    }
  }
}
