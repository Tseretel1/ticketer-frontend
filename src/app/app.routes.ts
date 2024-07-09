import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { RegistrationComponent } from './registration/registration.component';

export const routes: Routes = [
  { path: 'Tickets', component: TicketsComponent },
  { path: 'Registration', component: RegistrationComponent },
  { path: '', redirectTo: '/Tickets', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/Tickets' } 
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
