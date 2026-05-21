import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslationService } from '../../../core/services/translation.service';
import { TPipe } from '../../../shared/pipes/t.pipe';
import { ScrollSpyService } from '../../../core/services/scroll-spy.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TPipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
  private readonly themeService = inject(ThemeService);
  private readonly translationService = inject(TranslationService);
  private readonly scrollSpyService = inject(ScrollSpyService);

  readonly isDark = this.themeService.isDark;
  readonly currentLanguage = this.translationService.language;
  readonly currentDir = this.translationService.dir;
  readonly activeSection = this.scrollSpyService.activeSection;

  readonly isMenuOpen = signal(false);

  readonly navLinks = computed(() => [
    { label: 'nav.home', href: '#home', id: 'home' },
    { label: 'nav.about', href: '#about', id: 'about' },
    { label: 'nav.tech', href: '#tech-stack', id: 'tech-stack' },
    { label: 'nav.projects', href: '#projects', id: 'projects' },
    { label: 'nav.opensource', href: '#opensource', id: 'opensource' },
    { label: 'nav.services', href: '#services', id: 'services' },
    { label: 'nav.contact', href: '#contact', id: 'contact' },
  ]);

  readonly coursesLink = { label: 'nav.courses', href: '/courses' };

  ngAfterViewInit(): void {
  setTimeout(() => {
    this.scrollSpyService.observeSections(
      this.navLinks().map((item) => item.id)
    );

    const hash = window.location.hash.replace('#', '');
    if (hash) {
      this.scrollSpyService.setActiveSection(hash);
    }
  }, 100);
}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  isActive(id: string): boolean {
    return this.activeSection() === id;
  }
}
