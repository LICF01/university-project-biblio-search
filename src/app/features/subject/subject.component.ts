import { Component, computed } from '@angular/core';
import { SubjectService } from '../../services/subject/subject.service';
import { Column, Row, Subject } from '../../../types';
import { TableComponent } from '../../components/table/table.component';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';

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
  data: Subject[] = [];
  dataLabel: string = 'Subject';
  title: string = 'Manage Subjects';
  subject: Subject | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Add Subject';
  cols = computed<Column[]>(() => {
    const rows = this.data;
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
            case 'facultyId':
              return 'id';
            case 'name':
              return 'nombre';
            case 'subjects':
              return 'materias';
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
  globalFilterFields = ['name'];

  constructor(
    private subjectService: SubjectService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.fetchSubjects();
  }

  fetchSubjects() {
    this.subjectService.getAllSubjects().subscribe((data) => {
      this.data = data.filter((obj) => obj.hasOwnProperty('name'));
    });
  }

  openFormDialog(title?: string) {
    if (title) this.formTitle = title;
    this.displayForm = true;
  }

  onSubjectEdit(data: Row) {
    this.subject = { ...(data as Subject) };
    this.openFormDialog('Edit Faculty');
  }

  onCreate(data: Subject) {
    this.subjectService.createSubject(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchSubjects();
      },
      error: () => {
        this.showErrorMessage('creating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Subject) {
    this.subjectService.updateSubject(data, data.id).subscribe({
      next: () => {
        this.showSuccessMessage('updated');
        this.fetchSubjects();
      },
      error: () => {
        this.showErrorMessage('updating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onDelete(data: Subject) {
    this.subjectService.deleteSubject(data.id).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchSubjects();
      },
      error: () => {
        this.showErrorMessage('deleting');
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

  showErrorMessage(action: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: `An error occurred while ${action} ${this.dataLabel}`,
    });
  }
}
