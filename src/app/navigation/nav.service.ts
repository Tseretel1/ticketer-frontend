import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../route-paths';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;

  
  private url = this.BaseUrl.URL;
  GetMyProfile(): Observable<any> {
    return this.http.get(this.url + 'user-profile');
  }
  search(searchTerm: string): Observable<any> {
    return this.http.get(`${this.url}search-by-title/${searchTerm}`);
  }
}
