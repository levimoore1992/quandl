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

    editQuestion(payload, slug) {
    console.log(payload)
        return this.http.put<Question>(`http://127.0.0.1:80/api/questions/${slug}/`, payload);

  }

  deleteQuestion(slug) {
    return this.http.delete<Question>(`http://127.0.0.1:80/api/questions/${slug}/`);
  }


  getAnswersBySlug(slug: string) {
        return this.http.get<Question>(`http://127.0.0.1:80/api/questions/${slug}/answers/`);

  }

  getAnswersById(id) {
            return this.http.get<Question>(`http://127.0.0.1:80/api/answers/${id}/`);

  }

  postAnswer(slug: string, payload) {
        return this.http.post<Question>(`http://127.0.0.1:80/api/questions/${slug}/answer/`, payload);
  }

    editAnswer(payload, id) {
          return this.http.put<Question>(`http://127.0.0.1:80/api/answers/${id}/`, payload);

  }

  deleteAnswer(answer) {
    return this.http.delete(`http://127.0.0.1:80/api/answers/${answer.id}/`);
  }


}
