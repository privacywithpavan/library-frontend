import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book';
import { BookStoreService } from '../services/book-store.service';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  protected formData: Omit<Book, 'id'> = {
    title: '',
    author: '',
    isbn: '',
    genre: 'Fiction',
    publishedYear: new Date().getFullYear(),
    available: true,
  };

  protected genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Sci-Fi', 'Fantasy'];

  constructor(private readonly bookStore: BookStoreService) {}

  protected submit(): void {
    if (!this.formData.title.trim() || !this.formData.author.trim() || !this.formData.isbn.trim()) {
      return;
    }

    this.bookStore.addBook({
      title: this.formData.title.trim(),
      author: this.formData.author.trim(),
      isbn: this.formData.isbn.trim(),
      genre: this.formData.genre,
      publishedYear: this.formData.publishedYear,
      available: this.formData.available,
    });

    this.formData = {
      title: '',
      author: '',
      isbn: '',
      genre: 'Fiction',
      publishedYear: new Date().getFullYear(),
      available: true,
    };
  }
}
