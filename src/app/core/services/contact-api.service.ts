import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ContactRequestPayload } from '../models/contact-form.model';
import { ContactApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.contactApiUrl;

  submitContactForm(payload: ContactRequestPayload): Observable<ContactApiResponse> {
    const body = new URLSearchParams({
      name: payload.name?.trim() ?? '',
      email: payload.email?.trim() ?? '',
      phone: payload.phone?.trim() ?? '',
      service: payload.service?.trim() ?? '',
      message: payload.message?.trim() ?? '',
      locale: payload.locale?.trim() ?? '',
      source: payload.source?.trim() ?? 'portfolio-web-app',
      submittedAt: payload.submittedAt?.trim() ?? new Date().toISOString(),
    });

    return this.http
      .post(this.apiUrl, body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        responseType: 'text',
      })
      .pipe(
        timeout(15000),
        map((responseText: string) => {
          let response: ContactApiResponse;

          try {
            response = JSON.parse(responseText) as ContactApiResponse;
          } catch {
            throw new Error('Invalid API response.');
          }

          if (!response || typeof response.success !== 'boolean') {
            throw new Error('Invalid API response.');
          }

          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
