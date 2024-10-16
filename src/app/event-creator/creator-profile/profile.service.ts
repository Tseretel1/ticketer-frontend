import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http :HttpClient, private datepipe:DatePipe) 
  {

  }
  private URL = "https://localhost:7081/api/Creator/"
  GetMytickets(): Observable<any> {
    return this.http.get( this.URL+'my-tickets');
  }

  GetAllActiveTickets(): Observable<any> {
    return this.http.get(`${this.URL}all-active-tickets`);
  }

  GetMyProfile():Observable<any>{
    return this.http.get(this.URL + 'my-profile');
  }

  GetAccountManagment():Observable<any>{
    return this.http.get(this.URL + 'account-management');
  } 

  RemoveUserfromAccount(userid :number):Observable<any>{
    return this.http.delete(`${this.URL}remove-user-from-account/${userid}`);
  }
  
}