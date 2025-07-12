# 5-Day Weather Forecast App

This is a modern Angular application that provides a 5-day weather forecast for selected UK cities. It is built with a focus on modern, scalable architecture, utilizing the latest features of Angular v17 and NgRx for state management. The primary goal is to allow users who travel between cities to easily see what weather to expect so they can pack accordingly.

---

## Tech Stack

- **Angular v17**: The core framework, utilizing modern features like **standalone components, signal-based architecture, and the new control flow syntax**.
- **NgRx v17**: For robust, predictable state management across the application.
- **RxJS**: For handling asynchronous operations and data streams.
- **TypeScript**: For strong typing and improved code quality.
- **Jasmine & Karma**: For unit testing.
- **Prettier & ESLint**: For consistent code formatting and linting.
- **OpenWeatherMap API**: As the data source for geocoding and weather forecasts.

---

## Key Features

- **City-Based Forecasts**: Users can view weather forecasts for **London, Birmingham, and Cardiff**.
- **5-Day Outlook**: Displays a detailed **5-day** forecast, broken down into **3-hourly** intervals.
- **Detailed Forecasts**: Each forecast includes **temperature (°C), wind speed (km/h), a weather description, and a corresponding icon**.
- **Dynamic UI States**: The interface updates reactively based on the application's state (initial, loading, success, error).
- **Responsive Design**: A clean, modern UI that works seamlessly on desktop and mobile devices.
- **User-Friendly Errors**: Provides clear, user-friendly messages for different types of failures (e.g., network errors, API failures).

---

## Installation and Setup

### 1. Clone the repository:

```bash

git clone git@github.com:kanishkbadola12/Weather-App.git
cd Weather-App
npm install

```
Clones the Weather App repository, navigates into the project folder, and installs all necessary dependencies.

### 2. Run the application:

```bash

ng serve

```
This will start the development server, and you can access the app at **http://localhost:4200/** in your browser.

### 3. Run unit tests:

```bash

ng test

```

This command runs the test suite using Karma and Jasmine, watches for file changes, and displays test results in the browser.

---

## Usage Guide

- Upon launch, a personalized welcome screen is shown with a time-based greeting.
- Use the city dropdown at the top left of the page to select a destination (**London**, **Birmingham**, or **Cardiff**).
- The application will display a loading indicator while it fetches the data.
- The 5-day forecast is presented in a **2×2** grid layout on larger screens and adapts to a **1×1** layout on smaller screens for optimal responsiveness..
- Once loaded, the **5-day** forecast will be displayed in a **2x2** grid, with each day card containing a horizontally scrollable list of **3-hourly** forecasts.
- To see the forecast for a different city, simply select it from the dropdown.
- To return to the initial welcome screen, select the **"Choose a Destination"** option from the dropdown.

---

## Architecture

This application is built with a **modern**, **scalable**, and **maintainable** architecture, emphasizing separation of concerns and the use of the latest Angular features.

### Project Structure

```text
src/
├── app/
│   ├── features/
│   │   └── weather/
|   |
│   │       ├── components/         # Presentational components for this feature
|   |       ├── models/             # Data models for this feature
│   │       ├── store/              # NgRx state (actions, effects, reducer, selectors)
│   ├── shared/
│   │   ├── components/             # Reusable components (select, loader, error)
│   │   ├── services/               # Reusable services (WeatherService)
│   │   └── helpers/                # Reusable helper functions
│   └── ...
└── ...
```

## Modern Angular Features Used

- **Signal-based Architecture**: The application fully embraces Angular's new signal-based architecture. Components consume state from the NgRx store using `selectSignal()`, which provides a reactive `Signal<T>`.
- **Standalone Components**: The entire application is built using Standalone Components. Each component explicitly declares its own dependencies in its imports array, making it self-contained and easier to reason about.
- **Dependency Injection with inject()**: Instead of injecting dependencies through the constructor, the application uses the modern `inject()` function. This provides a more flexible and constructor-less approach to dependency injection.
- **Smart vs. Dumb Components Pattern**
The application follows the `Smart Container vs. Dumb Presentational` component pattern, clearly separating business logic from UI rendering for better scalability and maintainability.
- **New Control Flow Syntax**: Uses the new `@if`, `@for` syntax for clearer templates

## State Management with NgRx
The application uses NgRx for a predictable, state-driven architecture. The flow is initiated by user actions, such as selecting a city.

- **Actions**: Represent user-driven events that initiate changes in the application's state.
- **Effects**: Effects handle all side effects. A chain of effects orchestrates the two-step data fetching process: first, it calls the WeatherService to get a city's geocoordinates, and upon success, uses those coordinates to fetch the 5-day forecast. The effect then dispatches success or failure actions.
- **Reducer**: The Reducer is responsible for updating the state immutably based on these actions, and the UI components reactively update by listening to the store via signals.
- **Selectors**: Pure functions that extract specific pieces of state. They are used by components with `selectSignal()` to create reactive signals that update when the selected state changes.

---

## Testing Strategy
- **Unit Tests**: All services, components, and effects are tested in isolation.
- **HttpClientTestingModule**: Simulates HTTP requests to test service logic without making real API calls.
- **Mock Store Setup**: Use `provideMockStore()` and `store.overrideSelector()` to test component-store interaction.