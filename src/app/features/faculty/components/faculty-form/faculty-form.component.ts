import { Component, Input, output } from '@angular/core';
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
  form: any;

  onCreate = output<any>();
  onUpdate = output<any>();
  onFormCancel = output<any>();

  @Input() data: Faculty | undefined;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  onSubmit() {
    console.log('this.data');
    if (this.data) {
      console.log('update', this.data);
      this.onUpdate.emit({
        ...this.form.value,
        id: this.data.id,
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
    this.data = undefined;
  }

  onCancel() {
    this.onFormCancel.emit(this.form);
    this.form.reset();
    this.data = undefined;
  }
}
