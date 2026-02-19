import { Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { HomeComponent } from './home/home.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { SearchBookComponent } from './search-book/search-book.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'browse', component: ViewBooksComponent },
  { path: 'search', component: SearchBookComponent },
  { path: '**', redirectTo: 'home' },
];
