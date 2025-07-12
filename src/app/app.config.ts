import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { weatherFeature } from './features/weather/store/weather.reducer';
import { WeatherEffects } from './features/weather/store/weather.effects';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideState(weatherFeature.name, weatherFeature.reducer),
    provideEffects(WeatherEffects)
  ]
};
