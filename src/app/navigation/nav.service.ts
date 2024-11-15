import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../route-paths';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private http: HttpClient) {}
  BaseUrl: any = BaseURL;

  GetMyProfile(): Observable<any> {
    return this.http.get(this.BaseUrl.URL + 'user-profile');
  }
  search(searchTerm: string): Observable<any> {
    return this.http.get(`${this.BaseUrl.URL}search-by-title/${searchTerm}`);
  }
}
