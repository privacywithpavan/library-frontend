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
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '9781491903063',
      category: 'Data Engineering',
      publishedYear: 2017,
      available: true,
    },
    {
      id: 2,
      title: 'AI Engineering',
      author: 'Chip Huyen',
      isbn: '9781098166298',
      category: 'Artificial Intelligence (AI)',
      publishedYear: 2024,
      available: false,
    },
    {
      id: 3,
      title: 'Designing Distributed Systems, 2nd Edition',
      author: 'Brendan Burns',
      isbn: '9781098156343',
      category: 'Distributed Systems',
      publishedYear: 2024,
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
