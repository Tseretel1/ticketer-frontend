import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { LoaderService } from './loader/loader.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    LoaderComponent,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Ticketer';
  isLoading: Observable<boolean>;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private translate: TranslateService
  ) {
    const storedLang = localStorage.getItem('language');
    const defaultLang = storedLang ? storedLang : 'geo';
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);

    this.isLoading = this.loaderService.loaderState;
    this.router.events.subscribe((event) => {
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
