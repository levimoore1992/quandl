import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer;
  @Input() requestUser;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  isAnswerAuthor() {

    return this.answer.author === this.requestUser;
  }


  emitDelete() {
    this.delete.emit();
  }
}
