import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Book } from '../../../../../types';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CardModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() book!: Book;
}
