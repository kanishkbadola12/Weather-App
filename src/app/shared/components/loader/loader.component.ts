import { Component, input } from '@angular/core';

@Component({
  selector: 'nw-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  /* (Optional) The name of the city currently being loaded. */
  city = input<string | null>(null);
}
