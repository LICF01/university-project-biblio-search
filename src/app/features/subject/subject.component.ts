import { Component, computed, signal } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { Column, Faculty, Row, Subject } from '../../../types';
import { TableComponent } from '../../components/table/table.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { FacultyService } from '../../services/faculty/faculty.service';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    TableComponent,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    SubjectFormComponent,
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
  providers: [ConfirmationService, MessageService],
})
export class SubjectComponent {
  data = signal<Subject[]>([]);
  faculties = signal<Faculty[]>([]);
  dataLabel: string = 'Subject';
  title: string = 'Administrar Materias';
  subject: Subject | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Añadir Materia';
  globalFilterFields = ['nombre_materia', 'nombre_facultad'];
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
            case 'idmateria':
              return 'Id';
            case 'nombre_materia':
              return 'Nombre';
            case 'idfacultad':
              return 'Id Facultad';
            case 'nombre_facultad':
              return 'Facultad';
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
    private subjectService: SubjectService,
    private facultyService: FacultyService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.fetchSubjects();
    this.fetchFaculties();
  }

  fetchSubjects() {
    this.subjectService.getAllSubjects().subscribe((res: any) => {
      this.data.set(res.data);
    });
  }

  fetchFaculties() {
    this.facultyService.getAllFaculties().subscribe((res: any) => {
      if (res.status === 'success') {
        this.faculties.set(res.data);
      }
    });
  }

  openFormDialog(title?: string) {
    if (title) this.formTitle = title;
    this.displayForm = true;
  }

  onSubjectEdit(data: any) {
    this.subject = {
      ...({
        idmateria: data.idmateria,
        nombre: data.nombre_materia,
        facultad: {
          idfacultad: data.idfacultad,
          nombre: data.nombre_facultad,
        },
      } as any),
    };
    this.openFormDialog('Editar Materia');
  }

  onCreate(data: Subject) {
    this.subjectService.createSubject(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchSubjects();
      },
      error: () => {
        this.showErrorMessage();
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Subject) {
    this.subjectService.updateSubject(data, data.idmateria).subscribe({
      next: () => {
        this.showSuccessMessage('updated');
        this.fetchSubjects();
      },
      error: () => {
        this.showErrorMessage();
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onDelete(data: Subject) {
    this.subjectService.deleteSubject(data.idmateria).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchSubjects();
      },
      error: (err: any) => {
        if (err.status === 409) {
          this.showErrorMessage(
            'No se puede eliminar la materia porque tiene registros asociados',
          );
        } else if (err.status === 400) {
          this.showErrorMessage('La materia no puede ser eliminada');
        }
      },
    });
  }

  showConfirmDialog(data: Row) {
    this.confirmationService.confirm({
      message: `Está seguro de eliminar ${this.dataLabel}?`,
      header: 'Delete Confirmation',
      icon: 'none',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.onDelete(data as Subject);
      },
      reject: () => {},
    });
  }

  showSuccessMessage(action: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: `${this.dataLabel} successfully ${action}`,
    });
  }

  showErrorMessage(message: string = 'Ha ocurrido un error') {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
