import { ArticleModel } from './../models/articleModel';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { User, UserTokens } from '../models/User';

export const selectUser = createFeatureSelector<User>('user');

export const selectSub = createFeatureSelector<string>('sub');

export const selectUserToken = createFeatureSelector<UserTokens>('token');

export const selectArticle = createFeatureSelector<ArticleModel>('article');

export const selectAllArticles = createFeatureSelector<ArticleModel[]>('allArticles');
