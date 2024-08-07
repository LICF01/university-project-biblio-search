import { Component, signal, computed } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TableComponent } from '../../components/table/table.component';
import { FacultyFormComponent } from './components/faculty-form/faculty-form.component';
import { FacultyService } from '../../services/faculty/faculty.service';
import { Column, Faculty, Row } from '../../../types';

@Component({
  selector: 'app-faculty',
  standalone: true,
  imports: [
    TableComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FacultyFormComponent,
    ToastModule,
    ConfirmDialogModule,
  ],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css',
  providers: [MessageService, ConfirmationService],
})
export class FacultyComponent {
  data = signal<Faculty[]>([]);
  dataLabel: string = 'Facultad';
  title: string = 'Administrar Facultades';
  faculty: Faculty | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Agregar Facultad';
  globalFilterFields = ['nombre'];

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
            case 'idfacultad':
              return 'Id';
            case 'nombre':
              return 'Nombre';
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
    private facultyService: FacultyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.fetchFaculties();
  }

  fetchFaculties() {
    this.facultyService.getAllFaculties().subscribe((res: any) => {
      if (res.status === 'success') {
        this.data.set(res.data);
      }
    });
  }

  openFormDialog(title: string = 'Agregar Facultad') {
    this.formTitle = title;
    this.displayForm = true;
  }

  onFacultyEdit(data: any) {
    this.faculty = { ...data };
    this.openFormDialog('Editar Facultad');
  }

  showSuccessMessage(action: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      // detail: `${this.dataLabel} successfully ${action}`,
      detail: `La operación se realizó exitosamente`,
    });
  }

  showErrorMessage(message: string = 'Ha ocurrido un error') {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
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
        this.onDelete(data as Faculty);
      },
      reject: () => {},
    });
  }

  onCreate(data: Faculty) {
    this.facultyService.createFaculty(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchFaculties();
      },
      error: () => {
        this.showErrorMessage();
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Faculty) {
    this.facultyService.updateFaculty(data, data.idfacultad).subscribe({
      next: () => {
        this.showSuccessMessage('updated');
        this.fetchFaculties();
      },
      error: () => {
        this.showErrorMessage();
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onDelete(data: Faculty) {
    this.facultyService.deleteFaculty(data.idfacultad).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchFaculties();
      },
      error: (err: any) => {
        if (err.status === 409) {
          this.showErrorMessage(
            'No se puede eliminar la facultad porque tiene registros asociados',
          );
        } else if (err.status === 400) {
          this.showErrorMessage('La facultad no puede ser eliminada');
        }
      },
    });
  }
}
