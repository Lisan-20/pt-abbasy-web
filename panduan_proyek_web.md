# Panduan Proyek Website PT Abbasy Anugerah Perkasa

Dokumen ini berisi panduan teknis, langkah-langkah instalasi, hingga standar pengembangan (UI/UX) dari website PT Abbasy Anugerah Perkasa. 

Website ini dibangun menggunakan **React (Vite)** dan menggunakan **Decap CMS (sebelumnya Netlify CMS)** sebagai sistem Headless CMS.

---

## 1. Arsitektur Sistem

Website ini menggunakan pendekatan **Enterprise Page Builder** berbasis *Headless CMS*.
- **Tanpa Halaman Statis:** Semua halaman dibuat, diatur urutannya, dan diisi kontennya secara dinamis melalui Dasbor Admin.
- **Blok Modular:** Sistem merender halaman dengan menyusun blok-blok komponen (Lego) seperti `heroBlock`, `aboutBlock`, `servicesBlock`, `portfolioBlock`, dsb.
- **CMS:** Konfigurasi CMS diatur murni menggunakan `public/manajemen-web/config.yml`. Data disimpan dalam bentuk JSON di `src/content/data.json`.

---

## 2. Instalasi dan Menjalankan Proyek Secara Lokal

Pastikan Anda sudah menginstal **Node.js** di komputer Anda.

### Langkah-langkah:
1. Buka terminal/Command Prompt dan arahkan ke dalam folder proyek (`pt-abbasy`).
2. Jalankan perintah instalasi dependensi (hanya perlu dilakukan sekali):
   ```bash
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   npm run dev
   ```
4. Buka browser dan akses alamat: `http://localhost:5173/`

### Mem-build Proyek untuk Produksi:
Jalankan perintah ini untuk melakukan kompilasi file yang siap diunggah ke server / hosting:
```bash
npm run build
```
File hasil kompilasi akan berada di dalam folder `dist/`.

---

## 3. Konfigurasi Dasbor Admin (Decap CMS)

- Dasbor CMS dapat diakses melalui URL: `https://[domain-anda]/manajemen-web/`
- Jika dijalankan di lokal (`localhost`), tambahkan `/manajemen-web/` di belakang URL lokal.

**Cara Penggunaan CMS:**
1. **Pages (Perakit Halaman):** Tempat Anda bisa membuat halaman baru, menyusun blok-blok halaman, menghapus, atau mengubah urutannya semau Anda.
2. **Site Settings:** Tempat mengatur Logo, Favicon, Teks Menu, hingga Tema (Warna Utama & Aksen).
3. Anda tidak perlu memodifikasi kode sumber (`.jsx`) jika hanya ingin menambah/mengubah teks, urutan halaman, dan logo. Semua blok konten sudah di-minimize secara *default* di CMS agar rapi.

---

## 4. Standarisasi Tampilan (UI/UX & Desain Kode)

Jika Anda atau developer lain ingin **membuat fitur atau blok baru**, WAJIB mengikuti pedoman standarisasi berikut agar tampilan tetap seragam, mewah, dan rapi:

### A. Palet Warna (Theme Variables)
Selalu gunakan variabel CSS agar warna bisa diubah dinamis dari Dasbor Admin.
- `var(--color-primary)` : Warna dasar gelap / Navy (default: `#0A192F`). Gunakan untuk *background* gelap atau judul utama.
- `var(--color-accent)` : Warna jingga cerah (default: `#FF7A00`). Gunakan untuk tombol, ikon `lucide-react`, indikator status, atau elemen *highlight*.
- `var(--color-bg)` : Background dasar terang (putih).
- `var(--color-bg-subtle)` : Background abu-abu sangat muda (default: `#F8FAFC`). Gunakan untuk membedakan blok antar *section*.

### B. Komponen UI dan Margin
- **Tombol:** Gunakan kelas `btn` dan `btn-primary`.
  ```html
  <a href="..." className="btn btn-primary">Klik di Sini</a>
  ```
- **Spasi / Padding:** 
  - Setiap blok (Section) baru wajib dibungkus dengan `<div style={{ padding: '60px 0' }}>` atau menggunakan class `.section` agar jarak atas-bawah konsisten.
  - Untuk konten di dalam blok, bungkus dengan `<div className="container">` agar memiliki batas tengah layar (max-width `1200px`) dan proporsional.
- **Kartu (Card):** 
  - Gunakan class `.portfolio-card`, `.feature-card`, atau `.service-card`.
  - Radius border wajib `8px` atau `12px` (`borderRadius: '12px'`).
  - Tambahkan bayangan (Shadow) halus: `boxShadow: '0 4px 20px rgba(0,0,0,0.05)'`

### C. Z-Index dan Lapisan (Layering)
Jika Anda membuat Pop-up (Lightbox) atau Modal baru:
1. Pastikan Pop-up menggunakan `z-index: 9999`.
2. *Navbar Header* memiliki `z-index: 100000` (tertinggi di aplikasi) agar Navbar tetap menutupi modal, sehingga navigasi tetap dapat diakses.
3. Atur bantalan atas modal (`paddingTop: '120px'`) agar konten tidak tertutup oleh *Navbar* yang posisinya *fixed*.
4. Pastikan Tombol "X" (Tutup/Close) **tidak menggunakan posisi fixed di sudut layar**, melainkan ditempatkan di dalam komponen kotak konten (menggunakan `position: absolute` pada modal berwarna putih) agar tidak bertabrakan secara visual dengan *hamburger menu* dari Navbar di perangkat seluler.

### D. Animasi Transisi
- Aplikasi ini menggunakan library **Framer Motion**.
- Saat membuat blok baru, animasikan komponen saat pertama muncul di layar:
  ```jsx
  import { motion } from 'framer-motion';

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {/* Konten Anda */}
  </motion.div>
  ```

---

## 5. Cara Menambahkan Tipe Blok Baru (Panduan Developer)

Jika Anda ingin menambah komponen khusus misalnya "Blok Video":
1. Buat file komponen React baru (misal: `src/components/VideoBlock.jsx`).
2. Daftarkan skema inputannya di `public/manajemen-web/config.yml` di dalam *list* `types` pada *widget* `blocks`. Beri nama misalnya `videoBlock`.
3. Buka `src/pages/DynamicPage.jsx`, temukan `switch (block.type)`, dan tambahkan kasusnya:
   ```jsx
   case 'videoBlock':
     return (
       <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
         <VideoBlock data={block} />
       </div>
     );
   ```

## Selamat Berkreasi!
Kode ini telah dioptimasi untuk kinerja, keterbacaan, dan desain masa kini. Jaga kebersihannya dan hindari melakukan _hard-code_ untuk teks apa pun!
