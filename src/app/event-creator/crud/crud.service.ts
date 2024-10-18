import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private url = "https://localhost:7081/api/Creator/";

  private cloudName = 'ds1q7oiea';
  private uploadPreset = 'cloudinary_Upload_Preset';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
  }

  deleteTicket(id: number): Observable<any> {
    return this.http.delete(`${this.url}delete-tickets/${id}`);
  }

  constructor(private http: HttpClient,private datePipe: DatePipe) { }
  
  getMatchingTicket(ticketId: number): Observable<any> {
    return this.http.get(`${this.url}matching-ticket/${ticketId}`);
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
    return this.http.put(this.url + "update-tickets", ticket, {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
    });   
  }



  createTicket(ticket: TicketToAdd): Observable<any> {
      return this.http.post(this.url + "add-new-tickets", ticket, {
          headers: { 'Content-Type': 'application/json' },
          responseType: 'json',
    });
  }



}  

export interface Ticket{
  ID :number;
  title :string;
  description :string;
  genre:string;
  price:number;
  activation_Date : string;
  expiration_Date :string;
  photo:string;
  ticketCount:number;
}
export interface TicketToAdd{
  title :string;
  description :string;
  genre:string;
  price:number;
  activation_Date : string;
  expiration_Date :string;
  photo:string;
  ticketCount:number;
}


