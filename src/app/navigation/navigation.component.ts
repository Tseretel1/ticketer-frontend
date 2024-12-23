import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NavService } from './nav.service';
import { appRoutes, Routes } from '../route-paths';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RouterLinkActive,
    MatIcon,
    TranslateModule,
    ReactiveFormsModule
    ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy{

  searchForm :FormGroup
  constructor(
    private authService:AuthService,
    private service :NavService,
    private location :Location, 
    private translate :TranslateService,
    public router :Router,
    private fb :FormBuilder,
  ) 
  {
    this.searchForm = this.fb.group({
      searchTerm : ['', Validators.required]
    })
  }
  pathsToHide(): boolean {
    const routesToHide = [
      this.routes.creatorRegistration,
      this.routes.creator,
      this.routes.fullticket, 
      this.routes.userProfile,
      this.routes.login,
      this.routes.restorePassword,
      this.routes.editProfile
    ];
    return !routesToHide.some(route => this.router.url.startsWith(route));
  }
  navHide(): boolean {
    const routesToHide = [
      this.routes.creatorCrud,
      this.routes.creatorProfile, 
      this.routes.creatorScanner,
      this.routes.creatorTicketManagement,
    ];
    return !routesToHide.some(route => this.router.url.startsWith(route));
  }
  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }

  routes: Routes = appRoutes;
  Back() {
    +
    this.location.back();
  }
  
  Forward(){
    this.location.forward();
  }
  ngOnInit(): void {  
    this.UserProfile();
  }
  ngOnDestroy(): void {
    this.UserProfile();
  }

  searchbarShow(){
    this.HideNavigation();
  }
  searchbarHide(){
    this.HideNavigation();
  }

  AllTickets: any[] = [];
  tickets: any[] = [];
  topTickets: Set<number> = new Set(); 

  
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


  creatorCheck(){
    const Token = localStorage.getItem("token");
    if(Token){
      var Role =  this.authService.getUserRole(Token);
      if(Role == "Creator"){
        return true;
      }
      else if(Role == "User")
      {
        return false;
      }
    }
    return false;
  }

}


