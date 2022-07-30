import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';
import { CommonModule } from '@angular/common';
import { AddArticleComponent } from './add-article/add-article.component';

const routes: Routes = [
  {
    path: 'add-article',
    component: AddArticleComponent,
  },
  {
    path: 'article',
    component: ViewArticleComponent,
  },
  { path: 'my-articles', component: MyArticlesComponent },
  { path: '', component: LandingComponentComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
