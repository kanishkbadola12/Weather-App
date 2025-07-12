import { Component, input } from '@angular/core';

@Component({
  selector: 'nw-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  city = input<string | null>(null);
}
