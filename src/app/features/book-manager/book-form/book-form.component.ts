import { Component, EventEmitter, OnInit, Output, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    CommonModule,
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css',
})
export class BookFormComponent implements OnInit {
  form: any;

  onFormSubmit = output<any>();
  onFormCancel = output<any>();

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      category: new FormControl(''),
      language: new FormControl(''),
      year: new FormControl(2024),
      pages: new FormControl(0),
      link: new FormControl(''),
    });
  }

  onSubmit() {
    this.onFormSubmit.emit(this.form);
  }

  onCancel() {
    this.onFormCancel.emit(this.form);
  }
}
