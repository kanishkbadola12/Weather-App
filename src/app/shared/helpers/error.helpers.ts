import { HttpErrorResponse } from '@angular/common/http';

/**
 * Transforms a caught error object into a user-friendly string.
 * It inspects the error type and URL to provide specific feedback.
 */
function getErrorMessage(error: any): string {
  if (error instanceof Error && !(error instanceof HttpErrorResponse)) {
    return error.message;
  }
  
  if (error instanceof HttpErrorResponse) {
    let errorSource = 'An API error occurred';

    if (error.url?.includes('/geo/1.0/direct')) {
      errorSource = 'Unable to fetch coordinates for the selected city';
    } else if (error.url?.includes('/data/2.5/forecast')) {
      errorSource = 'Unable to get weather information for the selected city';
    }

    let failureReason = 'please try again later.';
    if (error.status === 0) {
      failureReason = '. Please check your internet connection.';
    } else if (error.status === 401) {
      failureReason = 'due to an application configuration issue.';
    } else if (error.status === 404) {
      failureReason = 'because the service could not be found.';
    }
    
    return `${errorSource}${failureReason}`;
  }

  return 'An unexpected error occurred. Please try again.';
};

export const errorHelper = {
  getErrorMessage
};