import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class ScannerService {
  constructor(private http: HttpClient) {}
  BaseUrl: any = BaseURL;
  private URL = this.BaseUrl.CreatorURL;

  scannOneTime(ticketId: string): Observable<any> {
    return this.http.get(`${this.BaseUrl.CreatorURL}scann-ticket/${ticketId}`);
  }
}
