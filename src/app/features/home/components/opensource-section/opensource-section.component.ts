import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { TPipe } from '../../../../shared/pipes/t.pipe';
import { SectionContainerComponent } from '../../../../shared/components/section-container/section-container.component';
import { SectionHeadingComponent } from '../../../../shared/components/section-heading/section-heading.component';

type BadgeType = 'npm' | 'vscode';

interface OpenSourceItem {
  id: string;
  name: string;
  descKey: string;
  badge: BadgeType;
  badgeLabel: string;
  url: string;
  chips: string[];
  statsKey?: string;
}

@Component({
  selector: 'app-opensource-section',
  standalone: true,
  imports: [TPipe, SectionContainerComponent, SectionHeadingComponent],
  templateUrl: './opensource-section.component.html',
  styleUrl: './opensource-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpensourceSectionComponent {
  private readonly translationService = inject(TranslationService);
  readonly dir = this.translationService.dir;

  readonly items: OpenSourceItem[] = [
    {
      id: 'ngx-saqly-login',
      name: 'ngx-saqly-login',
      descKey: 'opensource.items.login.desc',
      badge: 'npm',
      badgeLabel: 'npm',
      url: 'https://www.npmjs.com/package/ngx-saqly-login',
      chips: ['Angular', 'TypeScript', 'npm Package', 'Auth UI'],
      statsKey: 'opensource.items.login.stats',
    },
    {
      id: 'ngx-saqly-work-balance',
      name: 'ngx-saqly-work-balance',
      descKey: 'opensource.items.workBalance.desc',
      badge: 'npm',
      badgeLabel: 'npm',
      url: 'https://www.npmjs.com/package/ngx-saqly-work-balance',
      chips: ['Angular', 'TypeScript', 'npm Package', 'Productivity'],
      statsKey: 'opensource.items.workBalance.stats',
    },
    {
      id: 'ngx-saqly-supabase',
      name: 'ngx-saqly-supabase',
      descKey: 'opensource.items.supabase.desc',
      badge: 'npm',
      badgeLabel: 'npm',
      url: 'https://www.npmjs.com/package/ngx-saqly-supabase',
      chips: ['Angular', 'Supabase', 'TypeScript', 'npm Package'],
      statsKey: 'opensource.items.supabase.stats',
    },
    {
      id: 'arab-dev-snippets',
      name: 'Arab Dev Snippets',
      descKey: 'opensource.items.arabDevSnippets.desc',
      badge: 'vscode',
      badgeLabel: 'VS Code',
      url: 'https://marketplace.visualstudio.com/items?itemName=MostafaSaqly.arabic-dev-snippets',
      chips: ['VS Code Extension', 'Arabic', 'Snippets', 'Developer Tools'],
      statsKey: 'opensource.items.arabDevSnippets.stats',
    },
  ];
}
