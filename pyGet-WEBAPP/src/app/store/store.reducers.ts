import { createReducer, on } from '@ngrx/store';
import { userStore, userTokenStore, articleStore, allArticlesStore, userSubStore } from './store.actions';
import { User, UserTokens } from '../models/User';
import { ArticleModel } from '../models/articleModel'

export const userState: User = {
  username: '',
};

export const userTokenState: UserTokens = {
  access_token: '',
  expires_in: 0,
  id_token: '',
  refresh_token: '',
  token_type: ''
};

export const articleState: ArticleModel = {
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
}

export const subState: string = '';

export const allArticlesState: ArticleModel[] = [
  articleState,
]

export const subReducer = createReducer(
  subState,
on(userSubStore, (state, { sub }) => {
  return sub;
})
);

export const userReducer = createReducer(
    userState,
  on(userStore, (state, { user }) => {
    return user;
  })
);

export const userTokenReducer = createReducer(
  userTokenState,
  on(userTokenStore, (state, { token }) => {
    return token;
  })
);

export const articleReducer = createReducer(
  articleState,
  on(articleStore, (state, { article }) => {
    return article;
  })
);

export const allArticlesReducer = createReducer(
  allArticlesState,
  on(allArticlesStore, (state, { allArticles }) => {
    return allArticles;
  })
);
