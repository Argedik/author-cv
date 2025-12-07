// Footer Data - Clean Architecture: Domain/Data Layer
import { FooterData } from '@/types';

export const FOOTER_DATA: FooterData = {
  brand: {
    name: 'Süleyman Karakaş',
    description: 'İlim ve irfan yolunda, kadim değerleri bugüne taşıyan eserler...',
  },
  navigation: [
    {
      title: 'Eserler',
      links: [
        { label: 'Kitaplar', href: '#books' },
        { label: 'Makaleler', href: '#articles' },
        { label: 'Araştırmalar', href: '#research' },
      ],
    },
    {
      title: 'Hakkında',
      links: [
        { label: 'Biyografi', href: '#about' },
        { label: 'Akademik Çalışmalar', href: '#academic' },
        { label: 'Ödüller', href: '#awards' },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { label: 'Bize Ulaşın', href: '#contact' },
        { label: 'Yayınevleri', href: '#publishers' },
        { label: 'Basın', href: '#press' },
      ],
    },
  ],
  social: [
    { name: 'YouTube', url: '#', icon: '📺' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'Facebook', url: '#', icon: '📘' },
  ],
  contact: {
    email: 'iletisim@suleymankarakas.com',
    address: 'İstanbul, Türkiye',
  },
  copyright: '© 2024 Süleyman Karakaş. Tüm hakları saklıdır.',
};

