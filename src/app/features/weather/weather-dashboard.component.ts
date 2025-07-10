import { Component, effect, inject } from '@angular/core';
import { SelectComponent, SelectOption } from "@app/shared/components/select/select.component";
import { Store } from '@ngrx/store';
import { citySelected } from './store/weather.actions';
import { weatherFeature } from './store/weather.reducer';
import { selectForecast } from './store/weather.selectors';

@Component({
  selector: 'weather-dashboard',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.css'
})
export class WeatherDashboardComponent {
  private store = inject(Store);
  forecast = this.store.selectSignal(selectForecast);

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

  onCitySelected(cityName: string): void {
    this.store.dispatch(citySelected({ cityName }));
  }
}
