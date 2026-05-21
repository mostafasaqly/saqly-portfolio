import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { TPipe } from '../../../shared/pipes/t.pipe';
import { TranslationService } from '../../../core/services/translation.service';

interface CourseItem {
  title: string;
  url: string;
  hours: number;
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

  readonly packages: CoursePackage[] = [
    {
      id: 'programming',
      trackKey: 'courses.packages.programming',
      seats: 2000,
      price: 500,
      courses: [
        {
          title: 'Introduction to Programming',
          url: 'https://lnkd.in/dRqrZeP2',
          hours: 8,
        },
        {
          title: 'C++ Programming',
          url: 'https://lnkd.in/dMW_kKAh',
          hours: 9,
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
          url: 'https://lnkd.in/dFCyPwTA',
          hours: 84,
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor (Arabic)',
          url: 'https://lnkd.in/d5TRiMb8',
          hours: 1,
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
          url: 'https://lnkd.in/dRqrZeP2',
          hours: 8,
        },
        {
          title: 'Launch Your Digital Product Without a Developer (AI-Powered)',
          url: 'https://lnkd.in/duuHkHv8',
          hours: 5,
        },
        {
          title: 'n8n in Arabic: Automate Tasks and Connect Apps Without Coding',
          url: 'https://lnkd.in/d9vD8SU3',
          hours: 6,
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
          url: 'https://lnkd.in/dgcTt4Ce',
          hours: 5,
        },
        {
          title: 'Launch Your Online Course Step by Step',
          url: 'https://lnkd.in/d3dYM_s9',
          hours: 5,
        },
        {
          title: 'Open Source Design Tools',
          url: 'https://lnkd.in/d2Fw-hgD',
          hours: 2,
        },
        {
          title: 'Design Tools',
          url: 'https://lnkd.in/dwC-VJKV',
          hours: 2,
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
          url: 'https://lnkd.in/dRqrZeP2',
          hours: 8,
        },
        {
          title: 'C++ Programming',
          url: 'https://lnkd.in/dMW_kKAh',
          hours: 9,
        },
        {
          title: 'Full Frontend Course (Arabic) | From Zero to Angular',
          url: 'https://lnkd.in/dFCyPwTA',
          hours: 84,
        },
        {
          title: 'Build Web & Mobile Apps with Angular & Capacitor (Arabic)',
          url: 'https://lnkd.in/d5TRiMb8',
          hours: 1,
        },
        {
          title: 'Launch Your Digital Product Without a Developer (AI-Powered)',
          url: 'https://lnkd.in/duuHkHv8',
          hours: 5,
        },
        {
          title: 'n8n in Arabic: Automate Tasks and Connect Apps Without Coding',
          url: 'https://lnkd.in/d9vD8SU3',
          hours: 6,
        },
        {
          title: 'Comprehensive Content Design Diploma (Free Tools)',
          url: 'https://lnkd.in/dgcTt4Ce',
          hours: 5,
        },
        {
          title: 'Launch Your Online Course Step by Step',
          url: 'https://lnkd.in/d3dYM_s9',
          hours: 5,
        },
        {
          title: 'Open Source Design Tools',
          url: 'https://lnkd.in/d2Fw-hgD',
          hours: 2,
        },
        {
          title: 'Design Tools',
          url: 'https://lnkd.in/dwC-VJKV',
          hours: 2,
        },
      ],
    },
  ];
}
