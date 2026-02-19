import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookStoreService } from '../services/book-store.service';

@Component({
  selector: 'app-view-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-books.component.html',
  styleUrl: './view-books.component.css',
})
export class ViewBooksComponent {
  protected readonly books;

  constructor(private readonly bookStore: BookStoreService) {
    this.books = this.bookStore.books;
  }
}
