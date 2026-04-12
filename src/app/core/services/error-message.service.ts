import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorMessageService {
  mapContactError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'contact.status.networkError';
      }

      if (error.status >= 500) {
        return 'contact.status.serverError';
      }

      if (error.status >= 400) {
        return 'contact.status.requestError';
      }
    }

    if (error instanceof Error && error.message === 'Timeout has occurred') {
      return 'contact.status.timeout';
    }

    return 'contact.status.unknownError';
  }
}
