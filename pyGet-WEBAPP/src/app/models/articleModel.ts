import {
  CategoryModel
} from './categoryModel';

export interface ArticleModel {
  blogID?: number,
  body: string,
  category: CategoryModel,
  time: string,
  title: string,
  user: {
    age: number,
    biography: string,
    email_address: string,
    gender: string,
    name: string,
    surname: string,
    userid: string,
    username: string,
  },
};
