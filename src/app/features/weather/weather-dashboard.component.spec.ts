import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { LoaderComponent } from '@app/shared/components/loader/loader.component';
import { ErrorComponent } from '@app/shared/components/error/error.component';
import { DayForecastComponent } from './components/day-forecast/day-forecast.component';
import { SelectComponent } from '@app/shared/components/select/select.component';
import {
  selectError,
  selectForecast,
  selectIsLoading,
  selectSelectedCityName,
} from './store/weather.selectors';
import { DayForecast } from './models/weather.models';
import { citySelected } from './store/weather.actions';

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let store: MockStore;

  const mockDisplayableDays: DayForecast[] = [
    {
      date: 'Friday, July 11, 2025',
      hourly: [
        {
          time: '00:00',
          temperature: 15,
          windSpeed: 5,
          description: 'clear sky',
          icon: 'url1',
        },
      ],
    },
  ];
  const initialWeatherState = {
    weather: {
      isLoading: false,
      error: null,
      forecast: null,
      selectedCityName: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherDashboardComponent,
        SelectComponent,
        LoaderComponent,
        ErrorComponent,
        DayForecastComponent,
      ],
      providers: [
        provideMockStore({
          initialState: initialWeatherState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    store.overrideSelector(selectIsLoading, false);
    store.overrideSelector(selectError, null);
    store.overrideSelector(selectForecast, null);
    store.overrideSelector(selectSelectedCityName, null);

    spyOn(store, 'dispatch');
  });

  it('should create weather dashboard component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the main title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const h1Element = compiled.querySelector('h1');
    expect(h1Element?.textContent).toContain('5-Day Weather Forecast');
  });

  it('should display the initial "Please select a city" message', () => {
    fixture.detectChanges();
    const messageElement = fixture.nativeElement.querySelector(
      '.message-container p'
    );

    expect(messageElement.textContent).toContain('Please select a city');

    expect(
      fixture.debugElement.query(By.directive(LoaderComponent))
    ).toBeNull();
    expect(fixture.debugElement.query(By.directive(ErrorComponent))).toBeNull();
    expect(
      fixture.debugElement.query(By.directive(DayForecastComponent))
    ).toBeNull();
  });

  it('should display the loader when isLoading is true', () => {
    store.overrideSelector(selectIsLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const loader = fixture.debugElement.query(By.directive(LoaderComponent));
    expect(loader).not.toBeNull();
  });

  it('should display the error component when an error is present', () => {
    const errorMessage = 'Could not connect to service.';
    store.overrideSelector(selectError, errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const errorComponent = fixture.debugElement.query(
      By.directive(ErrorComponent)
    );

    expect(errorComponent).not.toBeNull();
    expect(errorComponent.componentInstance.message()).toBe(errorMessage);
  });

  it('should display the forecast list when data is available', () => {
    store.overrideSelector(selectForecast, mockDisplayableDays);
    store.refreshState();
    fixture.detectChanges();

    const dayForecasts = fixture.debugElement.queryAll(
      By.directive(DayForecastComponent)
    );

    expect(dayForecasts.length).toBe(1);
    expect(
      fixture.nativeElement.querySelector('.forecast-list')
    ).not.toBeNull();
  });

  it('should dispatch the citySelected action when onCitySelected is called', () => {
    const testCity = 'London';
    component.onCitySelected(testCity);

    expect(store.dispatch).toHaveBeenCalledWith(
      citySelected({ cityName: testCity })
    );
  });
});
