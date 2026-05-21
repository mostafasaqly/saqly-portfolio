import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TPipe } from '../../../shared/pipes/t.pipe';
import { TranslationService } from '../../../core/services/translation.service';

interface CourseItem {
  title: string;
  url: string;
  hours: number;
}

const FLASH_SEATS_PER_COURSE = 1000;
const EXTENDED_SEATS_PER_COURSE = 100;

interface CoursePackage {
  id: string;
  trackKey: string;
  courses: CourseItem[];
  price: number;
  featured?: boolean;
}

type CouponPlan = 'flash' | 'extended';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [TPipe, DecimalPipe],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent {
  private readonly translationService = inject(TranslationService);
  private readonly router = inject(Router);
  readonly dir = this.translationService.dir;

  goToContact(): void {
    this.router.navigate(['/'], { fragment: 'contact' }).then(() => {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  readonly calendlyUrl = 'https://calendly.com/mostafasaqly1/mostafa-saqly-training-partnership';

  readonly selectedPlan = signal<CouponPlan>('flash');

  selectPlan(plan: CouponPlan): void {
    this.selectedPlan.set(plan);
  }

  seatsFor(pkg: CoursePackage): number {
    const perCourse = this.selectedPlan() === 'flash' ? FLASH_SEATS_PER_COURSE : EXTENDED_SEATS_PER_COURSE;
    return pkg.courses.length * perCourse;
  }

  readonly packages: CoursePackage[] = [
    {
      id: 'programming',
      trackKey: 'courses.packages.programming',
      price: 500,
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
      trackKey: 'courses.packages.frontend',
      price: 600,
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
      trackKey: 'courses.packages.ai',
      price: 800,
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
      trackKey: 'courses.packages.content',
      price: 700,
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
      trackKey: 'courses.packages.bundle',
      price: 3000,
      featured: true,
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
        {
          title: 'Open Source Design Tools',
          url: 'https://www.udemy.com/course/open-source-design-tools/',
          hours: 2,
        },
      ],
    },
  ];
}
