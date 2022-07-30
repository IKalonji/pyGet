import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CategoryModel } from 'app/models/categoryModel';
import { ArticleModel } from '../models/articleModel';
import { ArticleService } from '../services/article.service';
import {
  selectSub,
  selectUser,
  selectUserToken,
} from '../store/store.selectors';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css'],
})
export class AddArticleComponent implements OnInit {
  article: ArticleModel = {
    title: '',
    category: {
      categoryID: 0,
      categoryName: '',
    },
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
    time: '',
    body: '',
  };

  categories: CategoryModel[] = [];
  accessToken: string = '';
  userSub: string = '';
  userName: string = '';

  selectedValue: any;

  titleControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(50),
  ]);
  categoryControl = new FormControl('', [Validators.required]);
  contentControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(250),
  ]);

  constructor(
    private articleService: ArticleService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserName();
    this.getCategories();
    let sub = this.store.pipe(select(selectSub));
    sub.subscribe((s) => {
      if (!s) {
        return '';
      } else {
        this.userSub = s;
        return s;
      }
    });
  }

  getCategories() {
    this.articleService.getCategories().subscribe(
      (data) => {
        let response: any = data;
        if (data) {
          response.forEach((element: CategoryModel) => {
            this.categories.push(element as CategoryModel);
          });
        } else {
          this.categories.push({
            categoryID: -1,
            categoryName: 'error',
          } as CategoryModel);
        }
      },
      (error) => {
        console.log(error);
        this.categories.push({
          categoryID: -1,
          categoryName: 'error',
        } as CategoryModel);
      }
    );
  }

  submitArticle(event: any): void {
    this.article.category = this.selectedValue;

    this.article.time =
      new Date().toISOString().slice(0, 10) + ' ' + '00:00:00';

    this.article.user.userid = this.userSub;

    this.article.user.username = this.userName;

    this.getToken();

    //get user from user service and assign value to article.author
    const token = this.accessToken;
    if (token == '') {
      alert('There was an error obtaining your token');
      return;
    }

    this.articleService.postNewArticle(this.article, token).subscribe(
      (data) => {
        let postArticleResponse: any = data;
        let result = postArticleResponse.result;
        if ((result = 'ok')) {
          alert('Article successfully posted');
          this.router.navigateByUrl('');
        }
      },
      (error) => {
        console.log(error);
        alert('There was an error posting your article');
      }
    );
  }

  getToken(): string {
    let token = this.store.pipe(select(selectUserToken));
    token.subscribe((s) => {
      if (!s) {
        return '';
      } else {
        this.accessToken = s.access_token;
        return s.access_token;
      }
    });
    return '';
  }

  getUserName() {
    let getUser = this.store.pipe(select(selectUser));
    getUser.subscribe((s) => {
      if (!s) {
        return;
      } else {
        // console.log('user', s.username);
        return (this.userName = s.username);
      }
    });
  }
}
