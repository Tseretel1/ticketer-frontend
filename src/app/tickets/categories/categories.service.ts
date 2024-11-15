import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  BaseUrl: any = BaseURL;


  loadFoundTicket(searchTerm: string): Observable<any> {
    return this.http.get(`${this.BaseUrl.URL}ticket-categories${searchTerm}`);
  }

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.BaseUrl.URL + 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
