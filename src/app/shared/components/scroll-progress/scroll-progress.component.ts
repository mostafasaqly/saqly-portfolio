import { ChangeDetectionStrategy, Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `
    <div class="scroll-progress" aria-hidden="true">
      <div class="scroll-progress__bar" [style.width.%]="progress()"></div>
    </div>
  `,
  styleUrl: './scroll-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollProgressComponent {
  readonly progress = signal(0);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) {
      this.progress.set(0);
      return;
    }

    const percentage = (scrollTop / scrollHeight) * 100;
    this.progress.set(Math.min(100, Math.max(0, percentage)));
  }
}
