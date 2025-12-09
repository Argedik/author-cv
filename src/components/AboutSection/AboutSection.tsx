"use client";

import Image from 'next/image';
import { AboutSectionProps } from '@/types';
import styles from './AboutSection.module.scss';

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className={styles.aboutSection}>

      <div className={styles.container}>
        {/* Sol taraf - Resim */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            {/* Resim - şimdilik error versin, src kullanıcı ekleyecek */}
            {data.backgroundImage ? (
              <Image
                src={data.backgroundImage}
                alt={data.title}
                width={400}
                height={500}
                className={styles.authorImage}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder}>
                <span>Resim buraya gelecek</span>
              </div>
            )}
          </div>
        </div>

        {/* Sağ taraf - Metin içeriği */}
        <div className={styles.contentColumn}>
          <div className={styles.titleArea}>
            <div className={styles.titleDecor}>
              <span className={styles.decorLine}></span>
              <span className={styles.decorDiamond}>◆</span>
              <span className={styles.decorLine}></span>
            </div>
            <h1 className={styles.title}>{data.title}</h1>
            <h2 className={styles.subtitle}>{data.subtitle}</h2>
          </div>

          <div className={styles.description}>
            {data.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Alıntı */}
          <blockquote className={styles.quote}>
            <div className={styles.quoteOrnament}>❦</div>
            <p className={styles.quoteText}>{data.quote}</p>
            <cite className={styles.quoteAuthor}>— {data.quoteAuthor}</cite>
          </blockquote>

          {/* İmza */}
          <div className={styles.signature}>
            <div className={styles.signatureLine}></div>
            <span className={styles.signatureText}>Süleyman Karakaş</span>
            <div className={styles.signatureLine}></div>
          </div>
        </div>
      </div>

      {/* Alt kısım - Yazma İlkeleri */}
      <div className={styles.writingPrinciples}>
        <div className={styles.principlesHeader}>
          <h3 className={styles.principlesTitle}>Yazma İlkelerim</h3>
          <p className={styles.principlesSubtitle}>Her kelime, her satır, bir amaca hizmet eder</p>
        </div>

        <div className={styles.principlesGrid}>
          {/* Mürekkep Hokkası - İlkeler */}
          <div className={styles.principleItem}>
            <div className={styles.principleIcon}>
              <div className={styles.inkwell}>
                <div className={styles.inkwellBody}>
                  <div className={styles.inkwellTop}></div>
                  <div className={styles.inkwellInk}></div>
                </div>
                <div className={styles.inkwellShadow}></div>
              </div>
            </div>
            <h4 className={styles.principleTitle}>Özen ve Dikkat</h4>
            <p className={styles.principleText}>
              Her kelime, bir damla mürekkep gibi değerlidir. 
              Yazarken her harfe özen gösteririm, çünkü kelimeler kalıcıdır.
            </p>
          </div>

          {/* Kalem - İlkeler */}
          <div className={styles.principleItem}>
            <div className={styles.principleIcon}>
              <div className={styles.pen}>
                <div className={styles.penBody}></div>
                <div className={styles.penNib}></div>
                <div className={styles.penShadow}></div>
              </div>
            </div>
            <h4 className={styles.principleTitle}>Sadelik ve Netlik</h4>
            <p className={styles.principleText}>
              Kalem, düşüncelerin tercümanıdır. 
              Karmaşık fikirleri sade ve anlaşılır bir dille aktarmak en büyük sanattır.
            </p>
          </div>

          {/* Kağıt - İlkeler */}
          <div className={styles.principleItem}>
            <div className={styles.principleIcon}>
              <div className={styles.paper}>
                <div className={styles.paperSheet}>
                  <div className={styles.paperLines}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={styles.paperLine}></div>
                    ))}
                  </div>
                  <div className={styles.paperText}>
                    <div className={styles.writingAnimation}></div>
                  </div>
                </div>
                <div className={styles.paperShadow}></div>
              </div>
            </div>
            <h4 className={styles.principleTitle}>Süreklilik</h4>
            <p className={styles.principleText}>
              Boş sayfa, sonsuz olasılıkların başlangıcıdır. 
              Her gün yazmak, her gün öğrenmek, her gün ilerlemek.
            </p>
          </div>

          {/* Kitap - İlkeler */}
          <div className={styles.principleItem}>
            <div className={styles.principleIcon}>
              <div className={styles.book}>
                <div className={styles.bookCover}>
                  <div className={styles.bookSpine}></div>
                </div>
                <div className={styles.bookShadow}></div>
              </div>
            </div>
            <h4 className={styles.principleTitle}>Bilgi ve Hikmet</h4>
            <p className={styles.principleText}>
              Her kitap, bir yolculuktur. 
              Kadim bilgeliği bugüne taşımak, geleceğe köprü kurmaktır.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
