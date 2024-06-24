import { Component, computed, effect, input, output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Column, Row } from '../../../types';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  title = input.required<string>();
  rows = input.required<Row[] | []>();
  cols = input.required<Column[]>();
  globalFilterFields = input<string[]>();

  onEditRow = output<Row>();
  onRowDelete = output<Row>();
  onRowAdd = output();

  constructor() {
    effect(() => {
      console.log(this.cols());
    });
  }

  editRow(row: Row) {
    this.onEditRow.emit(row);
  }

  deleteRow(row: Row) {
    this.onRowDelete.emit(row);
  }

  addRow(e: Event) {
    this.onRowAdd.emit();
  }
}
