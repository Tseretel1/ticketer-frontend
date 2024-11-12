import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;

  
  private url = this.BaseUrl.URL;

  loadFoundTicket(searchTerm: string): Observable<any> {
    return this.http.get(`${this.url}ticket-categories${searchTerm}`);
  }

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.url + 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}
