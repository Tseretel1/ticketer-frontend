import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { RegistrationComponent } from './Registration_Login/registration.component';
import { FullTicketComponent } from './tickets/full-ticket/full-ticket.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { CreatorGuard,  } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreateTicketComponent } from './event-creator/create-ticket/create-ticket.component';
import { DashboardComponent } from './event-creator/dashboard/dashboard.component';
import { CreatorProfileComponent } from './event-creator/creator-profile/creator-profile.component';
import { CrudComponent } from './event-creator/crud/crud.component';

export const routes: Routes = [
  { path: 'Tickets', component: TicketsComponent },
  { path: 'Login', component: RegistrationComponent },
  { path: 'FullTicket/:id', component: FullTicketComponent},
  {
    path: 'EventCreator',
    component: EventCreatorComponent,
    canActivate: [CreatorGuard],
    children: [
      {
        path: 'TicketManagment',
        component: CreateTicketComponent
      },
      {
        path: 'Crud/:id',
        component: CrudComponent
      },
      {
        path: 'Dashboard',
        component: DashboardComponent
      },
      {
        path: 'CreatorProfile',
        component: CreatorProfileComponent
      }
    ]
  },
  { path: 'UserProfile', component:UserProfileComponent},
  { path: 'Cruddd/:id', component:CrudComponent},
  { path: '', redirectTo: '/Tickets', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/Tickets' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
