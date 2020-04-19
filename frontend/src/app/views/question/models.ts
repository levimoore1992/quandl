export interface Question {
  content: string;
  author: string;
  created_at: Date;
  slug: string;
  user_has_answered: boolean
}

export class Answer {
}
