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

    /**
     * Sets the selected city, starts loading, and resets forecast and error state.
     */
    on(citySelected, (state, { cityName }) => ({
      ...state,
      selectedCityName: cityName,
      isLoading: true,
      error: null,
      forecast: null,
    })),

    /**
     * Populates forecast data on success and stops loading.
     */
    on(loadForecastSuccess, (state, { forecast }) => ({
      ...state,
      forecast,
      isLoading: false,
      error: null
    })),

    /**
     * Captures the error, stops loading, and clears forecast data.
     */
    on(loadForecastFailure, (state, { error }) => ({
      ...state,
      forecast: null,
      isLoading: false,
      error,
    })),
    
    /**
     * Resets the weather state to its initial value.
     */
    on(weatherReset, () => initialWeatherState)
  ),
});
