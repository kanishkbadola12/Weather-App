import { weatherFeature } from "./weather.reducer";

export const {
  selectIsLoading,
  selectForecast,
  selectError,
  selectSelectedCityName,
} = weatherFeature;