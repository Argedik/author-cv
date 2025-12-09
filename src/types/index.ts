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
}

export interface ContactInfo {
  email: string;
  phone?: string;
  address?: string;
}

// News Types
export interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  year: number;
  source: string;
  sourceImage?: string;
  url: string;
  category: 'events' | 'announcements' | 'updates' | 'media';
}

export interface NewsPageData {
  title: string;
  subtitle: string;
  description: string;
  emptyState: string;
  filters: {
    all: string;
    events: string;
    announcements: string;
    updates: string;
  };
}

export interface NewsCardProps {
  news: NewsItem;
  index: number;
}

export interface NewsSectionProps {
  news: NewsItem[];
  years: number[];
}

// Interview/Podcast Types
export interface Interview {
  id: number;
  showName: string;
  episodeTitle: string;
  host: string;
  date: string;
  duration: string;
  description: string;
  thumbnailUrl?: string;
  spotifyUrl?: string;
  youtubeUrl?: string;
  appleUrl?: string;
  platform: 'spotify' | 'youtube' | 'apple' | 'other';
  category: 'podcast' | 'interview' | 'panel' | 'conference';
}

export interface InterviewPageData {
  title: string;
  subtitle: string;
  description: string;
  contactText: string;
  contactLinkText: string;
  emptyState: string;
}

export interface InterviewCardProps {
  interview: Interview;
  index: number;
}

// About Page Types
export interface AboutPageData {
  title: string;
  subtitle: string;
  name: string;
  titles: string[];
  profileImage: string;
  quote: string;
  quoteAuthor?: string;
  biography: BiographySection[];
  timeline: TimelineItem[];
  socialLinks: SocialLink[];
  stats: AboutPageStat[];
}

export interface BiographySection {
  id: number;
  title: string;
  content: string;
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AboutPageStat {
  id: number;
  value: string;
  label: string;
}

// Contact Page Types
export interface ContactPageData {
  title: string;
  subtitle: string;
  description: string;
  formTitle: string;
  contactInfo: ContactInfoItem[];
  socialLinks: SocialLink[];
  faq: FAQItem[];
  newsletterTitle: string;
  newsletterDescription: string;
}

export interface ContactInfoItem {
  id: number;
  type: 'email' | 'phone' | 'address' | 'website';
  label: string;
  value: string;
  link?: string;
  icon: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

// Article Types
export interface Article {
  id: number;
  title: string;
  description: string;
  content?: string;
  image?: string;
  date: string;
  readTime: string;
  source: string;
  sourceUrl?: string;
  url: string;
  category: ArticleCategory;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export type ArticleCategory = 
  | 'tefsir'
  | 'hadis'
  | 'fiqh'
  | 'tasavvuf'
  | 'ahlak'
  | 'siyer'
  | 'akaid'
  | 'diger';

export interface ArticlePageData {
  title: string;
  subtitle: string;
  description: string;
  emptyState: string;
  searchPlaceholder: string;
  readingListTitle: string;
  featuredTitle: string;
}

export interface ArticleCardProps {
  article: Article;
  index: number;
  onAddToReadingList?: (article: Article) => void;
  isInReadingList?: boolean;
}

export interface FeaturedArticleProps {
  article: Article;
}

export interface ReadingListProps {
  articles: Article[];
  onRemove: (id: number) => void;
}

export interface ArticleSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

