// Contact Page Data - Clean Architecture: Domain/Data Layer
import { ContactPageData } from '@/types';

export const CONTACT_PAGE_DATA: ContactPageData = {
  title: 'İletişim',
  subtitle: 'BİZE ULAŞIN',
  description: 'Sorularınız, önerileriniz veya işbirliği talepleriniz için benimle iletişime geçebilirsiniz. Her mesajınız değerlidir.',
  formTitle: 'Mesaj Gönderin',

  contactInfo: [
    {
      id: 1,
      type: 'email',
      label: 'E-posta',
      value: 'iletisim@suleymankarakas.com',
      link: 'mailto:iletisim@suleymankarakas.com',
      icon: 'mail',
    },
    {
      id: 2,
      type: 'phone',
      label: 'Telefon',
      value: '+90 (212) 123 45 67',
      link: 'tel:+902121234567',
      icon: 'phone',
    },
    {
      id: 3,
      type: 'address',
      label: 'Adres',
      value: 'İstanbul, Türkiye',
      icon: 'location',
    },
    {
      id: 4,
      type: 'website',
      label: 'Web Sitesi',
      value: 'www.suleymankarakas.com',
      link: 'https://suleymankarakas.com',
      icon: 'globe',
    },
  ],

  socialLinks: [
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'X', url: 'https://x.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Facebook', url: 'https://facebook.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Spotify', url: 'https://open.spotify.com/' },
  ],

  // Sık Sorulan Sorular - Benim eklediğim özel özellik
  faq: [
    {
      id: 1,
      question: 'Kitaplarınızı nereden satın alabilirim?',
      answer: 'Kitaplarım tüm büyük kitapçılarda, online platformlarda (D&R, Idefix, Amazon, Kitapyurdu) ve kendi web sitemiz üzerinden satın alınabilir. Ayrıca dijital versiyonları e-kitap formatında da mevcuttur.',
    },
    {
      id: 2,
      question: 'Özel ders veya danışmanlık hizmeti veriyor musunuz?',
      answer: 'Zaman kısıtlamaları nedeniyle bireysel özel ders vermiyorum. Ancak online eğitim platformumuz üzerinden video dersler ve canlı yayın sohbetlerine katılabilirsiniz. Kurumsal danışmanlık talepleri için iletişime geçebilirsiniz.',
    },
    {
      id: 3,
      question: 'Programa, konferansa veya röportaja konuk olarak katılır mısınız?',
      answer: 'Evet, zamanım elverdiği ölçüde programlara, konferanslara ve röportajlara katılmaya çalışıyorum. Bu tür talepler için lütfen detaylı bilgi vererek iletişim formunu doldurun. Talebinizi değerlendirip en kısa sürede dönüş yapacağız.',
    },
    {
      id: 4,
      question: 'Kitaplarınızın basılı olmayan bölümleri veya yayımlanmamış yazılarınız var mı?',
      answer: 'Sosyal medya hesaplarım ve web sitemde düzenli olarak kısa yazılar, hikmetli sözler ve değerlendirmeler paylaşıyorum. Ayrıca bültenime abone olarak özel içeriklere ve yeni yayınlardan ilk siz haberdar olabilirsiniz.',
    },
    {
      id: 5,
      question: 'Eğitim programlarınıza nasıl kayıt olabilirim?',
      answer: 'Online eğitim platformumuz üzerinden kayıt olabilirsiniz. Yüz yüze eğitimler için İslami İlimler Akademisi\'nin web sitesini ziyaret edebilir veya iletişim numaralarımızdan detaylı bilgi alabilirsiniz.',
    },
    {
      id: 6,
      question: 'Mesajıma ne kadar sürede cevap alırım?',
      answer: 'Tüm mesajlar dikkatle okunmakta ve mümkün olan en kısa sürede yanıtlanmaktadır. Yoğunluğa bağlı olarak genellikle 3-5 iş günü içinde dönüş yapmaya çalışıyoruz. Acil konular için lütfen konu başlığında belirtin.',
    },
  ],

  newsletterTitle: 'Bültene Abone Olun',
  newsletterDescription: 'Yeni kitaplar, makaleler ve etkinliklerden ilk siz haberdar olun.',
};
