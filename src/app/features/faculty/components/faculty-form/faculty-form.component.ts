import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Faculty } from '../../../../../types';

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule],
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.css',
})
export class FacultyFormComponent {
  form: FormGroup;

  display = model.required<boolean>();
  dialogTitle = input.required<string>();

  onCreate = output<any>();
  onUpdate = output<any>();

  data = model<Faculty>();

  constructor() {
    this.form = new FormGroup({
      nombre: new FormControl(''),
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
    const formValues = this.form.value;
    if (data) {
      this.onUpdate.emit({
        idfacultad: data.idfacultad,
        name: formValues.nombre,
      });
    } else {
      this.onCreate.emit({
        name: formValues.nombre,
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
