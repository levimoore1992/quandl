import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {QuestionService} from '../question/question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() answer;
  @Input() requestUser;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  userLikedAnswer;
  likesCounter;
  constructor(private service: QuestionService) { }

  ngOnInit(): void {
    console.log(this.answer);
    this.userLikedAnswer = this.answer.user_has_voted;
    this.likesCounter = this.answer.like_count;
  }

  isAnswerAuthor() {

    return this.answer.author === this.requestUser;
  }


  emitDelete() {
    this.delete.emit();
  }




  toggleLike() {
        this.userLikedAnswer === false ? this.likeAnswer() : this.unlikeAnswer();

  }

    likeAnswer() {
    this.userLikedAnswer = true;
    this.likesCounter += 1;
    this.service.likeAnswer(this.answer.id);
  }

  unlikeAnswer() {
    this.userLikedAnswer = false;
    this.likesCounter -= 1;
    this.service.unlikeAnswer(this.answer.id);
  }
}
