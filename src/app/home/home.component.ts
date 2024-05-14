import { Component } from '@angular/core';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.booksService
      .getBooks('http://localhost:3000/books', {
        page: 0,
        perPage: 5,
      })
      .subscribe((books) => {
        console.log(books);
      });
  }
}
