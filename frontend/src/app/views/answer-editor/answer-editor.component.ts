import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../question/question.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-answer-editor',
  templateUrl: './answer-editor.component.html',
  styleUrls: ['./answer-editor.component.css']
})
export class AnswerEditorComponent implements OnInit {
  editorForm: FormGroup;
  error: string;
  defaultAnswer: string;
  id;
  constructor(private fb: FormBuilder, private service: QuestionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.id;


    this.service.getAnswersById(this.id).subscribe(res => {
      this.defaultAnswer = res.body;
    });


    this.editorForm = this.fb.group({
      answer: ['', Validators.maxLength(240)]
    });
  }

  submitForm() {
    if (this.editorForm.invalid) {
      this.error = 'The form is incorrect';
    }

    const payload = {
    body: this.editorForm.get('answer').value
    };
    this.service.editAnswer(payload, this.id).subscribe(res => {
      this.router.navigate(['question', res.question_slug]);
    });
  }
}
