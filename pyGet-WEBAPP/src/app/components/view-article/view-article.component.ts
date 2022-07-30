import { ArticleModel } from './../../models/articleModel';
import { selectArticle } from './../../store/store.selectors';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit {
  @Input()
  expectedProp!: { title: string; date: string; component: string };
  constructor(private router: ActivatedRoute, private route: ActivatedRoute,
    private store: Store,) {}

  selectArticle: ArticleModel = {
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

  ngOnInit(): void {
    this.getArticle()
  }

  async getArticle(): Promise<void> {
    let getArticle = this.store.pipe(select(selectArticle));
    getArticle.subscribe((s) => {
      if (!s) {
        return;
      } else {
        this.selectArticle = s ;
      }
    });
  }

}
