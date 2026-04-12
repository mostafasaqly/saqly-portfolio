import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TPipe } from '../../../shared/pipes/t.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
}
