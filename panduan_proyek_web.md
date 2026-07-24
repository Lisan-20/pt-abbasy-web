# Panduan Proyek Web PT. Abbasy Anugerah Perkasa

Dokumen ini berisi panduan teknis, tata cara instalasi, konfigurasi, serta standarisasi desain untuk proyek *website* perusahaan PT. Abbasy Anugerah Perkasa. Dokumen ini ditujukan bagi *developer* yang akan melanjutkan, merawat, atau menambahkan fitur baru di masa depan agar tetap seragam dan sesuai standar korporat.

---

## 1. Spesifikasi Teknologi
Proyek ini dibangun menggunakan arsitektur **Jamstack** (Static Site Generation / SPA) untuk performa maksimal dan keamanan tingkat tinggi.
- **Framework Utama**: React (Vite)
- **Styling**: Vanilla CSS (tanpa Tailwind) dengan implementasi *CSS Variables*.
- **CMS (Content Management System)**: Netlify CMS / Decap CMS (Git-based).
- **Backend / Database**: File `data.json` statis (Tidak memakai MySQL/PHP tradisional).
- **Deploy & Hosting**: Netlify dengan GitHub Actions CI/CD (Bypass).

---

## 2. Instalasi & Menjalankan Proyek Secara Lokal

Jika Anda baru pertama kali memegang proyek ini, ikuti langkah berikut untuk menjalankannya di komputer (Localhost).

### Prasyarat
- **Node.js** (Minimal Versi 20.x ke atas)
- **Git**

### Langkah Instalasi
1. Buka Terminal / Command Prompt.
2. Lakukan *clone* repositori dari GitHub:
   ```bash
   git clone https://github.com/Lisan-20/pt-abbasy-web.git
   ```
3. Masuk ke dalam direktori proyek:
   ```bash
   cd pt-abbasy-web
   ```
4. Pasang semua dependensi modul:
   ```bash
   npm install
   ```
5. Jalankan *server* pengembangan lokal:
   ```bash
   npm run dev
   ```
6. Buka URL `http://localhost:5173` di *browser* Anda.

---

## 3. Konfigurasi Sistem CI/CD & Bypass Kuota Netlify

Proyek ini telah direkayasa untuk menggunakan **GitHub Actions** sebagai mesin perakit utama guna menghindari limit 300 menit gratis dari Netlify.

### Cara Kerjanya:
Setiap kali Klien melakukan pembaruan di Halaman Admin CMS, CMS akan membuat *commit* baru ke GitHub. GitHub Actions (`.github/workflows/deploy.yml`) akan aktif secara otomatis, merakit kode (Vite Build) menggunakan mesin GitHub, dan mengirim hasil akhirnya ke Netlify (melalui Netlify CLI) tanpa menyita satu menit pun kuota perakitan Netlify.

### Kunci Rahasia GitHub Actions (Secrets)
Agar mesin GitHub bisa menembak (*deploy*) hasil jadinya ke Netlify, diwajibkan untuk mendaftarkan 2 Kunci Rahasia di dalam menu **Settings -> Secrets and variables -> Actions** pada repositori GitHub:
- `NETLIFY_SITE_ID`: Berisi Site ID dari *website* Netlify yang bersangkutan.
- `NETLIFY_AUTH_TOKEN`: Berisi *Personal Access Token* milik akun pengguna Netlify.

> [!WARNING]  
> Pastikan fitur **Auto Publishing / Continuous Deployment** di *dashboard* Netlify dalam keadaan **STOP / MATI**. Jika dibiarkan menyala, Netlify dan GitHub akan bekerja secara paralel dan menghabiskan kuota Netlify secara percuma.

---

## 4. Standarisasi Tampilan (Design Guidelines)

Agar desain *website* tetap seragam saat Anda membuat komponen, seksi (*section*), atau halaman baru, **Wajib** mematuhi aturan berikut ini.

