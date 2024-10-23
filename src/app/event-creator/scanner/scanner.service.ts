import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  constructor(private http :HttpClient) 
  { }
  private url = "https://localhost:7081/api/Creator/";
  

  scannOneTime(ticketId: string): Observable<any> {
    return this.http.get(`${this.url}scann-ticket/${ticketId}`);
  }
}
