export interface ProjectLink {
  label: string;
  url: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  highlights: string[];
  links: ProjectLink[];
  featured?: boolean;
}
