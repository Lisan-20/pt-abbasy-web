# Panduan Proyek Web: PT Abbasy Anugerah Perkasa

Dokumen ini adalah cetak biru (*blueprint*) dan panduan teknis untuk *website* PT Abbasy Anugerah Perkasa. Gunakan panduan ini sebagai referensi utama saat melakukan instalasi, konfigurasi, atau penambahan fitur baru agar standar desain tetap terjaga.

## 1. Instalasi & Konfigurasi Lokal

Proyek ini dibangun menggunakan **React (Vite)** dan **Netlify CMS** (Git Gateway).

### Prasyarat
- Node.js (Versi 20 atau terbaru)
- Git

### Langkah Instalasi
1. Kloning repositori:
   ```bash
   git clone https://github.com/Lisan-20/pt-abbasy-web.git
   cd pt-abbasy-web
   ```
2. Instal pustaka (*dependencies*):
   ```bash
   npm install
   ```
3. Jalankan *server* pengembangan lokal:
   ```bash
   npm run dev
   ```
4. Buka di *browser*: `http://localhost:5173`

### Konfigurasi Netlify CMS (Admin)
- Halaman admin dapat diakses di `https://abbasyanugerahperkasa.com/admin/`.
- CMS terhubung langsung ke repositori GitHub melalui fitur **Git Gateway** di Netlify.
- Jika terjadi *error* CORS atau penolakan API saat login, solusinya adalah masuk ke *Dashboard* Netlify > **Site Configuration** > **Identity** > **Services** > **Git Gateway** -> Nonaktifkan (*Disable*) lalu Aktifkan kembali (*Enable*) untuk menyegarkan token GitHub.

---

## 2. Standarisasi Tampilan (Design System)

Agar *website* tetap terlihat seragam, modern, dan profesional, patuhi aturan desain berikut saat membuat komponen atau halaman baru:

### A. Palet Warna Utama
- **Biru Korporat (Primary)**: `var(--color-primary)` atau `#1A2B4C` — Gunakan untuk warna *header*, teks tebal, dan latar belakang utama.
- **Oranye Aksen (Accent)**: `var(--color-accent)` atau `#FF7F00` — Gunakan untuk tombol, sorotan teks, garis bawah, atau elemen panggilan bertindak (*Call to Action*).
- **Putih Tulang (Background)**: `#F4F7F6` — Gunakan untuk latar belakang halaman di sela-sela area biru.

### B. Bantalan Logo Navbar
Logo pada *Navbar* telah diatur sedemikian rupa agar tetap terlihat tajam (*tidak pecah*).
Jika warna *Navbar* sedang gelap (berada di atas), logo otomatis dibungkus dengan latar belakang putih (`.logo-img-wrapper`). Jangan mengubah aturan `height: 75px` pada logo agar resolusinya tetap maksimal.

### C. Efek "Bentuk Geometri Melengkung" (Corporate Geometric)
Untuk memberikan kesan modern pada bagian latar belakang (*background*):
1. Setiap kali membuat bagian/seksi baru (`<section>`), tambahkan kelas `geometric-bg`.
   Contoh: `<section className="section geometric-bg bg-right">`
2. Gunakan `bg-left` atau `bg-right` untuk menentukan dari arah mana gradasi geometri biru tersebut muncul (bergantian kiri dan kanan antar *section* agar dinamis).

### D. Tipografi
- Jenis Huruf: **Montserrat** (Google Fonts).
- Judul (`h1`, `h2`): Berat `700` atau `800`.
- Teks Paragraf (`p`): Berat `400` atau `500` dengan `line-height: 1.8` agar mudah dibaca.

### E. Struktur Komponen
Selalu gunakan komponen `PageWrapper` untuk halaman baru agar mendapatkan manfaat berikut:
1. Layar otomatis terguling ke atas (*scroll to top*) saat halaman dibuka.
2. Animasi transisi yang halus saat berpindah halaman.
3. Mendapatkan injeksi otomatis untuk SEO dan Meta Tags.

Contoh kerangka halaman baru:
```jsx
import React from 'react';
import PageWrapper from '../components/PageWrapper';

const HalamanBaru = () => {
  return (
    <PageWrapper title="Halaman Baru">
      <div className="container">
        <h1>Konten Halaman</h1>
      </div>
    </PageWrapper>
  );
};
export default HalamanBaru;
```

---

## 3. Panduan SEO (Search Engine Optimization)

*Website* ini telah dioptimasi penuh untuk Google:
- **Peta Situs (Sitemap)**: Terletak di `public/sitemap.xml`. Jika Anda menambahkan rute halaman baru, pastikan untuk mendaftarkannya juga di dalam file ini.
- **JSON-LD (Data Terstruktur)**: Identitas perusahaan (Alamat, Nomor Telepon) disuntikkan secara dinamis di `PageWrapper.jsx`. Jika ada perubahan alamat perusahaan, ubah langsung di file `src/content/data.json` atau melalui Panel Admin.
- **Pencegatan 404 (React SPA)**: Di *GitHub Actions*, terdapat perintah untuk menyalin `index.html` menjadi `404.html`. Ini sangat krusial. **Jangan menghapus perintah ini**, atau fitur muat ulang (*Refresh*) halaman akan menghasilkan tulisan *File Not Found*.

---
*Dokumen ini dibuat secara otomatis sebagai referensi teknis pemeliharaan.*
