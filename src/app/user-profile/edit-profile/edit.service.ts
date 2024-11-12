import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URLs,URL} from '../../route-paths';

@Injectable({
  providedIn: 'root',
})
export class EditService {
  constructor(private http: HttpClient) {}
  BaseUrl: URL = URLs;

  private URL = this.BaseUrl.URL;
  GetMyProfile(): Observable<any> {
    return this.http.get(this.URL + 'user-profile');
  }
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

  UpdateUser(user: RegisterAsCreatorDTO): Observable<any> {
    return this.http.put(this.URL + 'edit-profile', user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
    });
  }
}

export interface RegisterAsCreatorDTO {
  Name: string;
  LastName: string;
  photo: string;
}
