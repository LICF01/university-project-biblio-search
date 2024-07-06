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
import { ResourcesFormComponent } from './components/resources-form/resources-form.component';

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
    ResourcesFormComponent,
  ],
  templateUrl: './resources.component.html',
  styleUrl: './resources.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ResourcesComponent {
  data = signal<Resource[]>([]);
  dataLabel: string = 'Materiales';
  title: string = 'Administrar Materiales';
  resource: Resource | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Agregar Recurso';
  globalFilterFields = ['titulo'];
  resourceTypes = {
    1: 'Libro',
    2: 'Artículo',
    3: 'Revista',
    4: 'Tesis',
    5: 'Otro',
  };

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
              return 'Id Tipo de Material';
            case 'nombreTipoMaterial':
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
    this.resourceService.getAllResources().subscribe((res: any) => {
      if (res.status === 'success') {
        const d = res.data.map((r: any) => {
          return {
            ...r,
            nombreTipoMaterial:
              this.resourceTypes[
                r.tipomaterial as keyof typeof this.resourceTypes
              ],
          };
        });
        this.data.set(d);
      }
    });
  }

  openFormDialog(title?: string) {
    if (title) this.formTitle = title;
    this.displayForm = true;
  }

  onResourceEdit(data: any) {
    this.resource = { ...data };
    this.openFormDialog('Editar Material');
  }

  showSuccessMessage(action: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      // detail: `${this.dataLabel} successfully ${action}`,
      detail: `La operación se realizó exitosamente`,
    });
  }

  showErrorMessage(action: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      // detail: `An error occurred while ${action} ${this.dataLabel}`,
      detail: `Ha ocurrido un error durante la operación`,
    });
  }

  showConfirmDialog(data: Row) {
    this.confirmationService.confirm({
      message: `Está seguro que desea eliminar ${this.dataLabel}?`,
      header: 'Confirmación de Eliminación',
      icon: 'none',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Rechazar',
      accept: () => {
        this.onDelete(data as Resource);
      },
      reject: () => {},
    });
  }

  onCreate(data: Resource) {
    this.resourceService.createResource(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchResources();
      },
      error: () => {
        this.showErrorMessage('creating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Resource) {
    this.resourceService.updateResource(data, data.idmaterial).subscribe({
      next: () => {
        this.showSuccessMessage('updated');
        this.fetchResources();
      },
      error: () => {
        this.showErrorMessage('updating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onDelete(data: Resource) {
    this.resourceService.deleteResource(data.idmaterial).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchResources();
      },
      error: () => {
        this.showErrorMessage('deleting');
      },
    });
  }
}
