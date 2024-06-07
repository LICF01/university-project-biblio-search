import { Component, Input, OnInit, output } from '@angular/core';
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
  cols: Column[] = [];

  @Input() title: string = '';
  @Input() rows: Row[] = [];

  onEditRow = output<Row>();
  onRowDelete = output<Row>();

  ngOnChanges() {
    if (this.rows.length > 0) {
      this.cols = Object.keys(this.rows[0]).map((key) => {
        return {
          field: key as keyof Row,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        };
      });
    }
  }

  editRow(row: Row) {
    this.onEditRow.emit(row);
  }

  deleteRow(row: Row) {
    this.onRowDelete.emit(row);
  }
}
