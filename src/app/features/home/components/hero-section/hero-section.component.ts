import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [SectionContainerComponent, TPipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly translationService = inject(TranslationService);

  readonly isArabic = this.translationService.isArabic;
  readonly currentDir = this.translationService.dir;

  readonly highlights = computed(() => [
    'hero.highlight.cleanArchitecture',
    'hero.highlight.scalableUi',
    'hero.highlight.modernFrontend',
  ]);
}
