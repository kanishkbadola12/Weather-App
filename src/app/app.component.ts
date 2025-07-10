import { Component } from '@angular/core';
import { WeatherDashboardComponent } from "./features/weather/weather-dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [WeatherDashboardComponent]
})
export class AppComponent {
  title = 'weather-app';
}
