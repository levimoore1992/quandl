import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './auth/registration/registration.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './views/home/home.component';
import {QuestionComponent} from './views/question/question.component';
import {QuestionEditorComponent} from './views/question-editor/question-editor.component';
import {AnswerEditorComponent} from './views/answer-editor/answer-editor.component';
import {NotFoundComponent} from './views/not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'question/:slug', component: QuestionComponent},
  {path: 'ask', component: QuestionEditorComponent, pathMatch: 'full'},
  {path: 'ask/:slug', component: QuestionEditorComponent},
  {path: 'edit-answer/:id', component: AnswerEditorComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
