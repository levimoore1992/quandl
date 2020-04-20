import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from './question.service';
import {Title} from '@angular/platform-browser';

import {Question, Answer} from './models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  slug: string;
  question: Question;
  answers: Array<Answer>;
  userHasAnswered = false;
  showForm = false;
  answerForm: FormGroup;
  error: any;
  requestUser;

  constructor(private route: ActivatedRoute,
              private service: QuestionService,
              private titleService: Title,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
            this.setRequestUser();
            this.answerForm = this.fb.group({
              answerBody: ['', Validators.required],
              });


            this.slug = this.route.snapshot.params.slug;
            this.service.getQuestions(this.slug).subscribe(res => {
            this.titleService.setTitle(res.content);
            this.userHasAnswered = res.user_has_answered;
            this.question = res;

    });
            this.service.getAnswersBySlug(this.slug).subscribe(res => {
                // @ts-ignore
              this.answers = res;
    });
  }

  isQuestionAuthor() {
        return this.question.author === this.requestUser;

  }

  setRequestUser() {
    this.requestUser = localStorage.getItem('username');
  }

  deleteAnswer(answer) {
    this.service.deleteAnswer(answer).subscribe(_ => {
      this.answers.splice(this.answers.indexOf(answer));
      this.userHasAnswered = false;
    });
  }


  submitForm() {
    const payload = {
      body: this.answerForm.get('answerBody').value
    };

    this.service.postAnswer(this.slug, payload).subscribe(res => {
      this.answers.unshift(res);
      this.showForm = false;
      this.userHasAnswered = true;
    });
  }

  deleteQuestion() {
    this.service.deleteQuestion(this.slug).subscribe(_ => {
      this.router.navigate(['']);
    });
  }

  editQuestion() {
    this.router.navigate(['ask', this.slug]);
  }
}
