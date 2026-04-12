import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appTiltCard]',
  standalone: true,
})
export class TiltCardDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @Input() tiltStrength = 6;

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * this.tiltStrength;
    const rotateX = (((y / rect.height) - 0.5) * this.tiltStrength) * -1;

    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const element = this.elementRef.nativeElement;
    element.style.transform = '';
  }
}
