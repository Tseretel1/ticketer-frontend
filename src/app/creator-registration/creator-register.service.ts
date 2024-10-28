import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreatorRegisterService {

  constructor(private http :HttpClient) 
  {

  }
  private URL = "https://localhost:7081/";

  private cloudName = 'ds1q7oiea';
  private uploadPreset = 'cloudinary_Upload_Preset';

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
  }


UpdateUser(user: RegisterAsCreatorDTO): Observable<any> {
  return this.http.put(this.URL + "register-as-creator", user, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'json',
  });   
}
}

export interface RegisterAsCreatorDTO{
  Name :string;
  LastName :string;
  PersonalID:string;
  PhoneNumber:string;
  IdCardPhoto:string
}
