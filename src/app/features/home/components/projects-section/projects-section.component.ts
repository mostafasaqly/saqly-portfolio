import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';
import { PORTFOLIO_CONFIG } from '../../../../core/config/portfolio.config';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';
import { TiltCardDirective } from '../../../../shared/directives/tilt-card.directive';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [SectionContainerComponent, SectionHeadingComponent, TPipe, TiltCardDirective],
  templateUrl: './projects-section.component.html',
  styleUrl: './projects-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsSectionComponent {
  private readonly translationService = inject(TranslationService);

  readonly dir = this.translationService.dir;
  readonly projects = computed(() => PORTFOLIO_CONFIG.projects);

  readonly pageSize = 2;
  readonly currentPage = signal(1);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.projects().length / this.pageSize))
  );

  readonly paginatedProjects = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.projects().slice(start, end);
  });

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index + 1)
  );

  hasGithubLink(project: { links: { label: string; url: string }[] }): boolean {
    return project.links.some((link) => link.url.includes('github.com'));
  }

  hasVideoLink(project: { links: { label: string; url: string }[] }): boolean {
    return project.links.some(
      (link) => link.url.includes('youtu.be') || link.url.includes('youtube.com')
    );
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
