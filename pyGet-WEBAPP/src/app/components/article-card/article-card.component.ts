import {
  Component,
  OnInit,
  Input,
} from '@angular/core';

import {
  ArticleModel
} from '../../models/articleModel';

import {
  ArticleService ,
} from 'app/services/article.service';

import {
  select,
  Store
} from '@ngrx/store';

import {
  selectArticle
} from './../../store/store.selectors';

import {
  articleStore
} from './../../store/store.actions';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input() article : any = {

    //TOD: remove - ts.config
    blogID: 0,
    body: '',
    category: {
      categoryID: 0,
      categoryName: '',
    },
    time: '',
    title: '',
    user: {
      age: 0,
      biography: '',
      email_address: '',
      gender: '',
      name: '',
      surname: '',
      userid: '',
      username: '',
    },
  };

  extractedArticle = '';

  constructor(
    private store: Store,
    private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.article.body.length > 500) {
      this.extractedArticle = this.article.body.slice(0, 500) +'...';
    }
    else {
      this.extractedArticle = this.article.body;
    }
  }

  showArticle() {
    this.store.dispatch(
      articleStore({ article: this.article })
  );

  let getArticle = this.store.pipe(select(selectArticle));
    getArticle.subscribe((s) => {
      if (!s) {
        return;
      } else {
        //console.log('article: ', s);
      }
    });
  }
}
