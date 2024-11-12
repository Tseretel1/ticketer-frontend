import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;
  private URL = this.BaseUrl.URL;

  TicketViewCount(id: number): Observable<any> {
    return this.http.patch(this.URL + 'view-count', id, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
  georgia: string = 'საქართველო';
  search(searchTerm: string): Observable<any> {
    return this.http.get(`${this.URL}search-by-title/${searchTerm}`);
  }
}
