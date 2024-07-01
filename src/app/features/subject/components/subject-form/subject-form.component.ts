import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { Faculty, Subject } from '../../../../../types';
import { FacultyService } from '../../../../services/faculty/faculty.service';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    AutoCompleteModule,
  ],
  templateUrl: './subject-form.component.html',
  styleUrl: './subject-form.component.css',
})
export class SubjectFormComponent {
  form: FormGroup;

  display = model.required<boolean>();
  dialogTitle = input.required<string>();

  onCreate = output<any>();
  onUpdate = output<any>();

  data = model<Subject>();
  faculties = model.required<Faculty[]>();

  filteredFaculties: any[] = [];

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl(''),
      facultad: new FormControl({ idfacultad: '', nombre: '' }),
    });

    effect(() => {
      const data = this.data();
      if (data) {
        this.form.patchValue(data);
      } else {
        this.form.reset();
      }
    });
  }

  onSubmit() {
    const data = this.data();
    if (data) {
      this.onUpdate.emit({
        name: this.form.value.nombre,
        facultyId: this.form.value.facultad.idfacultad,
        idmateria: data.idmateria,
      });
    } else {
      this.onCreate.emit({
        name: this.form.value.nombre,
        facultyId: this.form.value.facultad.idfacultad,
        subjectId: this.form.value.idmateria,
      });
    }
  }

  closeDialog() {
    this.display.set(false);
    this.form.reset();
    if (this.data()) {
      this.data.set(undefined);
    }
  }

  onCancel() {
    this.closeDialog();
  }

  filterFaculty(event: AutoCompleteCompleteEvent) {
    let query = event.query;

    const faculties = this.faculties() || [];

    this.filteredFaculties = faculties.filter((faculty) =>
      faculty.nombre.toLowerCase().includes(query.toLowerCase()),
    );
  }
}
