import { createFeature, createReducer, on } from '@ngrx/store';
import {
  citySelected,
  loadForecastFailure,
  loadForecastSuccess,
  weatherReset,
} from './weather.actions';
import { WeatherState } from '../models/weather.models';

export const initialWeatherState: WeatherState = {
  selectedCityName: null,
  forecast: null,
  isLoading: false,
  error: null,
};

export const weatherFeature = createFeature({
  name: 'weather',
  reducer: createReducer(
    initialWeatherState,

    on(citySelected, (state, { cityName }) => ({
      ...state,
      selectedCityName: cityName,
      isLoading: true,
    })),

    on(loadForecastSuccess, (state, { forecast }) => ({
      ...state,
      forecast,
      isLoading: false,
      error: null
    })),

    on(loadForecastFailure, (state, { error }) => ({
      ...state,
      forecast: null,
      isLoading: false,
      error,
    })),
    
    on(weatherReset, () => initialWeatherState)
  ),
});
