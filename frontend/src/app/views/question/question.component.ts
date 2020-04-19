import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
  answers: Answer;
  userHasAnswered = false;
  showForm = false;
  answerForm: FormGroup;
  error: any;

  constructor(private route: ActivatedRoute,
              private service: QuestionService,
              private titleService: Title,
              private fb: FormBuilder) { }

  ngOnInit() {

            this.answerForm = this.fb.group({
              answerBody: ['', Validators.required],
              });


            this.slug = this.route.snapshot.params.slug;
            this.service.getQuestions(this.slug).subscribe(res => {
            this.titleService.setTitle(res.content);
            this.userHasAnswered = res.user_has_answered;
            this.question = res;

    });
            this.service.getQuestionAnswers(this.slug).subscribe(res => {
      this.answers = res;
    });
  }


  submitForm() {
    const payload = {
      answer: this.answerForm.get('answerBody').value
    };

    this.service.postAnswer(this.slug, payload).subscribe(res => {
      console.log(res);
    })
  }
}
