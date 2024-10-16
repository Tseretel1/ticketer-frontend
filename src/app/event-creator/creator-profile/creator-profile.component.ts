import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { CommonModule, DatePipe, getLocaleNumberSymbol,  } from '@angular/common';
import { ReactiveFormsModule, } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { AuthService } from '../../auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { appRoutes, Routes} from '../../route-paths';
@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, MatIcon, RouterLink,CdkDrag,TranslateModule],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
routes: Routes = appRoutes;

  constructor (private service :ProfileService, private authservice :AuthService, private router :Router){
  }
  ngOnInit(): void {
    this.LoadMyProfile();
    this.AccountManagment();
    this.LoadActiveTickets();
  }

  profile: any = {}; 
  LoadMyProfile() {
    this.service.GetMyProfile().subscribe(
      (resp: any) => {
        this.profile = resp;
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }

  ActiveTickets: any[] = []; 
  LoadActiveTickets() {
    this.service.GetAllActiveTickets().subscribe(
      (resp: any) => {
        this.ActiveTickets = resp;
        console.log(this.ActiveTickets);
      },
      (error) => {
        console.error('Error fetching Profile data:', error);
      }
    );
  }

  Managment :any[] = [];
  AccountManagment(){
    this.service.GetAccountManagment().subscribe(
      (resp:any)=>{
        this.Managment = resp
        console.log(this.Managment)
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }


  switch:boolean = false


  RoleToChange: any = {};
  UsertoModify(id: number) {
    this.RoleToChange = this.Managment.find(t => t.userID === id);
    this.switch = true;
  }

  exitfromediting(){
    this.switch = false;
  }

  LoggedAccount(id: number): boolean {
    const token = localStorage.getItem("token");
    if (token) {
        const userIdString = this.authservice.getUserId(token);
        const userId = Number(userIdString);
        if (userId === id) {
            return true;
        }
    }
  return false;
}

  ModalPressed:boolean = false
  ExitFromAccunt(){
    localStorage.removeItem("CreatorToken");
    this.router.navigate([this.routes.creator]);
  } ;


  Showmodal(){
    this.ModalPressed = true;
  }

  hidemodal(){
    this.ModalPressed = false;
  }



  Removeuser(id:number){
    this.service.RemoveUserfromAccount(id).subscribe(
      (resp:any)=>{
        console.log(resp.message)
      },
      (error:any)=>{
        console.log(error.message);
      }
    )
  }
}
