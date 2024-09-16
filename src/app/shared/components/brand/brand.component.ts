import { Component, input } from '@angular/core';

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent {
  size = input<number>(113);
  color = input<string>('');
}
