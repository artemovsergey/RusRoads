import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'news', component: NewsComponent },
  { path: '', component: HomeComponent },  
];
