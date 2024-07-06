import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Resource } from '../../../../../types';

@Component({
  selector: 'app-resources-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
  ],
  templateUrl: './resources-form.component.html',
  styleUrl: './resources-form.component.css',
})
export class ResourcesFormComponent {
  form: FormGroup;

  display = model.required<boolean>();
  dialogTitle = input.required<string>();

  resourcesTypes = input.required<any>();
  resourcesOptions = computed(() => {
    return Object.entries(this.resourcesTypes()).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  });

  onCreate = output<any>();
  onUpdate = output<any>();

  data = model<Resource>();

  constructor() {
    this.form = new FormGroup({
      titulo: new FormControl(''),
      material: new FormControl(''),
      autor: new FormControl(''),
      url: new FormControl(''),
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
        idmaterial: data.idmaterial,
        title: formValues.titulo,
        author: formValues.autor,
        url: formValues.url,
        type: formValues.material.value,
      });
    } else {
      console.log(formValues);
      this.onCreate.emit({
        title: formValues.titulo,
        author: formValues.autor,
        url: formValues.url,
        type: formValues.material.value,
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
