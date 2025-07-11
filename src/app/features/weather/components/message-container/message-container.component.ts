import { Component, input } from '@angular/core';

@Component({
  selector: 'message-container',
  standalone: true,
  imports: [],
  templateUrl: './message-container.component.html',
  styleUrl: './message-container.component.css'
})
export class MessageContainerComponent {
  subtitle = input<string>('Planning a trip? Let\'s see what you\'ll need to pack.');
  prompt = input<string>('Select a city above to begin.');

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    
    return 'Good Evening';
  }
}
