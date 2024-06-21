import { Component, computed, input, output } from '@angular/core';
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
  cols = computed<Column[]>(() => {
    const rows = this.rows();
    if (rows.length > 0) {
      let keys = Object.keys(rows[0]);
      keys.sort((a, b) => {
        if (a === 'updated_at' || a === 'created_at') return 1;
        if (b === 'updated_at' || b === 'created_at') return -1;
        return 0;
      });
      return keys.map((key) => {
        return {
          field: key as keyof Row,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        };
      });
    }
    return [];
  });
  globalFilterFields = input<string[]>();

  onEditRow = output<Row>();
  onRowDelete = output<Row>();
  onRowAdd = output();

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
