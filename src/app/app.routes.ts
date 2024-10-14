import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { FullTicketComponent } from './tickets/full-ticket/full-ticket.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { CreatorGuard,  } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CreatorProfileComponent } from './event-creator/creator-profile/creator-profile.component';
import { CrudComponent } from './event-creator/crud/crud.component';
import { CategoriesComponent } from './tickets/categories/categories.component';
import { ScannerComponent } from './event-creator/scanner/scanner.component';
import { ticketmanagmentComponent } from './event-creator/ticket-managment/ticket-managment.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { SearchResultComponent } from './tickets/search-result/search-result.component';

export const routes: Routes = [
  { path: 'tickets', component: TicketsComponent },
  { path: 'login', component: UserAuthenticationComponent },
  { path: 'full-ticket/:id', component: FullTicketComponent},
  { path: 'search/:id', component: SearchResultComponent},
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
        component: CreatorProfileComponent
      }
    ]
  },
  { path: 'user-profile', component:UserProfileComponent},
  { path: 'ticket-categories/:id', component:CategoriesComponent},
  { path: '', redirectTo: '/tickets', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/tickets' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
