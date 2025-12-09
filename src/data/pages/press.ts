// Press Page Data - Basın Sayfası

export interface PressItem {
  id: number;
  title: string;
  outlet: string;
  outletLogo: string;
  date: string;
  type: 'newspaper' | 'magazine' | 'tv' | 'radio' | 'online';
  excerpt: string;
  link?: string;
}

export interface PressQuote {
  id: number;
  quote: string;
  source: string;
  date: string;
}

export interface PressPageData {
  title: string;
  subtitle: string;
  description: string;
  contactInfo: {
    title: string;
    email: string;
    phone: string;
    note: string;
  };
  stats: {
    id: number;
    value: string;
    label: string;
  }[];
  pressItems: PressItem[];
  quotes: PressQuote[];
  mediaTypes: string[];
}

export const PRESS_PAGE_DATA: PressPageData = {
  title: 'Basın & Medya',
  subtitle: 'Medya Yansımaları',
  description: 'Ulusal ve uluslararası basın kuruluşlarında yer alan haberler, röportajlar ve değerlendirmeler.',
  contactInfo: {
    title: 'Basın İletişim',
    email: 'basin@suleymankarakas.com',
    phone: '+90 212 XXX XX XX',
    note: 'Röportaj ve basın talepleri için lütfen iletişime geçiniz.',
  },
  stats: [
    { id: 1, value: '50+', label: 'Basın Haberi' },
    { id: 2, value: '25+', label: 'TV Programı' },
    { id: 3, value: '15+', label: 'Radyo Yayını' },
    { id: 4, value: '100+', label: 'Online Haber' },
  ],
  mediaTypes: ['Tümü', 'Gazete', 'Dergi', 'TV', 'Radyo', 'Online'],
  pressItems: [
    {
      id: 1,
      title: '"Kalplerin Şifası" Kitabı Büyük İlgi Gördü',
      outlet: 'Türkiye Gazetesi',
      outletLogo: '📰',
      date: '15 Ocak 2024',
      type: 'newspaper',
      excerpt: 'Süleyman Karakaş\'ın yeni eseri "Kalplerin Şifası" okuyuculardan büyük ilgi gördü. Kitap, ilk haftasında en çok satanlar listesine girdi.',
    },
    {
      id: 2,
      title: 'Ramazan Özel Programı - Manevi Sohbetler',
      outlet: 'TRT 1',
      outletLogo: '📺',
      date: '10 Mart 2024',
      type: 'tv',
      excerpt: 'Ramazan ayı boyunca her akşam yayınlanan "Manevi Sohbetler" programının konuğu olan Süleyman Karakaş, oruç ve tefekkür üzerine konuştu.',
    },
    {
      id: 3,
      title: 'Osmanlı Tefsir Geleneği Üzerine',
      outlet: 'Diyanet TV',
      outletLogo: '📺',
      date: '5 Şubat 2024',
      type: 'tv',
      excerpt: 'Osmanlı döneminde tefsir ilminin gelişimi ve günümüze etkileri üzerine kapsamlı bir söyleşi.',
    },
    {
      id: 4,
      title: 'Yazar Röportajı: İlim ve İrfan Yolculuğu',
      outlet: 'Yeni Şafak',
      outletLogo: '📰',
      date: '22 Aralık 2023',
      type: 'newspaper',
      excerpt: 'Süleyman Karakaş ile yazarlık serüveni, eserleri ve ilmi çalışmaları üzerine özel röportaj.',
    },
    {
      id: 5,
      title: 'Sabah Keyfi - Kitap Söyleşisi',
      outlet: 'TRT Radyo 1',
      outletLogo: '📻',
      date: '18 Kasım 2023',
      type: 'radio',
      excerpt: 'Sabah Keyfi programında kitaplar ve okuma kültürü üzerine samimi bir sohbet.',
    },
    {
      id: 6,
      title: 'Modern Dönemde Tasavvuf Anlayışı',
      outlet: 'Dünya Bülteni',
      outletLogo: '🌐',
      date: '8 Ekim 2023',
      type: 'online',
      excerpt: 'Günümüzde tasavvufun yeri ve önemi üzerine kapsamlı bir analiz yazısı.',
    },
    {
      id: 7,
      title: 'Kültür-Sanat Dergisi Özel Dosyası',
      outlet: 'Diriliş Postası',
      outletLogo: '📖',
      date: '1 Eylül 2023',
      type: 'magazine',
      excerpt: 'Dini yayıncılıkta yeni eserler ve yazarlar dosyasında Süleyman Karakaş\'a geniş yer verildi.',
    },
  ],
  quotes: [
    {
      id: 1,
      quote: 'Süleyman Karakaş, kadim ilim geleneğini modern okuyucuya aktarmada başarılı bir köprü kuruyor.',
      source: 'Türkiye Gazetesi',
      date: '2024',
    },
    {
      id: 2,
      quote: 'Eserleri, derin ilmi birikimi sade bir dille okuyucuya sunuyor.',
      source: 'Yeni Şafak',
      date: '2023',
    },
    {
      id: 3,
      quote: 'Tasavvuf alanında kaleme aldığı eserler, bu alanda önemli bir boşluğu dolduruyor.',
      source: 'Diyanet Aylık Dergi',
      date: '2023',
    },
  ],
};

