# Panduan Proyek Website PT. Abbasy Anugerah Perkasa

Dokumen ini berisi panduan lengkap instalasi, konfigurasi, serta standarisasi pengembangan (UI/UX & Kode) untuk memastikan konsistensi jika ada penambahan fitur baru di masa depan.

## 1. Persyaratan Sistem
- Node.js (versi 18+ direkomendasikan)
- npm (ter-install bersama Node.js)
- Git (untuk push ke repository GitHub)

## 2. Instalasi dan Menjalankan Lokal

1. Buka terminal (PowerShell/CMD) di dalam folder proyek.
2. Install semua dependencies (pustaka):
   ```bash
   npm install
   ```
3. Jalankan development server lokal:
   ```bash
   npm run dev
   ```
4. Buka URL `http://localhost:5173` di browser Anda.

## 3. Konfigurasi Cloudflare Pages (Production)
Website ini di-hosting di **Cloudflare Pages**.
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Routing SPA & Cache:** Diatur menggunakan file `public/_redirects` dan `public/_headers`.
  - `_redirects` digunakan untuk memastikan semua rute yang tidak ditemukan akan dialihkan ke `index.html` (agar React Router berfungsi).
  - `_headers` sangat penting untuk memberitahu server agar tidak men-cache `index.html` sehingga pengunjung selalu mendapatkan versi terbaru.

## 4. Konfigurasi Decap CMS (Content Management)
Admin panel dapat diakses di `/manajemen-web`.
- Konfigurasi terletak di `public/manajemen-web/config.yml`.
- Menggunakan Github backend (repository `Lisan-20/pt-abbasy-web`).
- Semua perubahan di CMS akan otomatis di-commit ke branch `main`, yang akan memicu proses Build ulang di Cloudflare Pages (berlangsung sekitar 1-2 menit).
- **Fitur Blog & Artikel:** Dikelola penuh melalui CMS menggunakan Markdown. Artikel-artikel disimpan di dalam folder `src/content/articles/` dalam format `.json`. Rendering artikel dilakukan di halaman `BlogPost.jsx` menggunakan `react-markdown`.

---

## 5. Standarisasi Tampilan dan Pengembangan Kode

Untuk menjaga agar website ini tetap berkelas, premium, dan seragam, perhatikan standar berikut setiap kali **menambah fitur atau halaman baru**.

### A. Struktur Folder
- `src/components/`: Komponen UI yang dapat digunakan kembali (Navbar, Footer, Button, FloatingWhatsApp).
- `src/pages/`: Halaman utama aplikasi (DynamicPage, NotFound, BlogIndex, BlogPost).
- `src/content/`: Berisi `data.json` dan folder `articles/` untuk data dari CMS.
- `src/index.css`: File styling utama yang menampung variabel CSS global.

### B. Standarisasi UI & Warna
- Selalu gunakan variabel CSS bawaan, jangan hard-code warna!
  - `var(--color-primary)` : Warna dasar branding (Biru Dongker / #0A192F).
  - `var(--color-accent)` : Warna tombol/aksen utama (Jingga / #FF7A00).
- **Background Section**: Gunakan variasi transparan atau gradien halus. Contoh: `background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3a5c 100%)'`.
- **Typografi**: Heading gunakan bobot font tebal (`fontWeight: 700` atau `800`). Jika berada di atas background gelap, PASTIKAN mengatur warna text heading menjadi `#ffffff` secara eksplisit agar tidak bertabrakan dengan CSS global. Paragraph gunakan warna sedikit pudar untuk kontras (`color: 'rgba(255,255,255,0.7)'` di atas background gelap).

### C. Animasi (Framer Motion)
Selalu gunakan **Framer Motion** untuk efek masuk (*entrance animation*) agar website tidak kaku.
Gunakan *pattern* ini untuk *scroll animation* (elemen muncul saat di-scroll):
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6 }}
>
  Konten Anda di sini
</motion.div>
```
*Catatan:* Hindari menggunakan `framer-motion` untuk komponen yang melayang terus menerus (`position: fixed`) seperti *Floating WhatsApp*, karena rawan menyebabkan layout-thrashing dan error tak terduga (terutama di iOS). Gunakan CSS biasa (keyframes / transition) untuk elemen mengambang.

### D. Fitur Self-Healing (Anti-Cache)
Website ini dilengkapi sistem "Self-Healing" yang ditempatkan langsung di dalam `<head>` file `index.html`. Skrip ini berfungsi untuk mereload halaman dengan parameter `?v=timestamp` (Cache Buster) jika mendeteksi *MIME type error* yang diakibatkan oleh *stale cache* (cache memori basi) yang sangat agresif dari CDN Cloudflare.
- **Jangan hapus skrip window.addEventListener('error') di index.html** jika Anda sedang melakukan modifikasi root HTML.

### E. Penamaan & Routing
- Komponen baru harus ditulis dengan `PascalCase` (contoh: `StatsCounter.jsx`).
- Rute baru harus didaftarkan di dalam `<Routes>` di `App.jsx`.
- Urutan Tombol Menu (*Navigation*) dapat disesuaikan di Decap CMS. Ingat, tombol khusus (seperti "Hubungi Kami") disarankan selalu ditaruh paling bawah/paling akhir di pengaturan CMS agar secara visual berada paling kanan pada layar.

---

## 6. Integrasi Eksternal
- **WhatsApp API:** Format nomor WA harus berupa angka tanpa awalan `+` (contoh: `628123456789`). Nomor WA dapat diganti di Decap CMS pada bagian Contact Info.
- **Google SEO:** Tag meta diatur menggunakan `react-helmet-async` (di komponen pembungkus halaman). Gambar Open Graph (OG) di `index.html` dan `public/` direpresentasikan dalam format yang optimal.
