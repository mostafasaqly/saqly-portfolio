import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TPipe } from '../../../shared/pipes/t.pipe';
import { TranslationService } from '../../../core/services/translation.service';

interface CourseItem {
  title: string;
  url: string;
  hours: number;
}

const SEATS_PER_COURSE = 100;

interface CoursePackage {
  id: string;
  trackKey: string;
  courses: CourseItem[];
  price: number;
  featured?: boolean;
}

interface RoiCard {
  id: string;
  trackKey: string;
  packagePrice: number;
  seats: number;
  sellPerSeat: number;
  profit: number;
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

  seatsFor(pkg: CoursePackage): number {
    return pkg.courses.length * SEATS_PER_COURSE;
  }

  readonly flippedCard = signal<string | null>(null);

  toggleFlip(id: string): void {
    this.flippedCard.update(current => current === id ? null : id);
  }

  readonly roiCards: RoiCard[] = [
    { id: 'programming', trackKey: 'courses.packages.programming', packagePrice: 500,  seats: 200,  sellPerSeat: 15,  profit: 2500  },
    { id: 'frontend',    trackKey: 'courses.packages.frontend',    packagePrice: 600,  seats: 200,  sellPerSeat: 20,  profit: 3400  },
    { id: 'ai',          trackKey: 'courses.packages.ai',          packagePrice: 800,  seats: 300,  sellPerSeat: 20,  profit: 5200  },
    { id: 'content',     trackKey: 'courses.packages.content',     packagePrice: 700,  seats: 300,  sellPerSeat: 15,  profit: 3800  },
    { id: 'bundle',      trackKey: 'courses.packages.bundle',      packagePrice: 3000, seats: 800,  sellPerSeat: 15,  profit: 9000  },
  ];

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
}
