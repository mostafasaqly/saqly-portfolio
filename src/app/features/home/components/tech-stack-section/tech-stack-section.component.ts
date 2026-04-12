import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';

interface TechCategory {
  title: string;
  items: string[];
}

@Component({
  selector: 'app-tech-stack-section',
  standalone: true,
  imports: [SectionContainerComponent, SectionHeadingComponent, TPipe],
  templateUrl: './tech-stack-section.component.html',
  styleUrl: './tech-stack-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackSectionComponent {
  private readonly translationService = inject(TranslationService);

  readonly dir = this.translationService.dir;

  readonly techCategories = computed<TechCategory[]>(() => [
    {
      title: 'tech.categories.frontend',
      items: [
        'Angular 21',
        'TypeScript',
        'JavaScript',
        'HTML5',
        'SCSS',
        'RxJS',
        'Signals',
      ],
    },
    {
      title: 'tech.categories.mobile',
      items: [
        'Ionic',
        'Capacitor',
        'Responsive Design',
        'Mobile-first UI',
        'RTL / LTR',
      ],
    },
    {
      title: 'tech.categories.backend',
      items: [
        'NestJS',
        'PostgreSQL',
        'REST APIs',
        'Auth & Validation',
        'Database Design',
      ],
    },
    {
      title: 'tech.categories.design',
      items: [
        'Figma',
        'UI/UX Design',
        'Design Systems',
        'Wireframing',
        'User Flows',
      ],
    },
  ]);

  readonly quickStats = computed(() => [
    {
      value: 'Angular',
      label: 'tech.stats.angular',
    },
    {
      value: 'Ionic',
      label: 'tech.stats.ionic',
    },
    {
      value: 'NestJS',
      label: 'tech.stats.backend',
    },
    {
      value: 'UI/UX',
      label: 'tech.stats.design',
    },
  ]);
}
