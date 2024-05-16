import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { BooksService } from '../services/books.service';
import { Book, Books } from '../../types';
import { BookComponent } from '../components/book/book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, PaginatorModule, ToolbarModule, InputTextModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  books: Book[] = [];
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchInput: string = '';
  totalPages: number = 0;

  ngOnInit() {
    this.fetchBooks(0, 5);
  }

  fetchBooks(page: number, perPage: number, searchValue?: string) {
    this.booksService
      .getBooks('http://localhost:3000/books', {
        page,
        perPage,
        searchValue: searchValue ?? '',
      })
      .subscribe((books: Books) => {
        this.books = books.items;
        this.totalItems = books.total;
        this.totalPages = books.totalPages;
      });
  }

  onPageChange(event: any) {
    this.fetchBooks(event.page, event.rows);
  }

  onSearchSubmit(event: any) {
    this.fetchBooks(0, this.itemsPerPage, event.target.value);
  }
}
