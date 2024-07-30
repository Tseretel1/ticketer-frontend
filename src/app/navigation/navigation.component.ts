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
  width = 0;
  minwidth = 0;
  NavigationVisible:Boolean = false;
  NavbUttonVisible:boolean = true;
  ShowNavigation(){
    this.NavigationVisible = true;
    setTimeout(() => {
      this.NavbUttonVisible = false;
      this.width = 30;
      this.minwidth = 150;
    }, 0);
  }
  HideNavigation(){
    setTimeout(() => {
      this.NavigationVisible = false;
    }, 300);
    this.width = 0;
    this.minwidth = 0;
    this.NavbUttonVisible = true;
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


