import { Book, NavItem } from '@/types';

// Navigation items
export const NAV_ITEMS: NavItem[] = [
  { label: 'Books', href: '#', isActive: false },
  { label: 'Articles', href: '#', isActive: false },
  { label: 'News', href: '#', isActive: false },
  { label: 'Interviews', href: '#', isActive: false },
  { label: 'About', href: '#', isActive: true },
  { label: 'Contact', href: '#', isActive: false },
];

// Books data
export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Automate Your Busywork',
    description: 'In my newest book, Automate Your Busywork, I explore the world of automation and show you how you can use it to make the most of your most precious asset: time.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    title: 'The Art of Productivity',
    description: 'Discover the secrets of effective time management and productivity techniques that will transform your daily routine and help you achieve more.',
    image: '/book2.jpg',
  },
  {
    id: 3,
    title: 'Digital Transformation',
    description: 'A comprehensive guide to understanding and implementing digital transformation in your personal and professional life.',
    image: '/book3.jpg',
  },
  {
    id: 4,
    title: 'Creative Writing Mastery',
    description: 'Learn the art of storytelling and creative writing from an experienced author who has published numerous bestsellers.',
    image: '/book4.jpg',
  },
  {
    id: 5,
    title: 'Mindful Living',
    description: 'Explore the path to a more mindful and balanced life through practical exercises and ancient wisdom.',
    image: '/book5.jpg',
  },
];

// Hero section content
export const HERO_CONTENT = {
  title: 'Kitaplarım',
  subtitle: 'Eserlerimi keşfedin ve okuyun',
};

// Brand name
export const BRAND_NAME = 'AYTEKIN TANK';

