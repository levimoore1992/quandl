import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import{ CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
form: FormGroup;
  public signupInvalid: boolean;
  private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
  }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    this.form = this.fb.group({
      email: ['', Validators.email],
      username: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required],
    });
  }

  onSubmit() {
  const body = {
    username: this.form.get('username').value,
    password: this.form.get('password').value,
    email: this.form.get('email').value
  };

  this.authService.registerUser(body).subscribe(res => {
    // @ts-ignore
    this.cookieService.set('token', res.key);
    this.router.navigate(['/']);
    });
  }
}
