# BUKU PANDUAN MASTER: Pembuatan Landing Page & CMS
*(Studi Kasus: PT Abbasy Anugerah Perkasa)*

Dokumen ini adalah "Resep Rahasia" (SOP) dari awal sampai akhir untuk membuat *website Landing Page* modern yang dilengkapi dengan Panel Admin (CMS), berkinerja tinggi, dan teroptimasi SEO. Gunakan dokumen ini sebagai patokan jika Anda ingin membuat *website* serupa untuk proyek atau perusahaan lain di masa depan.

---

## TAHAP 1: Persiapan Lokal & Struktur Kode (Folder Proyek)

*Website* ini dibangun menggunakan **React (Vite)** sebagai mesin utamanya.

### 1. Inisialisasi Proyek Baru
Jika membuat proyek baru dari nol, jalankan perintah ini di terminal:
```bash
npm create vite@latest nama-proyek -- --template react
cd nama-proyek
npm install react-router-dom framer-motion react-helmet-async
```

### 2. Standarisasi Tampilan (Design System)
Agar *website* baru Anda memiliki standar kualitas profesional yang sama, terapkan aturan berikut di file CSS utama:
- **Komponen `PageWrapper`**: Selalu bungkus halaman baru dengan komponen ini agar mendapat efek transisi halus saat dipindah dan otomatis menggulung layar ke atas (*scroll to top*).
- **Corporate Geometric Background**: Untuk memberi kesan elegan, tambahkan kelas `geometric-bg bg-left` atau `geometric-bg bg-right` pada setiap elemen `<section>`.
- **Trik Logo Favicon**: Pasang kode pemanggilan Favicon secara "kasar/statis" langsung di dalam `<head>` pada `index.html`, bukan hanya di dalam React, agar robot tua Google (`Googlebot-Image`) bisa membacanya tanpa tersesat.

---

## TAHAP 2: Konfigurasi Panel Admin (Netlify CMS)

Kita menggunakan peretasan arsitektur cerdas: *Website* dititipkan di GitHub Pages (gratis dan cepat), tetapi kita "meminjam" sistem keamanan Netlify murni hanya untuk Panel Admin (CMS).

### Langkah Konfigurasi:
1. Buat akun di **Netlify.com**.
2. Klik **Add new site** > **Import an existing project** > Pilih **GitHub**.
3. Hubungkan ke repositori *website* Anda.
4. Setelah situs terbuat di Netlify, pergi ke **Site configuration** > **Identity**.
5. Klik **Enable Identity**.
6. Gulir ke bawah ke bagian **Services** > **Git Gateway**, lalu klik **Enable Git Gateway**. (Ini adalah jembatan yang mengizinkan Admin mengubah kode di GitHub).
7. **PENTING (Trik Integrasi):** Buka file `index.html` di komputer Anda, tambahkan *script* Netlify Identity, lalu paksakan URL API-nya menunjuk ke Netlify (karena web kita aslinya ada di GitHub).
   ```html
   <script>
     window.netlifyIdentity.init({ APIUrl: 'https://nama-aplikasi-anda.netlify.app/.netlify/identity' });
   </script>
   ```

---

## TAHAP 3: Deployment ke GitHub Pages (Otomatisasi)

Kita menggunakan **GitHub Actions** agar setiap kali ada perubahan kode (baik dari Anda atau dari Panel Admin), *website* akan otomatis merakit dirinya sendiri.

### Langkah Konfigurasi:
1. Buat *file* perakit di: `.github/workflows/deploy.yml`.
2. **Trik Anti-Error SPA (Pencegatan 404):** Karena ini adalah aplikasi React (Single Page Application), GitHub Pages sering menampilkan pesan *404 Not Found* jika pengunjung me-*refresh* halaman (misal di `/layanan`). 
   Untuk mencegahnya, tambahkan perintah ini di dalam file `deploy.yml` pada bagian *Build*:
   ```yaml
   - name: Generate 404 page for SPA routing
     run: cp dist/index.html dist/404.html
   ```
   *(Ini akan membohongi GitHub untuk selalu memuat aplikasi React kita apa pun rute yang diketik pengunjung).*

---

## TAHAP 4: Menghubungkan Domain (cPanel Rumahweb)

Bagaimana cara mengubah alamat bawaan GitHub (`.github.io`) menjadi alamat `.com` milik Anda?

### Langkah Konfigurasi:
1. Masuk ke **cPanel Rumahweb** atau halaman **DNS Management**.
2. Buat/Ubah **A Record** untuk domain utama (kosong atau `@`) dan arahkan ke 4 nomor IP resmi GitHub berikut (buat 4 baris):
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Buat/Ubah **CNAME Record** untuk `www`, dan arahkan ke `username-github-anda.github.io`.
4. Pergi ke halaman **GitHub Repository** Anda > **Settings** > **Pages**.
5. Di kolom **Custom Domain**, ketikkan domain Anda (contoh: `namaperusahaan.com`) dan klik Save.
6. Tunggu sekitar 15-30 menit, lalu centang kotak **Enforce HTTPS** agar *website* Anda memiliki ikon gembok aman.

---

## TAHAP 5: Optimasi Mesin Telusur (SEO) & Google Console

Langkah terakhir agar *website* Anda mudah ditemukan di Google dan tampil elegan saat tautannya dibagikan di WhatsApp/Medsos.

### 1. Injeksi Bahasa Mesin (Kode Internal)
- **Sitemap**: Buat *file* `public/sitemap.xml` yang berisi daftar seluruh halaman *website*.
- **JSON-LD Schema**: Tambahkan data terstruktur di `PageWrapper.jsx` yang menyatakan bahwa *website* ini adalah entitas bisnis resmi (contoh tipe: `GeneralContractor` atau `LocalBusiness`).
- **Open Graph (OG)**: Pastikan tag `<meta property="og:image"...>` ada di `index.html` dan `PageWrapper.jsx` agar muncul *thumbnail* gambar saat *link* dibagikan.

### 2. Verifikasi Google Search Console
- Buka **Google Search Console** > Tambah Properti.
- Pilih kotak sebelah kanan: **URL Prefix** (Awalan URL), lalu masukkan alamat lengkap *website*.
- Pilih metode verifikasi **HTML Tag**.
- Salin kode acak yang diberikan (contoh: `<meta name="google-site-verification" content="..." />`).
- Tempelkan kode tersebut di bagian `<head>` pada file `index.html` Anda.
- Dorong (*Push*) kode ke GitHub. Tunggu 2 menit.
- Kembali ke Google Console dan klik **Verifikasi**.
- Terakhir, masuk ke menu **Sitemaps** di Google Console dan daftarkan `sitemap.xml`.

---
*Dengan mengikuti dokumen ini setahap demi setahap, Anda dapat mengkloning sistem canggih ini ke berbagai proyek masa depan tanpa harus memecahkan ulang masalah-masalah teknis yang rumit.*
