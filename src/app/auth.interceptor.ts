import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    const isCloudinaryRequest = req.url.includes('https://api.cloudinary.com');

    let token = localStorage.getItem('token');
    if (req.url.includes('/api/Creator/')) {
      token = localStorage.getItem('CreatorToken');
    }

    const clonedReq = isCloudinaryRequest ? req : (token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req);

    return next.handle(clonedReq).pipe(
      finalize(() => {
        this.loaderService.hide();
      })
    );
  }
}
