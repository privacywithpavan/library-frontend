import { Injectable, signal } from '@angular/core';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookStoreService {
  private nextId = 4;

  readonly books = signal<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      genre: 'Fiction',
      publishedYear: 1925,
      available: true,
    },
    {
      id: 2,
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '9780399590504',
      genre: 'Non-Fiction',
      publishedYear: 2018,
      available: false,
    },
    {
      id: 3,
      title: 'Dune',
      author: 'Frank Herbert',
      isbn: '9780441172719',
      genre: 'Sci-Fi',
      publishedYear: 1965,
      available: true,
    },
  ]);

  addBook(book: Omit<Book, 'id'>): void {
    this.books.update((current) => [...current, { id: this.nextId++, ...book }]);
  }

  searchByIsbn(isbn: string): Book | undefined {
    const normalized = isbn.replace(/[-\s]/g, '').trim();
    if (!normalized) {
      return undefined;
    }

    return this.books().find((book) => book.isbn.replace(/[-\s]/g, '') === normalized);
  }
}
