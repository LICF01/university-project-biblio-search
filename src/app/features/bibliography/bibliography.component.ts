import { Component, computed, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { TableComponent } from '../../components/table/table.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ResourcesFormComponent } from '../resources/components/resources-form/resources-form.component';
import { Bibliography, Column, Row } from '../../../types';
import { BibliographyService } from '../../services/bibliography/bibliography.service';
import { ResourceTypesService } from '../../services/resource-types/resource-types.service';

@Component({
  selector: 'app-bibliography',
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
  templateUrl: './bibliography.component.html',
  styleUrl: './bibliography.component.css',
  providers: [MessageService, ConfirmationService],
})
export class BibliographyComponent {
  data = signal<Bibliography[]>([]);
  dataLabel: string = 'Bibliografía';
  title: string = 'Administrar Bibliografías';
  resource: Bibliography | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Agregar Bibliografía';
  globalFilterFields = [
    'titulo_material',
    'autor_material',
    'nombre_materia',
    'nombre_tipo_bibliografia',
  ];
  resourceTypes: { [key: number]: string } = {};
  bibliographyTypes: { [key: number]: string } = {};

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
            case 'titulo_material':
              return 'Material';
            case 'autor_material':
              return 'Autor';
            case 'idmateria':
              return 'Id Materia';
            case 'nombre_materia':
              return 'Materia';
            case 'tipobibliografia':
              return 'Id Tipo';
            case 'nombre_tipo_bibliografia':
              return 'Tipo';
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
    private bibliographyService: BibliographyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private resourceTypesService: ResourceTypesService,
  ) {
    this.resourceTypes = this.resourceTypesService.getResourceTypes();
    this.bibliographyTypes = {
      1: 'Principal',
      2: 'Complementaria',
    };
    this.fetchBibliographies();
  }

  fetchBibliographies() {
    this.bibliographyService.getAllBibliographies().subscribe((res: any) => {
      if (res.status === 'success') {
        const d = res.data.map((r: any) => {
          return {
            ...r,
            nombre_tipo_bibliografia:
              this.bibliographyTypes[
                r.tipobibliografia as keyof typeof this.bibliographyTypes
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

  onBibliographyEdit(data: any) {
    this.resource = { ...data };
    this.openFormDialog('Editar Bibliografía');
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
        this.onDelete(data as Bibliography);
      },
      reject: () => {},
    });
  }

  onCreate(data: Bibliography) {
    this.bibliographyService.createBibliography(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchBibliographies();
      },
      error: () => {
        this.showErrorMessage('creating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Bibliography) {
    this.bibliographyService
      .updateBibliography(data, data.idmaterial)
      .subscribe({
        next: () => {
          this.showSuccessMessage('updated');
          this.fetchBibliographies();
        },
        error: () => {
          this.showErrorMessage('updating');
        },
        complete: () => {
          this.displayForm = false;
        },
      });
  }

  onDelete(data: Bibliography) {
    this.bibliographyService.deleteBibliography(data.idmaterial).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchBibliographies();
      },
      error: () => {
        this.showErrorMessage('deleting');
      },
    });
  }
}
