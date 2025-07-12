import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'nw-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  /**
   * Controls the visual style. 'info' for standard messages,
   * 'error' for error messages. Defaults to 'info'.
   */
  variant = input<'info' | 'error'>('info');

  /** (Optional) The URL for an icon to display at the top. */
  iconUrl = input<string>();

  /** (Required) The main title text. */
  title = input.required<string>();

  /** (Optional) The main message or subtitle text. */
  message = input<string>();

  /** (Optional) A prompt or call to action. */
  prompt = input<string>();
}
