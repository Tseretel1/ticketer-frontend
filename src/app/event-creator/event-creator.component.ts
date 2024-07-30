import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TicketsComponent } from '../tickets/tickets.component';
import { RegistrationComponent } from "../Registration_Login/registration.component";
import { FullTicketComponent } from "../tickets/full-ticket/full-ticket.component";
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { CreatorProfileComponent } from "./creator-profile/creator-profile.component";

@Component({
  selector: 'app-event-creator',
  standalone: true,
  imports: [CommonModule, RouterLink, TicketsComponent, RegistrationComponent, CreateTicketComponent, CreatorProfileComponent],
  templateUrl: './event-creator.component.html',
  styleUrl: './event-creator.component.scss'
})
export class EventCreatorComponent{
  DashboardVisible : boolean = false;
  StatisticVisible : boolean = false;
  ProfileVisible : boolean = true;
  Dashboard(){
    this.DashboardVisible= true;
    this.StatisticVisible = false;
    this.ProfileVisible = false;
  }
  Statistics(){
    this.DashboardVisible= false;
    this.StatisticVisible = true;
    this.ProfileVisible = false;
  }
  Profile(){
    this.DashboardVisible= false;
    this.StatisticVisible = false;
    this.ProfileVisible = true;
  }
}
