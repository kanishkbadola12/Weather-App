import { Routes } from '@angular/router';
import { WeatherDashboardComponent } from './features/weather/weather-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: WeatherDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];