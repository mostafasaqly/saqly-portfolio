import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TPipe } from '../../pipes/t.pipe';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  imports: [TPipe],
  templateUrl: './section-heading.component.html',
  styleUrl: './section-heading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionHeadingComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input<string>('');
  readonly align = input<'start' | 'center'>('start');
}
