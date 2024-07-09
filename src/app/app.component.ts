import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ticket_App';
}
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppComponent,
    TicketsComponent,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }