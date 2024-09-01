import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private url = "https://localhost:7081/api/Creator/";

  constructor(private http: HttpClient) { }
  
  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.url}matching-ticket/${ticketId}`);
  }
}
