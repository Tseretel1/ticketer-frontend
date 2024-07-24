import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink,CommonModule, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit{
  constructor() {

  }
  ngOnInit(): void {  
    this.getToken();
  }
  CreatorAuth:boolean = false;
  Token :string| null = "";
  getToken(): string | null {
    this.Token =localStorage.getItem('token');
    if(this.Token!=null){
      console.log("token " +this.Token);
      this.CreatorAuth= true;
      return this.Token;
    }
    else{
      this.CreatorAuth= false;
      return null
    }
  }
}


