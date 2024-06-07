import { Component, Input, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule, InputTextModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  cols: any[] = [];

  @Input() title: string = '';
  @Input() rows: any[] = [];

  ngOnChanges() {
    if (this.rows.length > 0) {
      this.cols = Object.keys(this.rows[0]).map((key) => {
        return {
          field: key,
          header: key.charAt(0).toUpperCase() + key.slice(1),
        };
      });
    }
  }
}
