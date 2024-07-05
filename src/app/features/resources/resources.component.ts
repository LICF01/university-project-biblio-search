import { Component, computed, signal } from '@angular/core';
import { Column, Resource, Row } from '../../../types';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ResourceService } from '../../services/resource/resource.service';

import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [
    TableComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ResourcesComponent {
  data = signal<Resource[]>([]);
  dataLabel: string = 'Materiales';
  title: string = 'Administrar Materiales';
  faculty: Resource | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Agregar Recurso';
  globalFilterFields = ['titulo'];

  cols = computed<Column[]>(() => {
    const rows = this.data();
    if (rows.length > 0) {
      let keys = Object.keys(rows[0]);
      keys.sort((a, b) => {
        if (a === 'updated_at' || a === 'created_at') return 1;
        if (b === 'updated_at' || b === 'created_at') return -1;
        return 0;
      });
      return keys.map((key) => {
        const getHeader = (key: string): string => {
          switch (key) {
            case 'idmaterial':
              return 'Id';
            case 'titulo':
              return 'Titulo';
            case 'autor':
              return 'Autor';
            case 'tipomaterial':
              return 'Tipo de Material';
            case 'url':
              return 'URL';
            default:
              return '';
          }
        };

        return {
          field: key as keyof Row,
          header: getHeader(key),
        };
      });
    }
    return [];
  });

  constructor(
    private resourceService: ResourceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.fetchResources();
  }

  fetchResources() {
    this.resourceService.getAllFaculties().subscribe((res: any) => {
      if (res.status === 'success') {
        console.log(res.data);
        this.data.set(res.data);
      }
    });
  }
}
