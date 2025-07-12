import { Component, input } from '@angular/core';
import { DayForecast } from '@app/features/weather/models/weather.models';
import { HourlyForecastComponent } from '../hourly-forecast/hourly-forecast.component';

@Component({
  selector: 'day-forecast',
  standalone: true,
  imports: [HourlyForecastComponent],
  templateUrl: './day-forecast.component.html',
  styleUrl: './day-forecast.component.css',
})
export class DayForecastComponent {
  /**
   * (Required) The complete forecast data for a single day, including the date
   * and an array of its 3-hourly forecast entries.
  */
  dayForecast = input.required<DayForecast>();
}
