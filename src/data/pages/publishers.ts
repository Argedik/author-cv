// Publishers Page Data - Yayınevleri Sayfası

export interface Publisher {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  booksPublished: number;
  city: string;
  type: 'primary' | 'secondary';
}

export interface PublishersPageData {
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
  publishers: Publisher[];
  bookDistribution: {
    region: string;
    percentage: number;
    icon: string;
  }[];
}

export const PUBLISHERS_PAGE_DATA: PublishersPageData = {
  title: 'Yayınevleri',
  subtitle: 'Neşriyat',
  description: 'Eserlerimin basım ve dağıtımını üstlenen değerli yayınevleri ile işbirliklerimiz.',
  quote: 'Kitap, yazarın gönlünden okurun kalbine uzanan köprüdür.',
  quoteAuthor: 'Süleyman Karakaş',
  stats: [
    { id: 1, value: '6', label: 'Yayınevi İşbirliği' },
    { id: 2, value: '15+', label: 'Basılan Eser' },
    { id: 3, value: '81', label: 'İl Dağıtım' },
    { id: 4, value: '12', label: 'Ülke' },
  ],
  publishers: [
    {
      id: 1,
      name: 'Timaş Yayınları',
      logo: '📚',
      description: 'Türkiye\'nin önde gelen dini ve kültürel yayınevlerinden biri. 50 yılı aşkın tecrübesiyle okuyucuya ulaşan eserler.',
      website: 'https://www.timas.com.tr',
      booksPublished: 5,
      city: 'İstanbul',
      type: 'primary',
    },
    {
      id: 2,
      name: 'Diyanet İşleri Başkanlığı Yayınları',
      logo: '🕌',
      description: 'Dini yayıncılıkta Türkiye\'nin en köklü kurumsal yayınevi.',
      website: 'https://yayin.diyanet.gov.tr',
      booksPublished: 3,
      city: 'Ankara',
      type: 'primary',
    },
    {
      id: 3,
      name: 'İnsan Yayınları',
      logo: '📖',
      description: 'Kaliteli akademik ve düşünce kitaplarıyla tanınan prestijli yayınevi.',
      website: 'https://www.insanyayinlari.com.tr',
      booksPublished: 2,
      city: 'İstanbul',
      type: 'secondary',
    },
    {
      id: 4,
      name: 'Erkam Yayınları',
      logo: '📕',
      description: 'İslami yayıncılıkta geniş okuyucu kitlesine ulaşan yayınevi.',
      website: 'https://www.erkamyayinlari.com',
      booksPublished: 2,
      city: 'İstanbul',
      type: 'secondary',
    },
    {
      id: 5,
      name: 'Sofi Kitap',
      logo: '✨',
      description: 'Tasavvuf ve manevi konularda uzmanlaşmış butik yayınevi.',
      website: 'https://www.sofiyayinlari.com',
      booksPublished: 2,
      city: 'İstanbul',
      type: 'secondary',
    },
    {
      id: 6,
      name: 'Akademi Yayınları',
      logo: '🎓',
      description: 'Akademik çalışmaların yayınlandığı üniversite yayınevi.',
      website: 'https://www.akademiyayinlari.com',
      booksPublished: 1,
      city: 'İstanbul',
      type: 'secondary',
    },
  ],
  bookDistribution: [
    { region: 'Marmara', percentage: 35, icon: '🏙️' },
    { region: 'İç Anadolu', percentage: 20, icon: '🏛️' },
    { region: 'Ege', percentage: 15, icon: '🌊' },
    { region: 'Akdeniz', percentage: 12, icon: '☀️' },
    { region: 'Karadeniz', percentage: 10, icon: '🌲' },
    { region: 'Diğer', percentage: 8, icon: '🗺️' },
  ],
};

