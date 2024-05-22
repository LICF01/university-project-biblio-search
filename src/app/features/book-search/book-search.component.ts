import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { Book, Books } from '../../../types';
import { BooksService } from '../../services/books.service';
import { BookComponent } from './components/book/book.component';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [
    BookComponent,
    PaginatorModule,
    ToolbarModule,
    InputTextModule,
    DataViewModule,
  ],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  books: Book[] = [];
  first: number = 0;
  itemsPerPage: number = 5;
  selectedPage: number = 0;
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

  onLazyLoad(event: any) {
    this.first = event.first;
    this.itemsPerPage = event.rows;
    this.selectedPage = Math.floor(this.first / this.itemsPerPage);
    this.fetchBooks(this.selectedPage, this.itemsPerPage);
  }

  onSearchSubmit(event: any) {
    this.fetchBooks(0, this.itemsPerPage, event.target.value);
  }
}
