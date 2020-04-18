import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  questions: [];
  constructor(private http: HttpClient) { }

  getQuestions() {
    return this.http.get('http://127.0.0.1:80/api/questions/');
  }
}
