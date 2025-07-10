import { Component, effect, inject } from '@angular/core';
import { SelectComponent, SelectOption } from "@app/shared/components/select/select.component";
import { Store } from '@ngrx/store';
import { citySelected } from './store/weather.actions';
import { selectError, selectForecast, selectIsLoading, selectSelectedCityName } from './store/weather.selectors';
import { DayForecastComponent } from '../components/day-forecast/day-forecast.component';

@Component({
  selector: 'weather-dashboard',
  standalone: true,
  imports: [SelectComponent, DayForecastComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css'
})

export class WeatherDashboardComponent {
  private store = inject(Store);
  isLoading = this.store.selectSignal(selectIsLoading);
  error = this.store.selectSignal(selectError);
  forecast = this.store.selectSignal(selectForecast);
  selectedCity = this.store.selectSignal(selectSelectedCityName)

  constructor() {
    effect(() => {
      if(this.forecast())
        console.log('Forecast data:', this.forecast());
    });
  }

  public cityOptions: SelectOption[] = [
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'London', label: 'London' },
    { value: 'Cardiff', label: 'Cardiff' },
  ];
  
  /**
   * Handles the selection of a city from the dropdown.
   * Dispatches the citySelected action to update the store.
   * @param cityName The name of the selected city.
   */
  onCitySelected(cityName: string): void {
    this.store.dispatch(citySelected({ cityName }));
  }
}
