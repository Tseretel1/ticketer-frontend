import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private datepipe: DatePipe) {}
  BaseUrl: any = BaseURL;

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

  editProfilePhoto(photo: string): Observable<any> {
    return this.http.put(
      this.BaseUrl.CreatorURL + 'edit-profile-photo',
      { photo: photo },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      }
    );
  }

  editProfileName(name: string): Observable<any> {
    return this.http.put(
      this.BaseUrl.CreatorURL + 'edit-profile-name',
      { name: name },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      }
    );
  }

  GetMytickets(): Observable<any> {
    return this.http.get(this.BaseUrl.CreatorURL + 'my-tickets');
  }

  GetAllActiveTickets(): Observable<any> {
    return this.http.get(`${this.BaseUrl.CreatorURL}all-active-tickets`);
  }

  GetMyProfile(): Observable<any> {
    return this.http.get(this.BaseUrl.CreatorURL + 'my-profile');
  }

  GetAccountManagment(): Observable<any> {
    return this.http.get(this.BaseUrl.CreatorURL + 'account-management');
  }

  RemoveUserfromAccount(userid: number): Observable<any> {
    return this.http.delete(`${this.BaseUrl.CreatorURL}remove-user-from-account/${userid}`);
  }
}
export interface Profile {
  Username: string;
  Logo: string;
}
