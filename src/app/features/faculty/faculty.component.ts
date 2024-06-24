import { Component } from '@angular/core';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { TableComponent } from '../../components/table/table.component';
import { FacultyFormComponent } from './components/faculty-form/faculty-form.component';
import { FacultyService } from '../../services/faculty/faculty.service';
import { Faculty, Row } from '../../../types';

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
  data: Faculty[] = [];
  dataLabel: string = 'Faculty';
  title: string = 'Manage Faculties';
  faculty: Faculty | undefined;
  displayForm: boolean = false;
  formTitle: string = 'Add Faculty';
  globalFilterFields = ['name'];

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
        this.data = res.data;
      }
    });
  }

  openFormDialog(title?: string) {
    if (title) this.formTitle = title;
    this.displayForm = true;
  }

  onFacultyEdit(data: any) {
    this.faculty = { ...data };
    this.openFormDialog('Edit Faculty');
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

  showConfirmDialog(data: Row) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete this ${this.dataLabel}?`,
      header: 'Delete Confirmation',
      icon: 'none',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        console.log(data);
        this.onDelete(data as Faculty);
      },
      reject: () => {},
    });
  }

  onAddTableButton() {
    this.openFormDialog();
  }

  onCreate(data: Faculty) {
    this.facultyService.createFaculty(data).subscribe({
      next: () => {
        this.showSuccessMessage('created');
        this.fetchFaculties();
      },
      error: () => {
        this.showErrorMessage('creating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onUpdate(data: Faculty) {
    this.facultyService.updateFaculty(data, data.facultyId).subscribe({
      next: () => {
        this.showSuccessMessage('updated');
        this.fetchFaculties();
      },
      error: () => {
        this.showErrorMessage('updating');
      },
      complete: () => {
        this.displayForm = false;
      },
    });
  }

  onDelete(data: Faculty) {
    this.facultyService.deleteFaculty(data.facultyId).subscribe({
      next: () => {
        this.showSuccessMessage('deleted');
        this.fetchFaculties();
      },
      error: () => {
        this.showErrorMessage('deleting');
      },
    });
  }
}
