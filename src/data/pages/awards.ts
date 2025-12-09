// Awards Page Data - Ödüller Sayfası

export interface Award {
  id: number;
  title: string;
  organization: string;
  year: string;
  description: string;
  category: string;
  icon: string;
  importance: 'gold' | 'silver' | 'bronze';
}

export interface AwardsPageData {
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
  awards: Award[];
  categories: string[];
}

export const AWARDS_PAGE_DATA: AwardsPageData = {
  title: 'Ödüller & Takdirler',
  subtitle: 'Taltifler',
  description: 'İlmi çalışmalar ve topluma katkılar dolayısıyla alınan ödüller ve takdirnameler.',
  quote: 'Ödüller, yolun sonunda değil, yolculuğun içinde anlam kazanır.',
  quoteAuthor: 'Süleyman Karakaş',
  stats: [
    { id: 1, value: '12', label: 'Ödül' },
    { id: 2, value: '8', label: 'Takdirname' },
    { id: 3, value: '5', label: 'Onur Belgesi' },
    { id: 4, value: '3', label: 'Uluslararası' },
  ],
  categories: ['Tümü', 'Akademik', 'Kültür-Sanat', 'Toplumsal', 'Uluslararası'],
  awards: [
    {
      id: 1,
      title: 'Yılın İslami Eseri Ödülü',
      organization: 'Türkiye Yazarlar Birliği',
      year: '2024',
      description: '"Kalplerin Şifası" adlı eser için verilen prestijli ödül.',
      category: 'Kültür-Sanat',
      icon: '🏆',
      importance: 'gold',
    },
    {
      id: 2,
      title: 'Akademik Mükemmellik Ödülü',
      organization: 'Marmara Üniversitesi',
      year: '2023',
      description: 'Tefsir alanındaki özgün araştırmalar için akademik başarı ödülü.',
      category: 'Akademik',
      icon: '🎓',
      importance: 'gold',
    },
    {
      id: 3,
      title: 'Uluslararası İslam Araştırmaları Ödülü',
      organization: 'ISESCO',
      year: '2022',
      description: 'İslam kültürüne katkı sağlayan çalışmalar için verilen uluslararası ödül.',
      category: 'Uluslararası',
      icon: '🌍',
      importance: 'gold',
    },
    {
      id: 4,
      title: 'Diyanet Takdirnamesi',
      organization: 'Diyanet İşleri Başkanlığı',
      year: '2021',
      description: 'Dini yayıncılık alanındaki hizmetler için takdirname.',
      category: 'Toplumsal',
      icon: '📜',
      importance: 'silver',
    },
    {
      id: 5,
      title: 'En İyi Tez Ödülü',
      organization: 'YÖK',
      year: '2015',
      description: 'Doktora tezi için verilen ulusal başarı ödülü.',
      category: 'Akademik',
      icon: '📚',
      importance: 'silver',
    },
    {
      id: 6,
      title: 'Kültür Bakanlığı Onur Belgesi',
      organization: 'Kültür ve Turizm Bakanlığı',
      year: '2020',
      description: 'Türk-İslam kültürüne katkı sağlayan eserler için onur belgesi.',
      category: 'Kültür-Sanat',
      icon: '🎖️',
      importance: 'bronze',
    },
  ],
};

