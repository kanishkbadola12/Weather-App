import { HttpErrorResponse } from '@angular/common/http';

/**
 * Inspects a caught error object and translates it into a simple,
 * user-friendly string that explains the reason for the failure,
 * @param error The error object caught in a catchError block.
 * @returns A human-readable string explaining the failure.
 */
function getFailureReason(error: any): string {
  if (error instanceof Error && !(error instanceof HttpErrorResponse)) {
    return error.message;
  }
  
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Please check your internet connection.';
    }
    if (error.status === 401) {
      return 'There was a configuration problem.';
    }
    if (error.status === 404) {
      return 'The requested service could not be found.';
    }
  }

  return 'An unexpected error occurred.';
}

export const errorHelper = {
  getFailureReason,
};
