import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TableComponent } from '../../components/table/table.component';
import { FacultyFormComponent } from './components/faculty-form/faculty-form.component';
import { FacultyService } from '../../services/faculty/faculty.service';
import { Faculty } from '../../../types';

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
  ],
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css',
  providers: [MessageService],
})
export class FacultyComponent {
  data: Faculty[] = [];
  dataLabel: string = 'Faculty';
  title: string = 'Manage Faculties';
  dialog: boolean = false;
  faculty: Faculty | undefined;

  constructor(
    private facultyService: FacultyService,
    private messageService: MessageService,
  ) {
    this.fetchFaculties();
  }

  fetchFaculties() {
    this.facultyService.getAllFaculties().subscribe((faculties) => {
      this.data = faculties;
    });
  }

  openNew() {
    this.dialog = true;
  }

  closeDialog() {
    this.dialog = false;
  }

  onFacultyEdit(data: any) {
    this.faculty = { ...data };
    this.openNew();
  }

  onCreate(data: Faculty) {
    this.facultyService.createFaculty(data).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.dataLabel + ' successfully created',
        });
        this.facultyService.getAllFaculties().subscribe((faculties) => {
          this.data = faculties;
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while creating ' + this.dataLabel,
        });
      },
      complete: () => {
        this.dialog = false;
      },
    });
  }

  onUpdate(data: Faculty) {
    this.facultyService.updateFaculty(data, data.id).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.dataLabel + ' successfully updated',
        });
        this.facultyService.getAllFaculties().subscribe((faculties) => {
          this.data = faculties;
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while updating ' + this.dataLabel,
        });
      },
      complete: () => {
        this.dialog = false;
      },
    });
  }
}
