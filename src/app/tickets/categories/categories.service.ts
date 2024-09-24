import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService{

  constructor(private http :HttpClient) { }
  URL = "https://localhost:7081/"

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.URL+ 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
  categorisedTicket(categoryName: string): Observable<any> {
    return this.http.get(`${this.URL}filter-by-category/${categoryName}`);
  }
  searchbyTitle(categoryName: string): Observable<any> {
    return this.http.get(`${this.URL}search-by-title/${categoryName}`);
  }
  popularEvents(): Observable<any> {
    return this.http.get(`${this.URL}popular-tickets`);
  }
  upcomingEvents(): Observable<any> {
    return this.http.get(`${this.URL}upcoming-tickets`);
  }
}
