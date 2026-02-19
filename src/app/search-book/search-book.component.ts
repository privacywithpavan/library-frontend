import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';
import { BookStoreService } from '../services/book-store.service';

@Component({
  selector: 'app-search-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-book.component.html',
  styleUrl: './search-book.component.css',
})
export class SearchBookComponent implements OnInit, OnDestroy {
  protected isbnQuery = '';
  protected foundBook: Book | null = null;
  protected hasSearched = false;
  private routeSub?: Subscription;

  constructor(
    private readonly bookStore: BookStoreService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.queryParamMap.subscribe((params) => {
      const isbn = params.get('isbn') ?? '';
      this.isbnQuery = isbn;
      if (isbn.trim()) {
        this.search();
      } else {
        this.hasSearched = false;
        this.foundBook = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

  protected search(): void {
    this.hasSearched = true;
    const result = this.bookStore.searchByIsbn(this.isbnQuery);
    this.foundBook = result ?? null;
  }

  protected reset(): void {
    this.isbnQuery = '';
    this.foundBook = null;
    this.hasSearched = false;
  }
}
