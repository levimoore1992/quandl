import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor( private cookieService: CookieService) {}

    getToken() {
    return this.cookieService.get('csrftoken');
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', `Token ${this.getToken()}`)
    });
    if (this.getToken() === '') {
      return next.handle(request);
    }
    return next.handle(modifiedRequest);

  }
}
