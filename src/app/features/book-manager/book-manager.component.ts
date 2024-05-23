import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { Book, Books, Column } from '../../../types';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-manager',
  standalone: true,
  imports: [TableModule, CommonModule, InputTextModule, ButtonModule],
  templateUrl: './book-manager.component.html',
  styleUrl: './book-manager.component.css',
})
export class BookManagerComponent {
  cols: Column[] = [];
  books: Book[] = [];
  searchInput: string = '';

  constructor(private booksService: BooksService) {}

  fetchBooks() {
    this.booksService.getAllBooks().subscribe((books: Books) => {
      console.log(books);
      this.books = books.items;
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'author', header: 'Author' },
      { field: 'category', header: 'Category' },
      { field: 'language', header: 'Language' },
      { field: 'country', header: 'Country' },
      { field: 'year', header: 'Year' },
      { field: 'pages', header: 'Pages' },
      { field: 'link', header: 'Link' },
    ];

    this.fetchBooks();
  }

  openNew() {}
}
