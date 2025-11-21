# Fethiye Tango Kulübü Landing

Modern SCSS + HTML + JS landing sayfası. Yapı; temel değişken/mixin katmanı, base kuralları, komponent SCSS dosyaları ve küçük bağımsız JS modülleri ile ölçeklenebilir olacak şekilde tasarlandı.

## Mimari Özeti

- `src/scss/abstracts`: tasarım token’ları (`_variables.scss`) ve mixin’ler (`_mixins.scss`).
- `src/scss/base`: reset, global, tipografi kuralları.
- `src/scss/layout`: `l-section`, `l-shell`, grid yardımcıları.
- `src/scss/pages|themes|vendor`: sayfa spesifik, tema ve üçüncü parti override katmanları.
- `src/scss/utilities`: erişilebilirlik, animasyon, yardımcı sınıflar.
- `src/components/<component>`: her component kendi `scss`, `js`, `README` eşliğinde (header, hero, content-card, contact vb.).
- `src/js/utils`: dom yardımcıları ve event delegation.
- `src/js/main.js`: tüm component init fonksiyonlarını sırayla tetikler.
- `index.html`: skip-link, semantik bölümler, modal template ve data-attributeleri ile progressive enhancement.

### Son Güncellemeler

- Hero/program/atölye/iletişim bölümleri yeniden yazıldı, responsive grid yerleşimleri ve içerik blokları eklendi.
- Navigasyon menüsü `data-state` destekli, breakpoint değişiminde kapanan erişilebilir toggler’a taşındı.
- Modal form focus trap, honeypot, hata mesajları ve simüle submit bildirimiyle modüler hale getirildi.
- SCSS reset/global katmanı sadeleştirildi; komponentler tasarım token’larıyla tutarlı kullanılıyor.
- Her component kendi SCSS/JS/README kombinasyonu ile `src/components` altına taşındı; main giriş noktası bu init fonksiyonlarını orkestre ediyor.
- Hero görseli için `build:images` script’i AVIF/WEBP/JPEG formatlarında 640/960/1440px varyantlar üretir, `<picture>` ile otomatik seçilir.
- `vite.config.js` artık root `index.html` üzerinden build alıyor, legacy plugin kaldırıldı.

## Kurulum

```bash
npm install
npm run build:images   # hero görsel varyantlarını üretir
```

## Lokal Geliştirme

```bash
npm run dev
```

## Production Build

```bash
npm run build      # Vite build
npm run build:images
```

## Preview

```bash
npm run preview
```

## Doğrulama Adımları

- `npm run build` — Vite prod bundle (SCSS import zinciri + JS modülleri) sorunsuz tamamlanır.
- Oluşan `dist/index.html` ve `dist/assets` çıktısı Pages/hosting hedefiyle uyumlu.
- Modal formu aç/kapat, Escape ile çıkış, menü toggle, form validasyonu gibi temel etkileşimler manuel olarak test edildi (Chrome 130, Safari 18).