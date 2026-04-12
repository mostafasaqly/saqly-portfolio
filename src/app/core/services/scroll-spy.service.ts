import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollSpyService {
  private readonly document = inject(DOCUMENT);

  readonly activeSection = signal<string>('home');

  private observer?: IntersectionObserver;
  private readonly visibleSections = new Map<string, number>();

  observeSections(sectionIds: string[]): void {
    this.observer?.disconnect();
    this.visibleSections.clear();

    const elements = sectionIds
      .map((id) => this.document.getElementById(id))
      .filter((element): element is HTMLElement => !!element);

    if (!elements.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;

          if (entry.isIntersecting) {
            this.visibleSections.set(id, entry.intersectionRatio);
          } else {
            this.visibleSections.delete(id);
          }
        }

        if (!this.visibleSections.size) {
          return;
        }

        const nextActive = [...this.visibleSections.entries()]
          .sort((a, b) => b[1] - a[1])[0][0];

        this.activeSection.set(nextActive);
      },
      {
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
        rootMargin: '-90px 0px -45% 0px',
      }
    );

    elements.forEach((element) => this.observer?.observe(element));
  }
  setActiveSection(sectionId: string): void {
  this.activeSection.set(sectionId);
}
}
