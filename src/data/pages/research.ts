// Research Page Data - Araştırmalar Sayfası

export interface ResearchProject {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  status: 'completed' | 'ongoing' | 'planned';
  icon: string;
  tags: string[];
}

export interface ResearchPageData {
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
  projects: ResearchProject[];
  categories: string[];
}

export const RESEARCH_PAGE_DATA: ResearchPageData = {
  title: 'Araştırmalar',
  subtitle: 'İlmî Çalışmalar',
  description: 'İslam tarihi, tasavvuf, tefsir ve hadis alanlarında yürütülen kapsamlı araştırma projeleri.',
  quote: 'İlim, insanın kendi nefsini ve Rabbini tanıması için en kıymetli vasıtadır.',
  quoteAuthor: 'Süleyman Karakaş',
  stats: [
    { id: 1, value: '25+', label: 'Araştırma Projesi' },
    { id: 2, value: '150+', label: 'Kaynak İnceleme' },
    { id: 3, value: '12', label: 'Yıllık Deneyim' },
    { id: 4, value: '8', label: 'Uluslararası İşbirliği' },
  ],
  categories: ['Tümü', 'Tefsir', 'Hadis', 'Tasavvuf', 'İslam Tarihi', 'Fıkıh'],
  projects: [
    {
      id: 1,
      title: 'Osmanlı Dönemi Tefsir Geleneği',
      description: 'Osmanlı İmparatorluğu döneminde kaleme alınan tefsir eserlerinin sistematik incelemesi ve modern dönemle karşılaştırmalı analizi.',
      category: 'Tefsir',
      year: '2024',
      status: 'ongoing',
      icon: '📜',
      tags: ['Osmanlı', 'Tefsir', 'Tarih'],
    },
    {
      id: 2,
      title: 'Hadis Rivayet Zincirleri Analizi',
      description: 'Kütüb-i Sitte\'deki hadislerin rivayet zincirlerinin dijital ortamda haritalanması ve güvenilirlik analizi.',
      category: 'Hadis',
      year: '2023',
      status: 'completed',
      icon: '📿',
      tags: ['Hadis', 'Dijital', 'Analiz'],
    },
    {
      id: 3,
      title: 'Tasavvuf Terminolojisi Sözlüğü',
      description: 'Klasik tasavvuf metinlerinde kullanılan terimlerin etimolojik ve kavramsal analizi.',
      category: 'Tasavvuf',
      year: '2024',
      status: 'ongoing',
      icon: '🕌',
      tags: ['Tasavvuf', 'Sözlük', 'Terminoloji'],
    },
    {
      id: 4,
      title: 'Endülüs Medreseleri',
      description: 'Endülüs döneminde kurulan medreselerin eğitim müfredatı ve ilim geleneği üzerine araştırma.',
      category: 'İslam Tarihi',
      year: '2022',
      status: 'completed',
      icon: '🏛️',
      tags: ['Endülüs', 'Eğitim', 'Tarih'],
    },
    {
      id: 5,
      title: 'Modern Fıkıh Meseleleri',
      description: 'Çağdaş dönemde ortaya çıkan yeni fıkhi meselelerin klasik usul çerçevesinde değerlendirilmesi.',
      category: 'Fıkıh',
      year: '2025',
      status: 'planned',
      icon: '⚖️',
      tags: ['Fıkıh', 'Modern', 'İçtihat'],
    },
    {
      id: 6,
      title: 'Sofi Şiir Antolojisi',
      description: 'Anadolu tasavvuf edebiyatından seçme şiirlerin derlenmesi ve şerhi.',
      category: 'Tasavvuf',
      year: '2023',
      status: 'completed',
      icon: '✍️',
      tags: ['Şiir', 'Tasavvuf', 'Edebiyat'],
    },
  ],
};

