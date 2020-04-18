import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from './question.service';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  slug: string;
  question: any;
  constructor(private route: ActivatedRoute, private service: QuestionService, private titleService: Title) { }

  ngOnInit() {
    this.slug = this.route.snapshot.params.slug;
    this.service.getQuestions(this.slug).subscribe(res => {
      this.question = res;
      this.titleService.setTitle(this.question.content);
    });

  }

}
