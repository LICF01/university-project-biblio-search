import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { Bibliography, Resource, Subject } from '../../../../../types';

@Component({
  selector: 'app-bibliography-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './bibliography-form.component.html',
  styleUrl: './bibliography-form.component.css',
})
export class BibliographyFormComponent {
  display = model.required<boolean>();
  dialogTitle = input.required<string>();

  resources = input.required<Resource[]>();
  subjects = input.required<Subject[]>();
  bibliographyTypes = input.required<{ [key: number]: string }>();
  bibliographyTypeOptions = computed(() => {
    return Object.entries(this.bibliographyTypes()).map(([key, value]) => ({
      label: value,
      value: key,
    }));
  });
  selectedBibliographyType: any;
  selectedResource: any;
  selectedSubject: any;

  onCreate = output<any>();
  onUpdate = output<any>();

  data = model<Bibliography>();

  constructor() {
    effect(() => {
      const data = this.data();
      if (data) {
        this.selectedBibliographyType = String(data.tipobibliografia);
        this.selectedResource = data.idmaterial;
        this.selectedSubject = data.idmateria;
      }
    });
  }

  onSubmit(form: any) {
    const data = this.data();
    const values = form.value;

    if (data) {
      this.onUpdate.emit({
        material: data.idmaterial,
        materia: data.idmateria,
        type: Number(values.tipoBibliografia),
      });
    } else {
      this.onCreate.emit({
        material: values.material,
        materia: values.materia,
        type: Number(values.tipoBibliografia),
      });
    }
  }

  closeDialog(form: any) {
    this.display.set(false);
    if (this.data()) {
      this.data.set(undefined);
    }

    form.resetForm();
  }

  onCancel(form: any) {
    this.closeDialog(form);
  }
}
