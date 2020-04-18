import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../question/question.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  error;
  editorForm: FormGroup;

  constructor(private fb: FormBuilder, private service: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      question: ['', Validators.maxLength(240)]
    });
  }

  submitForm() {

    if (this.editorForm.invalid) {
      this.error = 'The form is incorrect';
    }

    const payload = {
    content: this.editorForm.get('question').value
    };
    this.service.postQuestion(payload).subscribe(res => {
      this.router.navigate(['question', res.slug]);
    });
  }
}
