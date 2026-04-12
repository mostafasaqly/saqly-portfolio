export interface PortfolioService {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  iconText: string;
  featured?: boolean;
}
