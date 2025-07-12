import { Component, computed, inject } from '@angular/core';
import {
  SelectComponent,
  SelectOption,
} from '@app/shared/components/select/select.component';
import { Store } from '@ngrx/store';
import { citySelected, weatherReset } from './store/weather.actions';
import {
  selectError,
  selectForecast,
  selectIsLoading,
  selectSelectedCityName,
} from './store/weather.selectors';
import { DayForecastComponent } from './components/day-forecast/day-forecast.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { MessageComponent } from '@app/shared/components/message/message.component';

@Component({
  selector: 'weather-dashboard',
  standalone: true,
  imports: [
    SelectComponent,
    DayForecastComponent,
    LoaderComponent,
    MessageComponent,
  ],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css',
})
export class WeatherDashboardComponent {
  private store = inject(Store);

  /** True while fetching forecast data; used to show a loading indicator. */
  isLoading = this.store.selectSignal(selectIsLoading);

  /** Holds the error message string if a data-fetching process fails. */
  error = this.store.selectSignal(selectError);

  /** The complete, structured forecast data from the NgRx store. */
  forecast = this.store.selectSignal(selectForecast);

  /** The name of the currently selected city, or '' if none is selected. */
  selectedCity = this.store.selectSignal(selectSelectedCityName);

  /* A derived list of forecast days that contain valid hourly data to render. */
  displayableDays = computed(
    () => this.forecast()?.filter((day) => day.hourly?.length > 0) ?? []
  );

  /**
   * The list of selectable cities for the weather forecast,
   * including a placeholder for resetting the view.
   */
  public cityOptions: SelectOption[] = [
    { value: '', label: 'Choose a Destination' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'London', label: 'London' },
    { value: 'Cardiff', label: 'Cardiff' },
  ];

  /**
   * Generates a time-sensitive greeting for the initial view.
   */
  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';

    return 'Good Evening';
  }

  /**
    Handles the selection change event from the city dropdown.
    If a city is selected, it dispatches an action to fetch the weather forecast.
    If the placeholder option is selected (an empty string value), it dispatches
    an action to reset the view to its initial state.
    @param cityName The value of the selected option.
  */
  onCitySelected(cityName: string): void {
    if (cityName === '') {
      this.store.dispatch(weatherReset());
    } else {
      this.store.dispatch(citySelected({ cityName }));
    }
  }
}
