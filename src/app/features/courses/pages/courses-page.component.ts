import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TPipe } from '../../../shared/pipes/t.pipe';
import { TranslationService } from '../../../core/services/translation.service';

interface CourseItem {
  title: string;
  url: string;
}

interface CoursePackage {
  id: string;
  trackKey: string;
  courses: CourseItem[];
  seats: number;
  price: number;
  featured?: boolean;
}

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
  readonly dir = this.translationService.dir;

  readonly calendlyUrl = 'https://calendly.com/mostafasaqly1/mostafa-saqly-training-partnership';

  readonly packages: CoursePackage[] = [
    {
      id: 'programming',
      trackKey: 'courses.packages.programming',
      seats: 2000,
      price: 500,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
        },
        {
          title: 'C++ Programming',
          url: 'https://www.udemy.com/course/programming-with-c-syntax-oop-data-structure/?referralCode=434A64158C0C5F69C02F',
        },
      ],
    },
    {
      id: 'frontend',
      trackKey: 'courses.packages.frontend',
      seats: 2000,
      price: 600,
      courses: [
        {
          title: 'Full Frontend Course (Arabic) | From Zero to Angular',
          url: 'https://www.udemy.com/course/full-frontend-course-arabic-from-zero-to-angular/?referralCode=E87CA0005A426015E2F8',
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor (Arabic)',
          url: 'https://www.udemy.com/course/build-web-mobile-apps-with-angular-capacitor/?referralCode=604B8A5B2FFE51DC2B3F',
        },
      ],
    },
    {
      id: 'ai',
      trackKey: 'courses.packages.ai',
      seats: 3000,
      price: 800,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
        },
        {
          title: 'Launch Your Digital Product Without a Developer (AI-Powered)',
          url: 'https://www.udemy.com/course/ucksuhsa/?referralCode=0CE8C0B5D0CB64DF7C',
        },
        {
          title: 'n8n in Arabic: Automate Tasks and Connect Apps Without Coding',
          url: 'https://www.udemy.com/course/n8n-kbrx/?referralCode=BE7080CDEF876324FF3E',
        },
      ],
    },
    {
      id: 'content',
      trackKey: 'courses.packages.content',
      seats: 3000,
      price: 700,
      courses: [
        {
          title: 'Comprehensive Content Design Diploma (Free Tools)',
          url: 'https://www.udemy.com/course/saqlycourses/?referralCode=CE04B4507B472DC84F24',
        },
        {
          title: 'Launch Your Online Course Step by Step',
          url: 'https://www.udemy.com/course/create-online-course-free-tools/?referralCode=1E1177A1D242694E90D0',
        },
        {
          title: 'Design Tools',
          url: 'https://www.udemy.com/course/videoscribe-movavi-video-editor-active-presenter/?referralCode=E13829849B1930DDA7BF',
        },
      ],
    },
    {
      id: 'bundle',
      trackKey: 'courses.packages.bundle',
      seats: 9000,
      price: 3000,
      featured: true,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://www.udemy.com/course/introduction-to-programming-v/?referralCode=CEC58167F8715CFCA769',
        },
        {
          title: 'C++ Programming',
          url: 'https://www.udemy.com/course/programming-with-c-syntax-oop-data-structure/?referralCode=434A64158C0C5F69C02F',
        },
        {
          title: 'Full Frontend Course (Arabic) | From Zero to Angular',
          url: 'https://www.udemy.com/course/full-frontend-course-arabic-from-zero-to-angular/?referralCode=E87CA0005A426015E2F8',
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor (Arabic)',
          url: 'https://www.udemy.com/course/build-web-mobile-apps-with-angular-capacitor/?referralCode=604B8A5B2FFE51DC2B3F',
        },
        {
          title: 'Launch Your Digital Product Without a Developer (AI-Powered)',
          url: 'https://www.udemy.com/course/ucksuhsa/?referralCode=0CE8C0B5D0CB64DF7C',
        },
        {
          title: 'n8n in Arabic: Automate Tasks and Connect Apps Without Coding',
          url: 'https://www.udemy.com/course/n8n-kbrx/?referralCode=BE7080CDEF876324FF3E',
        },
        {
          title: 'Comprehensive Content Design Diploma (Free Tools)',
          url: 'https://www.udemy.com/course/saqlycourses/?referralCode=CE04B4507B472DC84F24',
        },
        {
          title: 'Launch Your Online Course Step by Step',
          url: 'https://www.udemy.com/course/create-online-course-free-tools/?referralCode=1E1177A1D242694E90D0',
        },
        {
          title: 'Design Tools',
          url: 'https://www.udemy.com/course/videoscribe-movavi-video-editor-active-presenter/?referralCode=E13829849B1930DDA7BF',
        },
      ],
    },
  ];
}