### A. Palet Warna (CSS Variables)
Warna utama perusahaan telah didefinisikan secara baku di dalam berkas `src/index.css`. Selalu gunakan variabel ini, JANGAN menulis kode *Hex Color* secara paksa agar mode tema selalu sinkron!

```css
:root {
  --primary-blue: #0b1e36; /* Warna utama untuk Background & Header/Footer */
  --secondary-orange: #ff7b00; /* Warna aksen/sorotan untuk Tombol & Ikon */
  --text-dark: #333333; /* Warna teks pada latar belakang terang */
  --text-light: #ffffff; /* Warna teks utama pada latar belakang gelap */
  --bg-light: #f4f7f6; /* Latar belakang abu-abu terang (seksi selang-seling) */
}
```

### B. Aturan Tipografi & Jarak Pembacaan
- **Font Utama**: `Inter`, `sans-serif`. Jangan gunakan *font* dekoratif.
- *Heading* (H1, H2, H3) selalu dicetak tebal (*bold*, `700`) dengan *line-height* rapat (`1.2`) agar gagah.
- Teks Paragraf deskriptif selalu di-*setting* menggunakan `text-align: justify` (Rata Kanan-Kiri) dan *line-height* lebar (`1.6`) agar nyaman dibaca.

### C. Pembuatan Struktur Komponen Baru
1. **Pembuatan File**: Komponen baru harus dipisahkan menjadi `.jsx` dan `.css` di dalam folder `src/components/`.
2. **Ruang Napas (Padding & Spasi) - SANGAT PENTING**:
   Seluruh tepi layar *website* sudah dilindungi dari "Teks Menempel di Layar" dengan teknik *Clamp Responsive*. 
   Saat membuat pembungkus (Container) baru, wajib gunakan kode ini pada CSS-nya:
   ```css
   .nama-komponen-section {
     padding: 4rem clamp(1.5rem, 5vw, 4rem);
   }
   ```
   *Penjelasan: Margin atas bawah 4rem, Margin kiri kanan dinamis (Mengecil otomatis di layar HP, Melebar otomatis di layar Desktop).*
3. **Tombol (Buttons)**:
   Tombol baru harus menggunakan kelas standar bawaan yaitu `.btn`. Kelas ini sudah dilengkapi sudut melengkung sempurna (`border-radius: 30px`) dan efek transisi yang elegan.
   Contoh: `<a href="#" className="btn">Baca Selengkapnya</a>`

### D. Penanganan Gambar & Media (Image Fallback)
Netlify CMS memiliki sifat di mana ketika pengguna menghapus gambar pertama dari urutan galeri, indeks `[0]` akan menghasilkan *null* ketimbang bergeser.
- Jika membuat penarik Galeri/Portofolio, **selalu gunakan fungsi perulangan (looping fallback)** untuk mencari gambar pertama yang `true` dan abaikan yang `null`.
- Gambar harus selalu dikawal dengan `object-fit: cover` untuk mencegah gepeng (*distorted*) di layar perangkat genggam.

---

## 5. Tata Cara Modifikasi Halaman Admin (CMS)

Halaman Admin (`/admin`) sepenuhnya dikendalikan oleh berkas YML statis, bukan kode React.

- **Lokasi Pengaturan**: `public/admin/config.yml`
- **Lokasi Penyimpanan Data Akhir**: `src/content/data.json`

Jika Anda diminta membuat fitur baru, misalnya "Halaman Tim Kami", alur kerjanya adalah:
1. Daftarkan struktur kolom input (*Name*, *Foto*, *Jabatan*) di dalam `config.yml`.
2. Tunggu klien mengisi data tersebut melalui Halaman Admin.
3. CMS akan menuliskan data tersebut ke dalam `data.json`.
4. Tarik datanya di komponen React dari *file* `data.json` tersebut.

---
*Dokumen ini dibuat secara otomatis sebagai penutup fase perakitan utama proyek.*
