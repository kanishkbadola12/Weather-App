import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { HourlyForecast } from '@app/features/weather/models/weather.models';

@Component({
  selector: 'hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hourly-forecast.component.html',
  styleUrl: './hourly-forecast.component.css',
})
export class HourlyForecastComponent {
  /**
   * (Required) The detailed weather data for a single 3-hour time slot,
   * including time, temperature, description, and icon URL.
  */
  hourlyForecast = input.required<HourlyForecast>();
}
