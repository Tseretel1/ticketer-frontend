import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { Observable } from 'rxjs';
import { URLs,URL } from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient, private datepipe: DatePipe) {}
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

  editProfilePhoto(photo: string): Observable<any> {
    return this.http.put(
      this.URL + 'edit-profile-photo',
      { photo: photo },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      }
    );
  }

  editProfileName(name: string): Observable<any> {
    return this.http.put(
      this.URL + 'edit-profile-name',
      { name: name },
      {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'json',
      }
    );
  }

  GetMytickets(): Observable<any> {
    return this.http.get(this.URL + 'my-tickets');
  }

  GetAllActiveTickets(): Observable<any> {
    return this.http.get(`${this.URL}all-active-tickets`);
  }

  GetMyProfile(): Observable<any> {
    return this.http.get(this.URL + 'my-profile');
  }

  GetAccountManagment(): Observable<any> {
    return this.http.get(this.URL + 'account-management');
  }

  RemoveUserfromAccount(userid: number): Observable<any> {
    return this.http.delete(`${this.URL}remove-user-from-account/${userid}`);
  }
}
export interface Profile {
  Username: string;
  Logo: string;
}
