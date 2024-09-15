import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScanServiceService {

  constructor(private http:HttpClient) { }
  
  private URL = "https://localhost:7081/api/Creator/";

  Scannticket(userid: string): Observable<any> {
    return this.http.get(`${this.URL}scann-ticket/${userid}`);
  }
}
