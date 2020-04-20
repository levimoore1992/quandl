import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from '../question/question.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.css']
})
export class QuestionEditorComponent implements OnInit {
  error;
  editorForm: FormGroup;
  defaultQuestion: string;
  slug = this.route.snapshot.params.slug;
  constructor(private fb: FormBuilder,
              private service: QuestionService,
              private router: Router,
              private route: ActivatedRoute
  ) {


        if (this.slug !== undefined) {
      this.service.getQuestions(this.slug).subscribe(res => {
        this.defaultQuestion = res.content;
      });
    }
  }

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      question: [this.defaultQuestion, Validators.maxLength(240)]
    });
  }

  submitForm() {


    if (this.editorForm.invalid) {
      this.error = 'The form is incorrect';
    }


    const payload = {
    content: this.editorForm.get('question').value
    };

    if (this.slug) {
      this.service.editQuestion(payload, this.slug).subscribe(res => {
              this.router.navigate(['question', res.slug]);

      });
    } else {
          this.service.postQuestion(payload).subscribe(res => {
      this.router.navigate(['question', res.slug]);
    });
    }


  }

}
