import { Component, OnInit, effect, input, model, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Faculty } from '../../../../../types';

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.css',
})
export class FacultyFormComponent {
  form: FormGroup;

  onCreate = output<any>();
  onUpdate = output<any>();
  onFormCancel = output<any>();

  data = input<Faculty>();

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
    this.form.reset();
  }

  onCancel() {
    this.onFormCancel.emit(this.form);
  }
}
