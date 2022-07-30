import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ArticleService } from 'app/services/article.service';
import { selectAllArticles, selectUser } from './../../store/store.selectors';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css'],
})
export class MyArticlesComponent implements OnInit {
  myArticles: any = [];
  message: string = 'You have not submitted any articles';
  userName: string = '';

  constructor(private store: Store, private articleService: ArticleService) {}

  ngOnInit(): void {
    this.getUser();

    this.articleService.getAllArticles().subscribe((data) => {
      console.log('s articles', data);
      return this.myArticles = data;
    });
        // console.log(this.userName)
  }

  getUser() {
    let getUser = this.store.pipe(select(selectUser));
    getUser.subscribe((s) => {
      if (!s) {
        // console.log('no username');
      } else {
        // console.log('user', s);
        this.userName = s.username;
      }
    });
  }
}
