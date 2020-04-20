import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) { }

  getUser() {
    return this.http.get('http://127.0.0.1:80/api/user/');
  }


  loginUser(body) {
    return this.http.post('http://127.0.0.1:80/api/rest-auth/login/', body);
  }

  registerUser(body) {
    return this.http.post('http://127.0.0.1:80/api/rest-auth/registration/', body);
  }
  isAuthenticated() {
    return !!this.cookieService.get('token');
  }

  logout() {
      this.cookieService.delete('token');
      this.router.navigate(['login']);
  }


}
