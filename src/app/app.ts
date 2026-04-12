import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AppShellComponent],
  template: `
    <!-- <a class="skip-link" href="#main-content">Skip to content</a> -->
    <app-shell />
  `,
  styles: [`
    .skip-link {
      position: absolute;
      top: -48px;
      inset-inline-start: 1rem;
      z-index: 2000;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      background: var(--color-primary);
      color: #fff;
      text-decoration: none;
      font-weight: 700;
      transition: top 0.2s ease;
    }

    .skip-link:focus {
      top: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
