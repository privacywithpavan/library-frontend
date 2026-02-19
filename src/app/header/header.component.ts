import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  protected isbnQuery = '';

  constructor(private readonly router: Router) {}

  protected submitSearch(): void {
    const normalized = this.isbnQuery.trim();
    if (!normalized) {
      return;
    }

    this.router.navigate(['/search'], { queryParams: { isbn: normalized } });
  }
}
