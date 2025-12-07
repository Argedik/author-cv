// Contact Page Data - Clean Architecture: Domain/Data Layer

export const CONTACT_PAGE_DATA = {
  title: 'İletişim',
  subtitle: 'Benimle iletişime geçin',
  description: 'Sorularınız, önerileriniz veya işbirliği teklifleri için benimle iletişime geçebilirsiniz',
  form: {
    name: {
      label: 'Ad Soyad',
      placeholder: 'Adınızı ve soyadınızı girin',
      error: 'Ad soyad gereklidir',
    },
    email: {
      label: 'E-posta',
      placeholder: 'E-posta adresinizi girin',
      error: 'Geçerli bir e-posta adresi girin',
    },
    subject: {
      label: 'Konu',
      placeholder: 'Mesaj konusunu girin',
      error: 'Konu gereklidir',
    },
    message: {
      label: 'Mesaj',
      placeholder: 'Mesajınızı buraya yazın',
      error: 'Mesaj gereklidir',
    },
    submit: 'Gönder',
    sending: 'Gönderiliyor...',
    success: 'Mesajınız başarıyla gönderildi!',
    error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
  },
  contactInfo: {
    email: {
      label: 'E-posta',
      value: 'iletisim@example.com',
    },
    phone: {
      label: 'Telefon',
      value: '+90 (XXX) XXX XX XX',
    },
    address: {
      label: 'Adres',
      value: 'İstanbul, Türkiye',
    },
    social: {
      label: 'Sosyal Medya',
      links: [
        { name: 'LinkedIn', url: '#' },
        { name: 'Twitter', url: '#' },
        { name: 'GitHub', url: '#' },
        { name: 'Instagram', url: '#' },
      ],
    },
  },
};

