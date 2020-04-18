import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(slug) {
    return this.http.get(`http://127.0.0.1:80/api/questions/${slug}/`);
  }
}
