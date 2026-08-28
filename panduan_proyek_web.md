# Panduan Proyek Web — PT. Abbasy Anugerah Perkasa

> **Dokumen Versi:** Final (Juli 2026)  
> **Dibuat oleh:** Tim Pengembang Web  
> **URL Produksi:** https://abbasyanugerahperkasa.com  
> **Repositori GitHub:** https://github.com/Lisan-20/pt-abbasy-web

Dokumen ini adalah **panduan teknis tunggal dan resmi** untuk seluruh proses pengembangan website PT. Abbasy Anugerah Perkasa. Setiap pengembang atau agen AI yang mengerjakan proyek ini **WAJIB** membaca dokumen ini sebelum melakukan perubahan apapun, agar tampilan dan sistem tetap seragam.

---

## Daftar Isi
1. [Arsitektur & Stack Teknologi](#1-arsitektur--stack-teknologi)
2. [Instalasi & Menjalankan Secara Lokal](#2-instalasi--menjalankan-secara-lokal)
3. [Struktur Folder Proyek](#3-struktur-folder-proyek)
4. [Standarisasi Tampilan UI/UX](#4-standarisasi-tampilan-uiux)
5. [Sistem Manajemen Konten (Decap CMS)](#5-sistem-manajemen-konten-decap-cms)
6. [Sistem Caching & Stabilitas (PENTING!)](#6-sistem-caching--stabilitas-penting)
7. [SEO & Structured Data](#7-seo--structured-data)
8. [Alur Deployment (GitHub → Cloudflare)](#8-alur-deployment-github--cloudflare)
9. [Panduan Menambah Fitur Baru](#9-panduan-menambah-fitur-baru)
10. [Master Changelog & Pencapaian](#10-master-changelog--pencapaian)

---

## 1. Arsitektur & Stack Teknologi

| Kategori | Teknologi |
|---|---|
| **Framework Frontend** | React.js 18 + Vite 8 |
| **Routing** | React Router DOM v7 (HashRouter) |
| **Animasi** | Framer Motion |
| **Styling** | Vanilla CSS (per komponen) |
| **Manajemen Konten** | Decap CMS (Git-based Headless CMS) |
| **Hosting** | Cloudflare Pages |
| **CI/CD** | GitHub Actions (auto-deploy saat push ke `main`) |
| **Repositori** | GitHub (`Lisan-20/pt-abbasy-web`) |

> **Catatan Penting (HashRouter):** Website ini menggunakan `HashRouter`, bukan `BrowserRouter`. Artinya URL di browser akan terlihat seperti `https://abbasyanugerahperkasa.com/#/tentang`. Ini adalah pilihan arsitektur yang disengaja untuk kompatibilitas sempurna dengan Cloudflare Pages (menghindari masalah 404 saat halaman di-refresh). **Jangan mengubah ini ke BrowserRouter.**

---

## 2. Instalasi & Menjalankan Secara Lokal

### Prasyarat
- **Node.js** versi 18+ (Gunakan versi LTS terbaru)
- **Git** terinstal di sistem

### Langkah Instalasi

**Langkah 1 — Kloning repositori:**
```bash
git clone https://github.com/Lisan-20/pt-abbasy-web.git pt-abbasy
cd pt-abbasy
```

**Langkah 2 — Instal dependensi:**
```bash
npm install
```

**Langkah 3 — Jalankan server pengembangan lokal:**
```bash
npm run dev
```
Website akan berjalan di `http://localhost:5173`.

**Langkah 4 — Build untuk produksi (opsional):**
```bash
npm run build
```
Hasil build akan tersimpan di folder `dist/`. Tidak perlu dijalankan secara manual karena Cloudflare Pages menjalankan ini otomatis setiap kali ada push ke GitHub.

### Mengakses CMS secara Lokal (Decap CMS)

Untuk menguji perubahan data CMS tanpa harus push ke GitHub:
1. Buka terminal terpisah, jalankan proxy CMS lokal:
   ```bash
   npx decap-server
   ```
2. Buka URL CMS di browser: `http://localhost:5173/manajemen-web/`

---

## 3. Struktur Folder Proyek

```
pt-abbasy/
├── public/
│   ├── _headers          ← Aturan cache Cloudflare (JANGAN DIUBAH!)
│   ├── _redirects        ← Aturan redirect Cloudflare
│   ├── favicon.png       ← Ikon website
│   ├── robots.txt        ← Izin akses untuk bot Google
│   ├── sitemap.xml       ← Peta halaman untuk SEO
│   ├── uploads/          ← Folder semua gambar yang diupload via CMS
│   └── manajemen-web/
│       └── config.yml    ← Konfigurasi utama Decap CMS
├── src/
│   ├── components/       ← Semua komponen React yang dapat digunakan ulang
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx / Hero.css
│   │   ├── Gallery.jsx
│   │   ├── Portfolio.jsx
│   │   └── ...
│   ├── content/
│   │   └── data.json     ← SUMBER DATA UTAMA (dikelola Decap CMS)
│   ├── context/
│   │   └── DataContext.jsx ← Provider data global untuk seluruh aplikasi
│   ├── pages/            ← Halaman-halaman utama website
│   │   ├── DynamicPage.jsx
│   │   ├── BlogIndex.jsx
│   │   ├── BlogPost.jsx
│   │   └── ...
│   ├── App.jsx           ← Routing utama aplikasi
│   └── index.css         ← Variabel CSS global & reset styles
├── index.html            ← Entry point HTML (berisi SEO meta tags)
├── vite.config.js        ← Konfigurasi Vite (JANGAN DIUBAH bagian chunk!)
└── panduan_proyek_web.md ← Dokumen ini
```

---

## 4. Standarisasi Tampilan UI/UX

> **ATURAN MUTLAK:** Seluruh tampilan fitur baru WAJIB mengikuti panduan di bawah ini tanpa pengecualian. Desain yang menyimpang dari standar ini akan merusak keseragaman visual website.

### 4.1 Palet Warna

Variabel warna sudah didefinisikan di `src/index.css`. **Selalu gunakan variabel CSS, jangan hardcode nilai hex secara langsung.**

```css
:root {
  --color-primary: #0A192F;      /* Biru Gelap — Background utama, navbar, footer */
  --color-accent:  #FF7A00;      /* Oranye — Tombol, highlight, ikon, hover */
  --color-light:   #F8FAFC;      /* Abu-abu sangat terang — Background section terang */
  --color-text-dark: #333333;    /* Teks di atas latar terang */
  --color-text-light: #E2E8F0;   /* Teks di atas latar gelap */
}
```

### 4.2 Tipografi (Font)

- **Font Family:** Sans-Serif modern (Inter, Roboto, atau font bawaan sistem)
- **Heading 1 (`h1`):** Besar & Bold — Khusus judul banner/hero section
- **Heading 2 (`h2`):** Judul setiap section (contoh: "Layanan Kami")
- **Paragraf (`p`):** `16px`–`18px`, `line-height: 1.6`–`1.8`

### 4.3 Komponen Standar

**Tombol (Button):**
```css
/* Tombol Utama */
background-color: var(--color-accent);
color: white;
border-radius: 6px;
padding: 12px 28px;
transition: transform 0.3s ease, box-shadow 0.3s ease;
/* Hover: */
transform: scale(1.05);
box-shadow: 0 8px 20px rgba(255, 122, 0, 0.3);
```

**Kartu Konten di Latar Gelap:**
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: 12px;
/* Hover: kartu naik sedikit */
transform: translateY(-6px);
```

**Kartu Konten di Latar Terang:**
```css
background: white;
border-radius: 12px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
/* Hover: bayangan lebih dalam */
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
```

### 4.4 Navbar

- Warna transparan di bagian atas halaman, teks putih
- Saat di-scroll: Background berubah menjadi **putih solid** (`#FFFFFF`), teks berubah ke `var(--color-primary)`
- Di layar HP (`max-width: 1400px`): Berubah menjadi ikon garis tiga (hamburger menu) yang membuka panel dari kanan
- **Warna teks di panel mobile selalu putih** — bahkan saat halaman dalam kondisi di-scroll

### 4.5 Animasi (Framer Motion)

Semua elemen konten harus menggunakan animasi masuk yang konsisten saat di-scroll:
```jsx
// Pola animasi standar yang digunakan di seluruh proyek
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 }
};

// Contoh pemakaian:
<motion.div {...fadeInUp}>
  Konten Anda di sini
</motion.div>
```

---

## 5. Sistem Manajemen Konten (Decap CMS)

### Cara Kerja Sistem

```
Admin membuka /manajemen-web/ → Login via GitHub OAuth
→ Edit konten melalui antarmuka GUI
→ Decap CMS commit ke src/content/data.json di GitHub
→ Cloudflare Pages otomatis build & deploy ulang
→ Website live diperbarui (±1 menit)
```

### Sumber Data Utama

File `src/content/data.json` adalah **sumber kebenaran tunggal (Single Source of Truth)** untuk seluruh teks, gambar, dan konfigurasi yang dapat diubah. **DILARANG menulis teks secara statis (hardcode) di dalam file `.jsx`.**

### Menambahkan Field CMS Baru

Jika fitur baru membutuhkan konten yang bisa diatur dari dashboard:
1. Buka `public/manajemen-web/config.yml`
2. Tambahkan definisi field baru di dalam koleksi yang relevan
3. Pasang pembacaan data tersebut di komponen `.jsx` via `DataContext`
4. Push ke GitHub — field baru langsung aktif di dashboard admin

### Mengakses Dashboard Admin

- **URL Produksi:** `https://abbasyanugerahperkasa.com/manajemen-web/`
- **Metode Login:** Akun GitHub yang terdaftar sebagai contributor di repositori

---

## 6. Sistem Caching & Stabilitas (PENTING!)

> ⚠️ **PERHATIAN KRITIS:** Website ini pernah mengalami masalah *blank page* yang disebabkan oleh konflik caching antara Cloudflare dan browser. Sistem perlindungan berikut telah diterapkan secara permanen. **DILARANG KERAS mengubah atau menghapus konfigurasi ini.**

### 3 Lapis Perlindungan Anti-Blank-Page

**Lapis 1 — `public/_headers` (Cloudflare):**
```
/*
  Cache-Control: no-cache, no-store, must-revalidate   ← HTML tidak boleh di-cache
/assets/*
  Cache-Control: public, max-age=31536000, immutable   ← Aset JS/CSS di-cache selamanya
```

**Lapis 2 — `vite.config.js` (Nama File Statis):**
- Chunk hashing standar Vite telah **dinonaktifkan**
- Output selalu bernama `index.js` dan `index.css` (tidak ada hash acak)
- Cache-buster berupa timestamp dinamis ditambahkan saat build: `index.js?v=1234567890`
- Efek: Browser selalu dapat menemukan file JS/CSS — tidak pernah 404

**Lapis 3 — `index.html` (Auto-Reload Darurat):**
- Script murni JavaScript di `<head>` bertugas mendeteksi kegagalan load script
- Jika gagal, secara otomatis melakukan Hard Refresh dengan cache-buster baru
- Ini adalah jaring pengaman terakhir jika dua lapis di atas gagal

---

## 7. SEO & Structured Data

### Meta Tags (di `index.html`)

Semua meta tag SEO ada di `index.html` dan sudah dikonfigurasi dengan benar:
- `<title>` — Judul halaman di tab browser dan Google
- `<meta name="description">` — Deskripsi singkat untuk Google
- `<meta property="og:*">` — Preview saat link dibagikan di media sosial
- `<link rel="icon">` — Favicon website

### Structured Data (Schema.org)

Website ini menggunakan **dua blok JSON-LD** yang krusial untuk tampilan di Google:

**1. WebSite Schema** — Digunakan Google untuk menampilkan nama situs (bukan domain mentah) di atas URL hasil pencarian:
```json
{
  "@type": "WebSite",
  "name": "PT Abbasy Anugerah Perkasa",
  "potentialAction": { ... }  ← WAJIB ADA agar Google memvalidasi nama situs
}
```

**2. Organization Schema** — Digunakan Google untuk menampilkan informasi perusahaan di Knowledge Panel (panel info di sebelah kanan hasil Google):
```json
{
  "@type": "Organization",
  "name": "PT Abbasy Anugerah Perkasa",
  "logo": "https://abbasyanugerahperkasa.com/uploads/logo_transparent.png",
  ...
}
```

### Memperbarui Indeksasi Google

Setiap kali ada perubahan konten penting atau perbaikan SEO, lakukan ini:
1. Buka **Google Search Console** (`search.google.com/search-console`)
2. Pilih properti `abbasyanugerahperkasa.com`
3. Masukkan URL halaman di kolom inspeksi URL
4. Klik **"Minta Pengindeksan"**

---

## 8. Alur Deployment (GitHub → Cloudflare)

Proses deployment berjalan **otomatis penuh** tanpa intervensi manual:

```
Developer/CMS edit kode / data
         ↓
    Push ke GitHub (branch: main)
         ↓
  Cloudflare Pages mendeteksi push
         ↓
  Menjalankan: npm run build
         ↓
  Hasil build di-deploy ke CDN global
         ↓
  Website live diperbarui (±1-2 menit)
```

### Konfigurasi Build di Cloudflare Pages
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node.js version:** 18+

---

## 9. Panduan Menambah Fitur Baru

Ikuti langkah-langkah berikut **secara berurutan** setiap kali ingin menambahkan halaman atau fitur baru:

### Menambah Halaman Baru

1. Buat file komponen di `src/pages/NamaHalaman.jsx`
2. Buat tampilan mengikuti standarisasi UI/UX di Bagian 4
3. Buka `src/App.jsx`, import komponen dan tambahkan route:
   ```jsx
   import NamaHalaman from './pages/NamaHalaman';
   // Di dalam <Routes>:
   <Route path="/nama-halaman" element={<NamaHalaman />} />
   ```
4. Tambahkan URL halaman ke `sitemap.xml` di folder `public/`
5. Tambahkan tautan di CMS (Navigation Menu) via `public/manajemen-web/config.yml`

### Menambah Section Baru di Halaman Utama

1. Buat komponen baru di `src/components/NamaSection.jsx`
2. Jika butuh CSS khusus, buat `src/components/NamaSection.css`
3. Ikuti aturan warna, font, dan animasi di Bagian 4
4. Import dan tambahkan komponen ke `src/App.jsx` atau halaman yang relevan
5. Jika ada teks/data yang perlu bisa diatur admin, tambahkan field di CMS

### Checklist Sebelum Push ke Produksi

- [ ] Tampilan di desktop terlihat rapi
- [ ] Tampilan di HP (mobile) terlihat rapi dan tidak ada yang terpotong
- [ ] Warna menggunakan variabel CSS yang sudah ada (bukan hardcode)
- [ ] Ada animasi Framer Motion untuk elemen baru
- [ ] Data teks/gambar dibaca dari `data.json`, bukan hardcode di `.jsx`
- [ ] Jalankan `npm run build` — pastikan tidak ada error
- [ ] Push ke GitHub dan tunggu Cloudflare selesai deploy

---

## 10. Master Changelog & Pencapaian

### Sesi Pengembangan (Juli 2026)

**Fitur & Perbaikan yang Telah Diselesaikan:**

| Tanggal | Deskripsi Perubahan |
|---|---|
| Jul 2026 | Setup awal proyek React + Vite, integrasi Decap CMS |
| Jul 2026 | Desain Navbar responsif dengan hamburger menu + dropdown |
| Jul 2026 | Integrasi Framer Motion untuk animasi scroll seluruh halaman |
| Jul 2026 | Pengaturan Footer (Tautan Cepat, Kontak, Peta) via CMS |
| Jul 2026 | Solusi permanen masalah blank page akibat caching Cloudflare |
| Jul 2026 | Perbaikan warna teks di hamburger menu saat pop-up foto dibuka di HP |
| Jul 2026 | Perbaikan warna dropdown text di mode mobile (teks tidak terbaca) |
| Jul 2026 | Penambahan schema `Organization` + `WebSite potentialAction` untuk SEO nama situs di Google |
| Jul 2026 | Setup `sitemap.xml` + `robots.txt` + Google Site Verification |
| Agu 2026 | Perbaikan tata letak (padding) pada Markdown Block agar tidak menempel ke tepi layar di HP |

**Standar Tata Letak Baru (Agustus 2026):**
> ⚠️ **Catatan Padding Container:** Semua komponen blok konten (seperti `markdownBlock`) yang dirender secara dinamis **WAJIB** menempatkan kelas `.container` pada elemen terdalam (*inner element*), bukan pada *wrapper* pembungkus jika *wrapper* tersebut menggunakan inline CSS `padding`. Hal ini untuk mencegah *override* pada `padding` kiri-kanan bawaan layar HP yang menyebabkan teks menempel di ujung layar.

**File-file Kritis yang Tidak Boleh Diubah Sembarangan:**

| File | Alasan |
|---|---|
| `vite.config.js` | Konfigurasi chunk statis anti-blank-page |
| `public/_headers` | Aturan caching Cloudflare |
| `index.html` | Script auto-reload + seluruh meta tag SEO |
| `src/content/data.json` | Sumber data utama — dikelola CMS |
| `public/manajemen-web/config.yml` | Skema/konfigurasi Decap CMS |
