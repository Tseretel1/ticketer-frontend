import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  constructor(private authService:AuthService) {

  }
  ngOnInit(): void {  
    this.Creator();
  }
  Creator(){
    const token = localStorage.getItem('token');
    if (token && !this.authService.isTokenExpired(token)) {
        const userRole = this.authService.getUserRole(token);
        if (userRole == 'Creator') {
          return true;
        } else {
          return false; 
        }
    } else {
      return false;
    }
  }
 
}


