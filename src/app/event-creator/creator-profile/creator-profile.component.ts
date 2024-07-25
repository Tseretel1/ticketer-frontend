import { Component, OnInit } from '@angular/core';
import { ɵNgNoValidate } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-creator-profile',
  standalone: true,
  imports: [],
  templateUrl: './creator-profile.component.html',
  styleUrl: './creator-profile.component.scss'
})
export class CreatorProfileComponent implements OnInit{
  constructor (private Authservise :AuthService){

  }
  ngOnInit(): void {
    this.simpleProfile();
  }
  userid :number = 0;
  userrole :string = "";
  TokenExpired : boolean = false;
  simpleProfile(){
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.Authservise.getUserId(token);
      const userRole = this.Authservise.getUserRole(token);
      const isTokenExpired = this.Authservise.isTokenExpired(token);
      this.userid = userId;
      this.userrole = userRole;
      this.TokenExpired=isTokenExpired;
      this.ConsoleData();
    }
  }
  ConsoleData(){
    console.log(this.userid, this.userrole, this.TokenExpired);
  }
}
