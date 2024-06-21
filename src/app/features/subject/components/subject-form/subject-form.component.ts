import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Subject } from '../../../../../types';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DialogModule],
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

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
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
        ...this.form.value,
        id: data.id,
        updated_at: new Date().toISOString(),
      });
    } else {
      this.onCreate.emit({
        ...this.form.value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
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
