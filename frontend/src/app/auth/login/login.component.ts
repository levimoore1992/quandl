import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formError: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    if (this.authService.isAuthenticated()) {
      router.navigate(['']);
    }
  }
  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
  const body = {
    username: this.form.get('username').value,
    password: this.form.get('password').value
  };

  this.authService.loginUser(body).subscribe(res => {
        // @ts-ignore
      this.cookieService.set('csrftoken', res.key);

        this.router.navigate(['']);
  },
    error => {
    this.formError = 'Username or password are incorrect';
    });

  }
}
