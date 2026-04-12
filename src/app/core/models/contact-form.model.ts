export interface ContactFormValue {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export type ContactSubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactRequestPayload extends ContactFormValue {
  locale: 'en' | 'ar';
  source: 'portfolio-web-app';
  submittedAt: string;
}
