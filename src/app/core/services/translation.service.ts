import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { AppLanguage } from '../models/language.model';

type TranslationDictionary = Record<string, string>;

const LANGUAGE_STORAGE_KEY = 'portfolio-language';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  readonly language = signal<AppLanguage>(this.getInitialLanguage());
  readonly translations = signal<TranslationDictionary>({});

  readonly dir = computed(() => (this.language() === 'ar' ? 'rtl' : 'ltr'));
  readonly isArabic = computed(() => this.language() === 'ar');

  constructor() {
    effect(() => {
      const lang = this.language();

      this.document.documentElement.lang = lang;
      this.document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

      this.loadTranslations(lang);
    });
  }

  toggleLanguage(): void {
    this.language.update((current) => (current === 'en' ? 'ar' : 'en'));
  }

  setLanguage(language: AppLanguage): void {
    this.language.set(language);
  }

  t(key: string): string {
    return this.translations()[key] ?? key;
  }

  private loadTranslations(language: AppLanguage): void {
    this.http
      .get<TranslationDictionary>(`assets/i18n/${language}.json`)
      .subscribe({
        next: (dictionary) => this.translations.set(dictionary),
        error: () => this.translations.set({}),
      });
  }

  private getInitialLanguage(): AppLanguage {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as AppLanguage | null;

    if (savedLanguage === 'en' || savedLanguage === 'ar') {
      return savedLanguage;
    }

    return 'en';
  }
}
