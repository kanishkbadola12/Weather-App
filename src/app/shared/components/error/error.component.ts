import { Component, input } from '@angular/core';

@Component({
  selector: 'nw-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
  message = input<string>('');
}
