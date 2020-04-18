import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Question} from './models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(slug) {
    return this.http.get<Question>(`http://127.0.0.1:80/api/questions/${slug}/`);
  }

  postQuestion(payload) {
    return this.http.post<Question>(`http://127.0.0.1:80/api/questions/`, payload);
  }
}
