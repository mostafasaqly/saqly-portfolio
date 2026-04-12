import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [SectionContainerComponent, SectionHeadingComponent, TPipe],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutSectionComponent {
  private readonly translationService = inject(TranslationService);

  readonly dir = this.translationService.dir;

  readonly achievements = computed(() => [
    'about.achievement.angular',
    'about.achievement.architecture',
    'about.achievement.localization',
  ]);

  readonly values = computed(() => [
    {
      title: 'about.values.cleanCode.title',
      description: 'about.values.cleanCode.description',
    },
    {
      title: 'about.values.scalability.title',
      description: 'about.values.scalability.description',
    },
    {
      title: 'about.values.business.title',
      description: 'about.values.business.description',
    },
    {
    title: 'about.values.userExperience.title',
    description: 'about.values.userExperience.description',
  },
  ]);
}
