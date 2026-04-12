import { PortfolioProject } from '../models/project.model';
import { PortfolioService } from '../models/service.model';

export const PORTFOLIO_CONFIG = {
  appName: 'Mostafa Saqly Portfolio',

  projects: [
    // 🔥 Featured Projects
    {
      id: 'platzi-dashboard',
      title: 'projects.items.platzi.title',
      category: 'projects.category.dashboard',
      description: 'projects.items.platzi.description',
      stack: ['Angular', 'TypeScript', 'SCSS', 'REST API', 'Dashboard UI'],
      highlights: [
        'projects.items.platzi.highlight1',
        'projects.items.platzi.highlight2',
        'projects.items.platzi.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.github',
          url: 'https://github.com/mostafasaqly/platzi-dashboard-saqly.git',
        },
      ],
      featured: true,
    },

    {
      id: 'angular21-saqly',
      title: 'projects.items.angular21.title',
      category: 'projects.category.modernApp',
      description: 'projects.items.angular21.description',
      stack: ['Angular 21', 'Signals', 'Standalone Components', 'SCSS'],
      highlights: [
        'projects.items.angular21.highlight1',
        'projects.items.angular21.highlight2',
        'projects.items.angular21.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.github',
          url: 'https://github.com/mostafasaqly/Angular21-saqly.git',
        },
      ],
      featured: true,
    },

    {
      id: 'angular-supabase-crud',
      title: 'projects.items.angularSupabaseCrud.title',
      category: 'projects.category.webApp',
      description: 'projects.items.angularSupabaseCrud.description',
      stack: ['Angular', 'Supabase', 'CRUD', 'TypeScript'],
      highlights: [
        'projects.items.angularSupabaseCrud.highlight1',
        'projects.items.angularSupabaseCrud.highlight2',
        'projects.items.angularSupabaseCrud.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.github',
          url: 'https://github.com/mostafasaqly/Angular-Supabase-CRUD.git',
        },
      ],
      featured: false,
    },

    {
      id: 'saasify-app',
      title: 'projects.items.saasify.title',
      category: 'projects.category.saas',
      description: 'projects.items.saasify.description',
      stack: ['Angular', 'SaaS', 'UI/UX', 'Responsive UI'],
      highlights: [
        'projects.items.saasify.highlight1',
        'projects.items.saasify.highlight2',
        'projects.items.saasify.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.watchVideo',
          url: 'https://youtu.be/9uqw4nAwBqw',
        },
      ],
      featured: false,
    },

    {
      id: 'smart-invoice-generator',
      title: 'projects.items.smartInvoice.title',
      category: 'projects.category.productivity',
      description: 'projects.items.smartInvoice.description',
      stack: ['Angular', 'Forms', 'Dashboard UI', 'Invoices'],
      highlights: [
        'projects.items.smartInvoice.highlight1',
        'projects.items.smartInvoice.highlight2',
        'projects.items.smartInvoice.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.watchVideo',
          url: 'https://youtu.be/uDZHWOquvus',
        },
      ],
      featured: false,
    },

    {
      id: 'saqlyng',
      title: 'projects.items.saqlyng.title',
      category: 'projects.category.library',
      description: 'projects.items.saqlyng.description',
      stack: ['Angular Library', 'npm Package', 'Reusable Components'],
      highlights: [
        'projects.items.saqlyng.highlight1',
        'projects.items.saqlyng.highlight2',
        'projects.items.saqlyng.highlight3',
      ],
      links: [
        {
          label: 'projects.actions.github',
          url: 'https://github.com/mostafasaqly/saqlyng.git',
        },
        {
          label: 'projects.actions.watchVideo',
          url: 'https://youtu.be/yhAN0ZvXuhc',
        },
      ],
      featured: false,
    },
  ] satisfies PortfolioProject[],

  services: [
    {
      id: 'angular-development',
      title: 'services.items.angularDevelopment.title',
      description: 'services.items.angularDevelopment.description',
      bullets: [
        'services.items.angularDevelopment.bullet1',
        'services.items.angularDevelopment.bullet2',
        'services.items.angularDevelopment.bullet3',
      ],
      ctaLabel: 'services.actions.startProject',
      ctaHref: '#contact',
      iconText: 'NG',
      featured: true,
    },
    {
      id: 'saas-mvp',
      title: 'services.items.saasMvp.title',
      description: 'services.items.saasMvp.description',
      bullets: [
        'services.items.saasMvp.bullet1',
        'services.items.saasMvp.bullet2',
        'services.items.saasMvp.bullet3',
      ],
      ctaLabel: 'services.actions.bookService',
      ctaHref: '#contact',
      iconText: 'MVP',
      featured: true,
    },
    {
      id: 'mentoring',
      title: 'services.items.mentoring.title',
      description: 'services.items.mentoring.description',
      bullets: [
        'services.items.mentoring.bullet1',
        'services.items.mentoring.bullet2',
        'services.items.mentoring.bullet3',
      ],
      ctaLabel: 'services.actions.bookSession',
      ctaHref: '#contact',
      iconText: '1:1',
      featured: true,
    },
    {
      id: 'technical-consultation',
      title: 'services.items.consultation.title',
      description: 'services.items.consultation.description',
      bullets: [
        'services.items.consultation.bullet1',
        'services.items.consultation.bullet2',
        'services.items.consultation.bullet3',
      ],
      ctaLabel: 'services.actions.contactMe',
      ctaHref: '#contact',
      iconText: 'TC',
      featured: true,
    },
  ] satisfies PortfolioService[],
} as const;
