// Type definitions for the application

export interface Book {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeroSectionProps {
  title: string;
  subtitle: string;
}

export interface BookCardProps {
  book: Book;
  index: number;
}

export interface BooksSectionProps {
  books: Book[];
}

export interface HeaderProps {
  scrolled: boolean;
}

// About Section Types
export interface AboutSectionProps {
  data: AboutData;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  stats?: AboutStat[];
  backgroundImage?: string;
}

export interface AboutStat {
  id: number;
  value: string;
  label: string;
  icon: string;
}

// References Section Types
export interface ReferencesSectionProps {
  data: ReferencesData;
}

export interface ReferencesData {
  title: string;
  subtitle: string;
  references: Reference[];
}

export interface Reference {
  id: number;
  name: string;
  title: string;
  organization: string;
  quote: string;
  image?: string;
}

// Footer Types
export interface FooterProps {
  data: FooterData;
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
  };
  navigation: FooterNavSection[];
  social: SocialLink[];
  contact: ContactInfo;
  copyright: string;
}

export interface FooterNavSection {
  title: string;
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

