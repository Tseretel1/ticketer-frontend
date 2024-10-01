import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { RegistrationComponent } from './Registration_Login/registration.component';
import { FullTicketComponent } from './tickets/full-ticket/full-ticket.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { AccountAdminGuard, CreatorGuard,  } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatorProfileComponent } from './event-creator/creator-profile/creator-profile.component';
import { CrudComponent } from './event-creator/crud/crud.component';
import { CategoriesComponent } from './tickets/categories/categories.component';
import { ScannerComponent } from './event-creator/scanner/scanner.component';
import { ticketmanagmentComponent } from './event-creator/ticket-managment/ticket-managment.component';

export const routes: Routes = [
  { path: 'tickets', component: TicketsComponent },
  { path: 'login', component: RegistrationComponent },
  { path: 'full-ticket/:id', component: FullTicketComponent},
  {
    path: 'event-creator',
    component: EventCreatorComponent,
    canActivate: [CreatorGuard],
    children: [
      {
        path: 'ticket-management',
        component: ticketmanagmentComponent
      },
      {
        path: 'scanner',
        component: ScannerComponent
      },
      {
        path: 'crud/:id',
        component: CrudComponent
      },
      {
        path: 'creator-profile',
        component: CreatorProfileComponent,canActivate:[AccountAdminGuard]
      }
    ]
  },
  { path: 'user-profile', component:UserProfileComponent},
  { path:'ticket-categories/:id', component:CategoriesComponent},
  { path: '', redirectTo: '/tickets', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/tickets' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
