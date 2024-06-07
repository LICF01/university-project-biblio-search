import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-faculty-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './faculty-form.component.html',
  styleUrl: './faculty-form.component.css',
})
export class FacultyFormComponent {
  form: any;

  onFormSubmit = output<any>();
  onFormCancel = output<any>();

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    this.onFormSubmit.emit({
      ...this.form.value,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    this.form.reset();
  }

  onCancel() {
    this.onFormCancel.emit(this.form);
    this.form.reset();
  }
}
