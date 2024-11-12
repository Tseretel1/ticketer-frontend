import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  BaseUrl: URL = URLs;
  private URL = this.BaseUrl.CreatorURL;

  private cloudName = 'ds1q7oiea';
  private uploadPreset = 'cloudinary_Upload_Preset';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
      formData
    );
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.URL}delete-tickets/${id}`);
  }

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.URL}matching-ticket/${ticketId}`);
  }

  formatDateToBackend(date: Date): string {
    const datePart = this.datePipe.transform(date, 'yyyy-MM-dd');
    const timePart = this.datePipe.transform(date, 'HH:mm:ss.SSS');
    return `${datePart}T${timePart}`;
  }

  combineDateAndTime(date: string, time: string): string {
    const combinedDateTime = `${date}T${time}:00.000`;
    return this.formatDateToBackend(new Date(combinedDateTime));
  }

  Updateticket(ticket: Ticket): Observable<any> {
    return this.http.put(this.URL + 'update-tickets', ticket, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }

  createTicket(ticket: TicketToAdd): Observable<any> {
    return this.http.post(this.URL + 'add-new-tickets', ticket, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}

export interface Ticket {
  ID: number;
  title: string;
  description: string;
  genre: string;
  price: number;
  activation_Date: string;
  expiration_Date: string;
  photo: string;
  ticketCount: number;
}
export interface TicketToAdd {
  title: string;
  description: string;
  genre: string;
  price: number;
  activation_Date: string;
  expiration_Date: string;
  photo: string;
  ticketCount: number;
}
