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
        { label: 'Kitaplar', href: '/books' },
        { label: 'Makaleler', href: '/articles' },
        { label: 'Araştırmalar', href: '/research' },
      ],
    },
    {
      title: 'Hakkında',
      links: [
        { label: 'Biyografi', href: '/about' },
        { label: 'Akademik Çalışmalar', href: '/academic' },
        { label: 'Ödüller', href: '/awards' },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { label: 'Bize Ulaşın', href: '/contact' },
        { label: 'Yayınevleri', href: '/publishers' },
        { label: 'Basın', href: '/press' },
      ],
    },
  ],
  social: [
    { name: 'YouTube', url: 'https://www.youtube.com/',},
    { name: 'X', url: 'https://x.com/'},
    { name: 'LinkedIn', url: 'https://www.linkedin.com/',},
    { name: 'Facebook', url: 'https://www.facebook.com/'},
    { name: 'Instagram', url: 'https://www.instagram.com/'},
    { name: 'Spotify', url: 'https://www.spotify.com/'},
  ],
  contact: {
    email: 'karakassuleyman@gmail.com',
    address: 'Eyüpsultan, İstanbul, Türkiye',
  },
  copyright: '© 2026 Süleyman Karakaş. Tüm hakları saklıdır.',
};

