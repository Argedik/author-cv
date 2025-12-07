// Navigation Data - Clean Architecture: Domain/Data Layer
import { NavItem } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Ana Sayfa', href: '/', isActive: true },
  { label: 'Kitaplar', href: '/books', isActive: false },
  { label: 'Makaleler', href: '#articles', isActive: false },
  { label: 'Haberler', href: '/news', isActive: false },
  { label: 'Röportajlar', href: '#interviews', isActive: false },
  { label: 'Hakkımda', href: '#about', isActive: false },
  { label: 'İletişim', href: '#contact', isActive: false },
];

