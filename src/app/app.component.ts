import { Component, NgModule } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TicketsComponent } from './tickets/tickets.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from "./loader/loader.component";
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, TicketsComponent, LoaderComponent,AsyncPipe,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  title = 'Ticket_App';
  isLoading: Observable<boolean>;
  constructor(private router: Router, private loaderService: LoaderService) {
    this.isLoading = this.loaderService.loaderState;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }
}