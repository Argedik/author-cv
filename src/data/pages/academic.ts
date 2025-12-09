// Academic Page Data - Akademik Çalışmalar Sayfası

export interface Publication {
  id: number;
  title: string;
  type: 'book' | 'article' | 'thesis' | 'conference';
  year: string;
  publisher: string;
  description: string;
  citations?: number;
  link?: string;
}

export interface Collaboration {
  id: number;
  institution: string;
  country: string;
  type: string;
  year: string;
  icon: string;
}

export interface AcademicPageData {
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  stats: {
    id: number;
    value: string;
    label: string;
  }[];
  publications: Publication[];
  collaborations: Collaboration[];
  degrees: {
    id: number;
    degree: string;
    field: string;
    institution: string;
    year: string;
    icon: string;
  }[];
}

export const ACADEMIC_PAGE_DATA: AcademicPageData = {
  title: 'Akademik Çalışmalar',
  subtitle: 'İlmî Kürsü',
  description: 'Yükseköğretim kurumlarında verilen dersler, akademik yayınlar ve bilimsel katkılar.',
  quote: 'Hakiki ilim, insanı tevazuya ve hikmete götürendir.',
  quoteAuthor: 'Süleyman Karakaş',
  stats: [
    { id: 1, value: '15+', label: 'Akademik Yayın' },
    { id: 2, value: '500+', label: 'Öğrenci' },
    { id: 3, value: '25+', label: 'Konferans' },
    { id: 4, value: '10+', label: 'Uluslararası İşbirliği' },
  ],
  degrees: [
    {
      id: 1,
      degree: 'Doktora',
      field: 'İslam Tarihi ve Sanatları',
      institution: 'Marmara Üniversitesi',
      year: '2015',
      icon: '🎓',
    },
    {
      id: 2,
      degree: 'Yüksek Lisans',
      field: 'Tefsir',
      institution: 'İstanbul Üniversitesi',
      year: '2010',
      icon: '📚',
    },
    {
      id: 3,
      degree: 'Lisans',
      field: 'İlahiyat',
      institution: 'Ankara Üniversitesi',
      year: '2007',
      icon: '🏛️',
    },
  ],
  publications: [
    {
      id: 1,
      title: 'Osmanlı Dönemi Tefsir Geleneği: Bir Değerlendirme',
      type: 'article',
      year: '2024',
      publisher: 'İslam Araştırmaları Dergisi',
      description: 'Osmanlı İmparatorluğu döneminde yazılan tefsir eserlerinin kapsamlı bir analizi.',
      citations: 12,
    },
    {
      id: 2,
      title: 'Kalplerin Şifası: Manevi Hastalıklar ve Tedavileri',
      type: 'book',
      year: '2023',
      publisher: 'Timaş Yayınları',
      description: 'Tasavvuf perspektifinden kalbi hastalıkların ele alınması.',
      citations: 45,
    },
    {
      id: 3,
      title: 'Modern Dönemde Hadis İlimlerinin Önemi',
      type: 'conference',
      year: '2023',
      publisher: 'Uluslararası İslam Kongresi',
      description: 'Hadis ilimlerinin günümüzdeki rolü ve önemi üzerine bildiri.',
      citations: 8,
    },
    {
      id: 4,
      title: 'Endülüs Medreseleri ve Eğitim Sistemi',
      type: 'thesis',
      year: '2015',
      publisher: 'Marmara Üniversitesi',
      description: 'Doktora tezi: Endülüs döneminde İslami eğitim kurumları.',
      citations: 23,
    },
    {
      id: 5,
      title: 'Tasavvuf Terminolojisi Üzerine Notlar',
      type: 'article',
      year: '2022',
      publisher: 'Tasavvuf İlmi ve Akademik Araştırma Dergisi',
      description: 'Klasik tasavvuf metinlerindeki terimlerin etimolojik analizi.',
      citations: 15,
    },
  ],
  collaborations: [
    {
      id: 1,
      institution: 'Al-Azhar Üniversitesi',
      country: 'Mısır',
      type: 'Araştırma Ortaklığı',
      year: '2020',
      icon: '🇪🇬',
    },
    {
      id: 2,
      institution: 'SOAS University of London',
      country: 'İngiltere',
      type: 'Değişim Programı',
      year: '2019',
      icon: '🇬🇧',
    },
    {
      id: 3,
      institution: 'Georgetown Üniversitesi',
      country: 'ABD',
      type: 'Konuk Öğretim Üyesi',
      year: '2021',
      icon: '🇺🇸',
    },
    {
      id: 4,
      institution: 'Medine İslam Üniversitesi',
      country: 'Suudi Arabistan',
      type: 'Ortak Proje',
      year: '2022',
      icon: '🇸🇦',
    },
  ],
};

