import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-container',
  standalone: true,
  templateUrl: './section-container.component.html',
  styleUrl: './section-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionContainerComponent {
  readonly sectionId = input<string>('');
}
