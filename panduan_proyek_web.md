# Panduan Proyek Website PT. Abbasy Anugerah Perkasa

Dokumen ini berisi panduan lengkap untuk instalasi, konfigurasi, dan standar desain pengembangan lanjutan untuk website perusahaan PT. Abbasy Anugerah Perkasa.

## 1. Instalasi & Menjalankan Website (Lokal)

Website ini dibangun menggunakan **React (Vite)**. Untuk menjalankannya di komputer Anda:
1. Pastikan Anda telah menginstal [Node.js](https://nodejs.org/).
2. Buka terminal/Command Prompt, lalu masuk ke folder proyek: `cd pt-abbasy`.
3. Instal semua dependensi dengan perintah: `npm install`
4. Jalankan server pengembangan lokal: `npm run dev`
5. Buka tautan `http://localhost:5173` di browser Anda.

## 2. Standar Arsitektur & Teknologi
- **Core**: React 18 + Vite
- **Routing**: React Router DOM v6
- **Animasi**: Framer Motion
- **SEO & Meta Tags**: React Helmet Async
- **CMS (Content Management System)**: Netlify CMS (Decap CMS)
- **Data Source**: Semua konten disimpan dalam format JSON di `src/content/data.json`.

## 3. Standarisasi Tampilan (Design System)

Untuk menjaga kualitas desain tingkat *Enterprise* yang elegan dan seragam, patuhi aturan berikut saat menambahkan halaman atau komponen baru:

### A. Palet Warna (Color Palette)
Gunakan variabel CSS yang sudah tersedia di `src/index.css`:
- `var(--color-primary)`: Navy Blue (Warna Utama untuk Header, Footer, Teks Gelap)
- `var(--color-accent)`: Orange (Untuk tombol, garis aksen, ikon sorotan)
- `var(--color-bg-light)`: Putih (Background utama)
- `var(--color-bg-subtle)`: Abu-abu Sangat Muda (Background selang-seling antar seksi)

### B. Aturan *Grand Header* (Header Halaman Internal)
Setiap halaman baru (selain Beranda) WAJIB menggunakan struktur *Grand Header* agar menyatu mulus dengan *Navbar* transparan:
1. Bungkus halaman dengan komponen `<PageWrapper title="Nama Halaman">`.
2. Tambahkan div `.page-header` dengan padding khusus:
```jsx
<div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
  <h1 style={{ color: 'white' }}>Judul Halaman</h1>
</div>
```
*(Padding atas 140px memastikan teks tidak tertutup oleh Navbar, sementara background birunya menyentuh langit-langit layar).*

### C. Navbar Kaca Es (Chameleon Glass)
Navbar dirancang bereaksi terhadap guliran (scroll):
- **Y < 50px**: Navbar 100% transparan, teks warna putih (cocok untuk berada di atas Hero/Grand Header biru).
- **Y > 50px**: Navbar berubah menjadi *Frosted White Glass* (`.navbar.scrolled`), teks berubah menjadi warna Navy agar kontras dengan latar belakang layar putih di bawahnya.

### D. Penyelarasan Teks (Text Alignment)
Website ini memiliki fitur global untuk mengatur perataan paragraf (Kiri, Tengah, Kanan, Justify) yang diatur langsung oleh Admin melalui CMS. Jika Anda membuat komponen paragraf panjang baru, jangan gunakan *hardcoded text-align*. 

## 4. Konfigurasi Netlify CMS & SEO

### Menambah Field Baru di CMS
Semua konfigurasi Admin (CMS) diatur di dalam `public/admin/config.yml`. Jika Anda menambah fitur/data baru:
1. Daftarkan skema inputnya di `config.yml`.
2. Data yang diketik Admin akan otomatis tersimpan di `src/content/data.json`.
3. Panggil data tersebut di file komponen `.jsx` yang bersangkutan.

### SEO (Search Engine Optimization)
Website ini telah terintegrasi dengan `react-helmet-async`. Pengaturan SEO (Title, Description, Keywords, Favicon) terpusat pada file `src/components/PageWrapper.jsx` yang menarik data langsung dari CMS. Jangan menghapus komponen `<HelmetProvider>` dari `src/App.jsx`.

## 5. Keamanan Halaman Admin (Git Gateway)
Halaman admin (`/admin`) dilindungi oleh Netlify Identity. Pendaftaran akun bersifat **tertutup (Invite Only)**. Untuk menambah Admin baru, pemilik website HARUS mengirimkan undangan (Invite) dari Dashboard Netlify -> menu **Identity**.
