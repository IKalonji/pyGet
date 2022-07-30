import { ArticleModel } from './../../models/articleModel'
import {
  Component,
  OnInit
} from '@angular/core'

import {
  ArticleService
} from './../../services/article.service'

import { select, Store } from '@ngrx/store'

import {
  selectAllArticles,
} from './../../store/store.selectors'

import {
  allArticlesStore,
} from './../../store/store.actions'


@Component({
  selector: 'app-landing-component',
  templateUrl: './landing-component.component.html',
  styleUrls: ['./landing-component.component.css']
})
export class LandingComponentComponent implements OnInit {

  article: any = []

  category: any = []

  constructor(private store: Store, private articleService: ArticleService) { }

  filter() {
    //console.log(this.category)
  }

  ngOnInit(): void {
    this.articleService.getCategories().subscribe((data) => {
      this.category = data
      //console.log('category: ',this.category)
    })

    this.articleService.getAllArticles().subscribe((data) => {

      let getArticle = this.store.pipe(select(selectAllArticles))

      getArticle.subscribe((s) => {

        if (!s) {
          this.store.dispatch(
            allArticlesStore({ allArticles: data })
          )

          this.article=data
          //console.log('no store',this.article)
        } else {
          this.article = s
          //console.log('s store',this.article)
        }
      })
    })
  }

}
