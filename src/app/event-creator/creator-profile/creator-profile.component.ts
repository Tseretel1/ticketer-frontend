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
  simpleProfile(){
    const token = localStorage.getItem('token');
    if (token) {
      const userId = this.Authservise.getUserId(token);
      const userRole = this.Authservise.getUserRole(token);
      const isTokenExpired = this.Authservise.isTokenExpired(token);

      console.log('User ID:', userId);
      console.log('User Role:', userRole);
      console.log('Is Token Expired:', isTokenExpired);
    }
  }
  Token :string| null = "";
  getToken(): string | null {
    console.log("token " +this.Token);
    return this.Token
  }
}
