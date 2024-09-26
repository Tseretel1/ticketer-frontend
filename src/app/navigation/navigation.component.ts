import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NavService } from './nav.service';
import { appRoutes, Routes } from '../route-paths';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    MatIcon,
    TranslateModule
    ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy{
  constructor(
    private authService:AuthService,
    private service :NavService,
    private location :Location, 
    private router :Router,
    private translate :TranslateService
  ) 
  {
  }


  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
  
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  routes: Routes = appRoutes;
  Back() {
    this.location.back();
  }
  
  Forward(){
    this.location.forward();
  }
  ngOnInit(): void {  
    this.Creator();
    this.UserProfile();
  }
  ngOnDestroy(): void {
   this.Profile ={};
  }



  searchbarShow(){
    this.HideNavigation();
  }
  searchbarHide(){
    this.HideNavigation();
  }

  AllTickets: any[] = [];
  tickets: any[] = [];
  searchTerm: string = ''; 
  topTickets: Set<number> = new Set(); 

    
  searchTickets() {
    if (this.searchTerm) {
      this.tickets = this.AllTickets.filter(ticket =>
        ticket.title.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.tickets = this.AllTickets;
    }
  }

  
  width = 0;
  minwidth = 0;
  opacity = 0;
  NavigationVisible:Boolean = false;
  NavbUttonVisible:boolean = true;
  ShowNavigation(){
    this.NavigationVisible = true;
    setTimeout(() => {
      this.NavbUttonVisible = false;
      this.width = 30;
      this.minwidth = 150;
      this.opacity =1;
    }, 0);
  }
  HideNavigation(){
    setTimeout(() => {
      this.NavigationVisible = false;
    }, 300);
    this.width = 0;
    this.minwidth = 0;
    this.NavbUttonVisible = true;
    this.opacity = 0;
  }




  Creator(){
    const token = localStorage.getItem('token');
    if (token && !this.authService.isTokenExpired(token)) {
        const userRole = this.authService.getUserRole(token);
        if (userRole === 'Creator' || userRole =="User") {
          return true;
        } else {
          return false; 
        }
    } else {
      return false;
    }
  }

  User(){
    const token = localStorage.getItem('token');
    if (token && !this.authService.isTokenExpired(token)) {
        const userRole = this.authService.getUserRole(token);
        if (userRole == 'User') {
          return true;
        } else {
          return false; 
        }
    } else {
      return false;
    }
  }



  Loggedin(){
    const token = localStorage.getItem('token');
    if (token && !this.authService.isTokenExpired(token)) {
          return true; 
    } else {
      return false;
    }
  }
  Profile :any = {};



  UserProfile(){
     this.service.GetMyProfile().subscribe(
      (resp)=>{
        this.Profile = resp;
      },
      (error)=>{
      }
     )
  }
}


