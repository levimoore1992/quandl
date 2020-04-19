import { Component, OnInit } from '@angular/core';
import {HomeService} from './home.service';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  questions;
  constructor(private service: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    this.service.getQuestions().subscribe(res => {
      this.questions = res;
    });
  }

}
