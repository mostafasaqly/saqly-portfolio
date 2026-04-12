import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from '../components/hero-section/hero-section.component';
import { AboutSectionComponent } from '../components/about-section/about-section.component';
import { TechStackSectionComponent } from '../components/tech-stack-section/tech-stack-section.component';
import { ProjectsSectionComponent } from '../components/projects-section/projects-section.component';
import { ServicesSectionComponent } from '../components/services-section/services-section.component';
import { ContactSectionComponent } from '../components/contact-section/contact-section.component';
import { RevealOnScrollDirective } from '../../../shared/directives/reveal-on-scroll.directive';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroSectionComponent,
    AboutSectionComponent,
    TechStackSectionComponent,
    ProjectsSectionComponent,
    ServicesSectionComponent,
    ContactSectionComponent,
    RevealOnScrollDirective,
  ],
  template: `
    <div appRevealOnScroll><app-hero-section /></div>
    <div appRevealOnScroll><app-about-section /></div>
    <div appRevealOnScroll><app-tech-stack-section /></div>
    <div appRevealOnScroll><app-projects-section /></div>
    <div appRevealOnScroll><app-services-section /></div>
    <div appRevealOnScroll><app-contact-section /></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
