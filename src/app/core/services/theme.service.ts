import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal, computed, effect } from '@angular/core';
import { AppTheme } from '../models/theme.model';

const THEME_STORAGE_KEY = 'portfolio-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  readonly theme = signal<AppTheme>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const currentTheme = this.theme();

      this.document.documentElement.setAttribute('data-theme', currentTheme);
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    });
  }

  toggleTheme(): void {
    this.theme.update((current) => (current === 'light' ? 'dark' : 'light'));
  }

  setTheme(theme: AppTheme): void {
    this.theme.set(theme);
  }

  private getInitialTheme(): AppTheme {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as AppTheme | null;

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }
}
