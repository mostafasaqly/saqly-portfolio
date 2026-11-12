import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { finalize } from 'rxjs';

import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TPipe } from '../../../../shared/pipes/t.pipe';
import { realEmailValidator } from '../../../../shared/validators/no-disposable-email.validator';
import {
  isBotSubmission,
  noGibberishValidator,
} from '../../../../shared/validators/no-gibberish.validator';
import { TranslationService } from '../../../../core/services/translation.service';
import { PORTFOLIO_CONFIG } from '../../../../core/config/portfolio.config';
import {
  ContactRequestPayload,
  ContactSubmissionState,
} from '../../../../core/models/contact-form.model';
import { ContactApiService } from '../../../../core/services/contact-api.service';
import { ErrorMessageService } from '../../../../core/services/error-message.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SectionContainerComponent,
    SectionHeadingComponent,
    TPipe,
  ],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly translationService = inject(TranslationService);
  private readonly contactApiService = inject(ContactApiService);
  private readonly errorMessageService = inject(ErrorMessageService);

  readonly dir = this.translationService.dir;
  readonly currentLanguage = this.translationService.language;

  readonly submissionState = signal<ContactSubmissionState>('idle');
  readonly serverMessageKey = signal<string | null>(null);
  readonly serverErrorText = signal<string | null>(null);

  readonly availableServices = computed(() =>
    PORTFOLIO_CONFIG.services.map((service) => ({
      value: service.id,
      label: service.title,
    }))
  );

  readonly contactInfo = computed(() => [
    {
      label: 'contact.info.email.label',
      value: 'contact.info.email.value',
    },
    // {
    //   label: 'contact.info.location.label',
    //   value: 'contact.info.location.value',
    // },
    {
      label: 'contact.info.availability.label',
      value: 'contact.info.availability.value',
    },
  ]);

  readonly form = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(80),
      noGibberishValidator,
    ]),
    email: this.fb.control('', [
      Validators.required,
      Validators.email,
      realEmailValidator,
      Validators.maxLength(120),
    ]),
    phone: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(/^[0-9+\-\s()]+$/),
    ]),
    service: this.fb.control('', [Validators.required]),
    message: this.fb.control('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1200),
      noGibberishValidator,
    ]),
    // Honeypot: hidden from people, filled in by bots.
    website: this.fb.control(''),
  });

  private readonly openedAt = Date.now();

  get nameControl(): FormControl<string> {
    return this.form.controls.name;
  }

  get emailControl(): FormControl<string> {
    return this.form.controls.email;
  }

  get phoneControl(): FormControl<string> {
    return this.form.controls.phone;
  }

  get serviceControl(): FormControl<string> {
    return this.form.controls.service;
  }

  get messageControl(): FormControl<string> {
    return this.form.controls.message;
  }

  onSubmit(): void {
    this.serverMessageKey.set(null);
    this.serverErrorText.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.submissionState.set('error');
      this.serverMessageKey.set('contact.status.invalidForm');
      return;
    }

    const { website, ...fields } = this.form.getRawValue();

    // Bot detected: pretend it worked so the bot learns nothing, but send nothing.
    if (isBotSubmission(website, this.openedAt)) {
      this.submissionState.set('success');
      this.serverMessageKey.set('contact.status.successReal');
      this.form.reset();
      return;
    }

    const payload: ContactRequestPayload = {
      ...fields,
      website,
      elapsedMs: Date.now() - this.openedAt,
      locale: this.currentLanguage(),
      source: 'portfolio-web-app',
      submittedAt: new Date().toISOString(),
    };

    this.submissionState.set('submitting');

    this.contactApiService
      .submitContactForm(payload)
      .pipe(
        finalize(() => {
          if (this.submissionState() === 'submitting') {
            this.submissionState.set('idle');
          }
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.submissionState.set('success');
            this.serverMessageKey.set('contact.status.successReal');
            this.serverErrorText.set(null);

            this.form.reset({
              name: '',
              email: '',
              phone: '',
              service: '',
              message: '',
            });

            this.form.markAsPristine();
            this.form.markAsUntouched();
            return;
          }

          this.submissionState.set('error');
          this.serverMessageKey.set(null);
          this.serverErrorText.set(response.message || 'Request failed.');
        },
        error: (error) => {
          this.submissionState.set('error');
          this.serverErrorText.set(null);
          this.serverMessageKey.set(this.errorMessageService.mapContactError(error));
        },
      });
  }

  hasError(control: FormControl<string>): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  showGlobalError(): boolean {
    return (
      this.submissionState() === 'error' &&
      (!!this.serverMessageKey() || !!this.serverErrorText())
    );
  }
}
