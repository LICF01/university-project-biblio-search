import { Component, OnInit } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { BooksService } from '../services/books.service';
import { Book, Books } from '../../types';
import { BookComponent } from '../components/book/book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private booksService: BooksService) {}

  books: Book[] = [];
  itemsPerPage: number = 5;
  totalItems: number = 0;

  ngOnInit() {
    this.fetchBooks(0, 5);
  }

  fetchBooks(page: number, perPage: number) {
    this.booksService
      .getBooks('http://localhost:3000/books', {
        page,
        perPage,
      })
      .subscribe((books: Books) => {
        this.books = books.items;
        this.totalItems = books.total;
      });
  }

  onPageChange(event: any) {
    console.log(event);
    this.fetchBooks(event.page, event.rows);
  }
}
