import { Component, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent {
  type = input<string>('text');
  placeholder = input<string>('');
  control = input.required<FormControl | AbstractControl | any>();
  required = input<boolean>(false);
  id = input<string>();
}
