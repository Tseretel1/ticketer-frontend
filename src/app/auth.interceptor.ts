import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (req.url.includes('/api/Creator/')) {
      token = localStorage.getItem('CreatorToken');
    }

    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(req.url.includes('/api/Creator/') ? "Creator Token sent" : "User Token sent");
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
