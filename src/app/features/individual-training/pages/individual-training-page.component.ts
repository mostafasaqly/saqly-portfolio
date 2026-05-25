import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize } from 'rxjs';

import { TPipe } from '../../../shared/pipes/t.pipe';
import { TranslationService } from '../../../core/services/translation.service';
import { environment } from '../../../../environments/environment';

interface IndividualCourse {
  // Must match the course names in the Apps Script COURSE_LINKS exactly,
  // because the backend matches the registration row by this value.
  name: string;
  level: string;
  hours: number;
}

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-individual-training-page',
  standalone: true,
  imports: [ReactiveFormsModule, TPipe, RouterLink],
  templateUrl: './individual-training-page.component.html',
  styleUrl: './individual-training-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndividualTrainingPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly http = inject(HttpClient);
  private readonly translationService = inject(TranslationService);

  readonly dir = this.translationService.dir;
  readonly price = environment.coursePrice;
  readonly originalPrice = environment.courseOriginalPrice;
  readonly instapayUrl = environment.instapayUrl;

  readonly submissionState = signal<SubmissionState>('idle');
  readonly serverError = signal<string | null>(null);
  readonly selectedCourse = signal<IndividualCourse | null>(null);

  readonly courses: IndividualCourse[] = [
    {
      name: 'Full Frontend Course (Arabic) | From Zero to Angular',
      level: 'individual.level.frontend',
      hours: 84,
    },
    {
      name: 'Build Web & Mobile Apps with Angular & Capacitor - in Arabic',
      level: 'individual.level.mobile',
      hours: 1,
    },
    {
      name: 'Learn C++ from scratch | كورس برمجه متكامل سى بلس بلس',
      level: 'individual.level.cpp',
      hours: 9,
    },
    {
      name: 'Introduction To Programming',
      level: 'individual.level.intro',
      hours: 8,
    },
    {
      name: 'أطلق مشروعك الرقمي بدون مطور: منتج حقيقي بالذكاء الاصطناعي',
      level: 'individual.level.ai',
      hours: 5,
    },
    {
      name: 'بالعربي: أتمتة المهام وربط التطبيقات بدون برمجة n8n',
      level: 'individual.level.automation',
      hours: 6,
    },
    {
      name: 'دبلومة تصميم المحتوى الشاملة – ببرامج مجانيه',
      level: 'individual.level.content',
      hours: 5,
    },
    {
      name: 'أطلق كورسك الرقمي خطوة بخطوة | دليل صناعة الكورسات التعليمية',
      level: 'individual.level.courseCreation',
      hours: 5,
    },
  ];

  readonly form = this.fb.group({
    fullName: this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(80),
    ]),
    email: this.fb.control('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(120),
    ]),
    phone: this.fb.control('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(20),
      Validators.pattern(/^[0-9+\-\s()]+$/),
    ]),
  });

  get fullNameControl(): FormControl<string> { return this.form.controls.fullName; }
  get emailControl(): FormControl<string> { return this.form.controls.email; }
  get phoneControl(): FormControl<string> { return this.form.controls.phone; }

  selectCourse(course: IndividualCourse): void {
    this.selectedCourse.set(course);
    this.submissionState.set('idle');
    this.serverError.set(null);
    this.form.reset();
    setTimeout(() => {
      document.getElementById('enroll-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  clearSelection(): void {
    this.selectedCourse.set(null);
    this.submissionState.set('idle');
    this.serverError.set(null);
  }

  hasError(control: FormControl<string>): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    const course = this.selectedCourse();
    if (!course) {
      return;
    }

    this.serverError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!environment.individualTrainingApiUrl.startsWith('https://')) {
      this.submissionState.set('error');
      this.serverError.set('individual.error.notConfigured');
      return;
    }

    const { fullName, email, phone } = this.form.getRawValue();

    const body = new URLSearchParams({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      course: course.name,
      source: 'individual-training-page',
      submittedAt: new Date().toISOString(),
    });

    this.submissionState.set('submitting');

    this.http
      .post(environment.individualTrainingApiUrl, body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        responseType: 'text',
      })
      .pipe(
        finalize(() => {
          if (this.submissionState() === 'submitting') {
            this.submissionState.set('idle');
          }
        })
      )
      .subscribe({
        next: (responseText) => {
          try {
            const response = JSON.parse(responseText) as { success: boolean; message?: string };
            if (response.success) {
              this.submissionState.set('success');
            } else {
              this.submissionState.set('error');
              this.serverError.set(response.message ?? 'individual.error.server');
            }
          } catch {
            // Apps Script may return plain text on success; treat 2xx as success.
            this.submissionState.set('success');
          }
        },
        error: () => {
          this.submissionState.set('error');
          this.serverError.set('individual.error.network');
        },
      });
  }
}
