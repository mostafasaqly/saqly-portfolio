import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { PORTFOLIO_CONFIG } from '../../../../core/config/portfolio.config';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [SectionContainerComponent, SectionHeadingComponent, TPipe],
  templateUrl: './services-section.component.html',
  styleUrl: './services-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesSectionComponent {
  private readonly translationService = inject(TranslationService);

  readonly dir = this.translationService.dir;
  readonly services = computed(() => PORTFOLIO_CONFIG.services.filter((service) => service.featured));
}
