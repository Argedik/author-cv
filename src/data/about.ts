// About Section Data - Clean Architecture: Domain/Data Layer
import { AboutData } from '@/types';

export const ABOUT_DATA: AboutData = {
  title: 'Hakkımda',
  subtitle: 'İlim Yolculuğum',
  description: `Yarım asrı aşan bir ömür... Kitapların sayfaları arasında geçen yıllar, ilmin nurunda aydınlanan bir hayat. 
  
  Her satır, her kelime, her harf bana yeni kapılar açtı. Kadim âlimlerin izinden giderek, bu toprakların zengin mirasını gelecek nesillere aktarmak en büyük gayem oldu.
  
  Yazmak, sadece düşünceleri kağıda dökmek değil; asırların birikmiş hikmetini, bugünün insanına ulaştırmaktır. Her kitap, bir köprüdür geçmişle gelecek arasında.`,
  quote: 'İlim öğrenmek, her Müslüman erkek ve kadına farzdır.',
  quoteAuthor: 'Hz. Muhammed (s.a.v.)',
  stats: [
    {
      id: 1,
      value: '25+',
      label: 'Yayınlanmış Eser',
      icon: '📚',
    },
    {
      id: 2,
      value: '40+',
      label: 'Yıllık Tecrübe',
      icon: '🎓',
    },
    {
      id: 3,
      value: '100K+',
      label: 'Okuyucu',
      icon: '👥',
    },
    {
      id: 4,
      value: '15+',
      label: 'Ödül & Takdir',
      icon: '🏆',
    },
  ],
  backgroundImage: '/assets/images/suleyman-karakas-profile-dugun.jpeg',
};

