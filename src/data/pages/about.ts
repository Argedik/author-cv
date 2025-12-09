// About Page Data - Clean Architecture: Domain/Data Layer
import { AboutPageData } from '@/types';

export const ABOUT_PAGE_DATA: AboutPageData = {
  title: 'Hakkımda',
  subtitle: 'HAYAT YOLCULUĞUM',
  name: 'Süleyman Karakaş',
  titles: ['İlim İnsanı', 'Yazar', 'Eğitimci'],
  profileImage: '/assets/images/suleyman-karakas-profile.png',
  
  quote: 'İlim öğrenmek, her Müslüman erkek ve kadına farzdır. İlim Çin\'de bile olsa alınız.',
  quoteAuthor: 'Hz. Muhammed (s.a.v.)',

  biography: [
    {
      id: 1,
      title: 'İlim Yolculuğum',
      content: `Yarım asrı aşan bir ömür... Kitapların sayfaları arasında geçen yıllar, ilmin nurunda aydınlanan bir hayat. Her satır, her kelime, her harf bana yeni kapılar açtı. Kadim âlimlerin izinden giderek, bu toprakların zengin mirasını gelecek nesillere aktarmak en büyük gayem oldu.`,
    },
    {
      id: 2,
      title: 'Eğitim ve Akademik Çalışmalar',
      content: `İslami ilimler alanında uzun yıllar süren eğitim hayatımda, fıkıh, tefsir, hadis ve tasavvuf gibi temel disiplinlerde derinlemesine çalışmalar yaptım. Klasik eserlerin yanı sıra, çağdaş İslam düşüncesi üzerine de araştırmalar yürüttüm.`,
    },
    {
      id: 3,
      title: 'Yazarlık Serüvenim',
      content: `Yazmak, sadece düşünceleri kağıda dökmek değil; asırların birikmiş hikmetini, bugünün insanına ulaştırmaktır. Her kitap, bir köprüdür geçmişle gelecek arasında. Bugüne kadar kaleme aldığım eserlerle, okuyucularıma manevi bir rehberlik sunmayı hedefledim.`,
    },
  ],

  // Hayat Yolculuğu Timeline - Benim eklediğim özel özellik
  timeline: [
    {
      id: 1,
      year: '1970',
      title: 'Doğum',
      description: 'Anadolu\'nun bereketli topraklarında, ilim ve irfan geleneğine sahip bir ailede dünyaya geldim.',
      icon: '🌟',
    },
    {
      id: 2,
      year: '1985',
      title: 'İlk Eğitim',
      description: 'Hafızlık eğitimini tamamladım ve İslami ilimlere adım attım.',
      icon: '📖',
    },
    {
      id: 3,
      year: '1992',
      title: 'Akademik Eğitim',
      description: 'İlahiyat Fakültesi\'nden mezun olarak akademik kariyerime başladım.',
      icon: '🎓',
    },
    {
      id: 4,
      year: '2000',
      title: 'İlk Eser',
      description: 'İlk kitabım yayımlandı ve yazarlık serüvenim resmen başladı.',
      icon: '✍️',
    },
    {
      id: 5,
      year: '2010',
      title: 'Eğitim Faaliyetleri',
      description: 'İslami İlimler Akademisi\'ni kurarak gençlere eğitim vermeye başladım.',
      icon: '🏛️',
    },
    {
      id: 6,
      year: '2020',
      title: 'Dijital Dönüşüm',
      description: 'Online eğitim platformunu hayata geçirerek dünya genelinde öğrencilere ulaştım.',
      icon: '🌐',
    },
    {
      id: 7,
      year: 'Bugün',
      title: 'Devam Eden Yolculuk',
      description: 'İlim ve irfan yolunda, yeni eserler ve eğitimlerle hizmetlerime devam ediyorum.',
      icon: '🔮',
    },
  ],

  socialLinks: [
    { name: 'YouTube', url: 'https://youtube.com'},
    { name: 'X', url: 'https://x.com',},
    { name: 'LinkedIn', url: 'https://linkedin.com'},
    { name: 'Facebook', url: 'https://facebook.com'},
    { name: 'Instagram', url: 'https://instagram.com'},
    { name: 'Spotify', url: 'https://open.spotify.com/'},
  ],

  stats: [
    { id: 1, value: '15+', label: 'Yayımlanan Kitap' },
    { id: 2, value: '50+', label: 'Yıl İlim Yolculuğu' },
    { id: 3, value: '10.000+', label: 'Öğrenci' },
    { id: 4, value: '100+', label: 'Röportaj & Konferans' },
  ],
};
