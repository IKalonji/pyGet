import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { ViewArticleComponent } from './components/view-article/view-article.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer, userTokenReducer, articleReducer, subReducer } from './store/store.reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreEffect } from './store/store.effects.ts';
import { MaterialModule } from '../assets/Material.modules';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { LandingComponentComponent } from './components/landing-component/landing-component.component';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AddArticleComponent } from './add-article/add-article.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {MatSelectModule} from '@angular/material/select';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyArticlesComponent } from './components/my-articles/my-articles.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ViewArticleComponent,
    ArticleCardComponent,
    CategoryFilterComponent,
    LandingComponentComponent,
    AddArticleComponent,
    MyArticlesComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatToolbarModule,
    HttpClientModule,
    MatMenuModule,
    StoreModule.forRoot({ user: userReducer, token: userTokenReducer, article: articleReducer, sub: subReducer }),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
