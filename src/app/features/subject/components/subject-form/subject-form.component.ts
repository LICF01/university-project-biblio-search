import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { Faculty, Subject } from '../../../../../types';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
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

  data = model<any>();
  faculties = model.required<Faculty[]>();

  filteredFaculties: any[] = [];

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl(''),
      facultad: new FormControl<Object | null>(null),
    });

    effect(() => {
      const data = this.data();
      if (data) {
        this.form.patchValue({
          nombre: data.nombre,
          facultad: data.facultad,
        });
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
        facultyId: this.form.value.facultad,
        idmateria: data.idmateria,
      });
    } else {
      this.onCreate.emit({
        name: this.form.value.nombre,
        facultyId: this.form.value.facultad,
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
}
