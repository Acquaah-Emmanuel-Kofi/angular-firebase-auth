import { NgClass } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [NgClass],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent implements OnInit {
  message = input.required<string>();
  @Input() show: boolean = false;
  status = input.required<'success' | 'error' | 'info'>();

  ngOnInit(): void {
    if (this.show) {
      setTimeout(() => {
        this.show = false;
      }, 3000);
    }
  }
}
