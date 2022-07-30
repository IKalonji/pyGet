import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { ArticleModel } from '../models/articleModel';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  URL:string = "environment.article_endpoint"

  postArticle:string = 'https://bs-loadbalance-1072678543.af-south-1.elb.amazonaws.com:8081/v1/Blog/new';
  AllArticles:string = '/article/all';
  ArticleByCategory:string = '/article/by-category/';
  ArticleByAuthor:string = '/article/author/';
  Categories:string = "/categories"

  categoriesList: string[] = [];

  constructor(private http: HttpClient) { }

  postNewArticle(
    article: ArticleModel,
    token: string
  ){

    const header = {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'}
    return this.http.post(this.postArticle, JSON.stringify(article) , { headers: header })
  }

  getAllArticles(){
    return this.http.get('https://bs-loadbalance-1072678543.af-south-1.elb.amazonaws.com:8081/v1/Blog/all')
  }

  getArticleByCategory(category:string){
    return this.http.get(this.URL+this.ArticleByCategory+`/${category}`)
  }

  getArticleByAuthor(author:string){
    return this.http.get(this.URL+this.ArticleByAuthor+`/${author}`)
  }

  getCategories(){
    return this.http.get('https://bs-loadbalance-1072678543.af-south-1.elb.amazonaws.com:8081/v1/categories')
  }

}
