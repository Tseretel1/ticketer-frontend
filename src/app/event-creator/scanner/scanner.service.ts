import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;
  private URL = this.BaseUrl.CreatorURL;

  scannOneTime(ticketId: string): Observable<any> {
    return this.http.get(`${this.URL}scann-ticket/${ticketId}`);
  }
}
