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

interface TrackCourse {
  title: string;
  url: string;
  hours: number;
}

interface IndividualTrack {
  id: string;
  // Sent to the backend as the `course` field so registrations can be matched.
  name: string;
  trackKey: string;
  price: number;
  priceUsd: number;
  courses: TrackCourse[];
  featured?: boolean;
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
  readonly instapayUrl = environment.instapayUrl;

  readonly submissionState = signal<SubmissionState>('idle');
  readonly serverError = signal<string | null>(null);
  readonly selectedTrack = signal<IndividualTrack | null>(null);

  readonly tracks: IndividualTrack[] = [
    {
      id: 'programming',
      name: 'Programming Track',
      trackKey: 'courses.packages.programming',
      price: 500,
      priceUsd: 10,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
          hours: 8,
        },
        {
          title: 'C++ Programming',
          url: 'https://www.udemy.com/course/programming-with-c-syntax-oop-data-structure/?referralCode=434A64158C0C5F69C02F',
          hours: 9,
        },
      ],
    },
    {
      id: 'frontend',
      name: 'Frontend Track',
      trackKey: 'courses.packages.frontend',
      price: 600,
      priceUsd: 15,
      courses: [
        {
          title: 'Full Frontend Course (Arabic) | From Zero to Angular',
          url: 'https://www.udemy.com/course/full-frontend-course-arabic-from-zero-to-angular/?referralCode=E87CA0005A426015E2F8',
          hours: 84,
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor (Arabic)',
          url: 'https://www.udemy.com/course/build-web-mobile-apps-with-angular-capacitor/?referralCode=604B8A5B2FFE51DC2B3F',
          hours: 1,
        },
      ],
    },
    {
      id: 'ai',
      name: 'AI & Automation Track',
      trackKey: 'courses.packages.ai',
      price: 800,
      priceUsd: 20,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
          hours: 8,
        },
        {
          title: 'Launch Your Digital Product Without a Developer (AI-Powered)',
          url: 'https://www.udemy.com/course/ucksuhsa/?referralCode=0CE8C0B5D0CB64DF7C',
          hours: 5,
        },
        {
          title: 'n8n in Arabic: Automate Tasks and Connect Apps Without Coding',
          url: 'https://www.udemy.com/course/n8n-kbrx/?referralCode=BE7080CDEF876324FF3E',
          hours: 6,
        },
      ],
    },
    {
      id: 'content',
      name: 'Content Creation Track',
      trackKey: 'courses.packages.content',
      price: 700,
      priceUsd: 15,
      courses: [
        {
          title: 'Comprehensive Content Design Diploma (Free Tools)',
          url: 'https://www.udemy.com/course/saqlycourses/?referralCode=CE04B4507B472DC84F24',
          hours: 5,
        },
        {
          title: 'Launch Your Online Course Step by Step',
          url: 'https://www.udemy.com/course/create-online-course-free-tools/?referralCode=1E1177A1D242694E90D0',
          hours: 5,
        },
        {
          title: 'Design Tools',
          url: 'https://www.udemy.com/course/videoscribe-movavi-video-editor-active-presenter/?referralCode=E13829849B1930DDA7BF',
          hours: 2,
        },
      ],
    },
    {
      id: 'bundle',
      name: 'Full Bundle — All 8 Courses',
      trackKey: 'courses.packages.bundle',
      price: 2000,
      priceUsd: 40,
      featured: true,
      courses: [
        {
          title: 'Introduction To Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
          hours: 8,
        },
        {
          title: 'Learn C++ from scratch | كورس برمجه متكامل سى بلس بلس',
          url: 'https://www.udemy.com/course/programming-with-c-syntax-oop-data-structure/?referralCode=434A64158C0C5F69C02F',
          hours: 9,
        },
        {
          title: 'Full Frontend Course (Arabic) | From Zero to Angular',
          url: 'https://www.udemy.com/course/full-frontend-course-arabic-from-zero-to-angular/?referralCode=E87CA0005A426015E2F8',
          hours: 84,
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor - in Arabic',
          url: 'https://www.udemy.com/course/build-web-mobile-apps-with-angular-capacitor/?referralCode=604B8A5B2FFE51DC2B3F',
          hours: 1,
        },
        {
          title: 'أطلق مشروعك الرقمي بدون مطور: منتج حقيقي بالذكاء الاصطناعي',
          url: 'https://www.udemy.com/course/ucksuhsa/?referralCode=0CE8C0B5D0CB64DF7C',
          hours: 5,
        },
        {
          title: 'بالعربي: أتمتة المهام وربط التطبيقات بدون برمجة n8n',
          url: 'https://www.udemy.com/course/n8n-kbrx/?referralCode=BE7080CDEF876324FF3E',
          hours: 6,
        },
        {
          title: 'دبلومة تصميم المحتوى الشاملة – ببرامج مجانيه',
          url: 'https://www.udemy.com/course/saqlycourses/?referralCode=CE04B4507B472DC84F24',
          hours: 5,
        },
        {
          title: 'أطلق كورسك الرقمي خطوة بخطوة | دليل صناعة الكورسات التعليمية',
          url: 'https://www.udemy.com/course/create-online-course-free-tools/?referralCode=1E1177A1D242694E90D0',
          hours: 5,
        },
      ],
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
    paymentRef: this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(60),
    ]),
  });

  get fullNameControl(): FormControl<string> { return this.form.controls.fullName; }
  get emailControl(): FormControl<string> { return this.form.controls.email; }
  get phoneControl(): FormControl<string> { return this.form.controls.phone; }
  get paymentRefControl(): FormControl<string> { return this.form.controls.paymentRef; }

  totalHours(track: IndividualTrack): number {
    return track.courses.reduce((sum, c) => sum + c.hours, 0);
  }

  selectTrack(track: IndividualTrack): void {
    this.selectedTrack.set(track);
    this.submissionState.set('idle');
    this.serverError.set(null);
    this.form.reset();
    setTimeout(() => {
      document.getElementById('enroll-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  clearSelection(): void {
    this.selectedTrack.set(null);
    this.submissionState.set('idle');
    this.serverError.set(null);
  }

  hasError(control: FormControl<string>): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    const track = this.selectedTrack();
    if (!track) {
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

    const { fullName, email, phone, paymentRef } = this.form.getRawValue();

    const body = new URLSearchParams({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      paymentRef: paymentRef.trim(),
      course: track.name,
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
