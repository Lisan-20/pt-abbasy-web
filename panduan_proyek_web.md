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
Agar *website* baru Anda memiliki standar kualitas profesional yang sama, terapkan aturan berikut:
- **Komponen `PageWrapper`**: Selalu bungkus halaman baru dengan komponen ini agar mendapat efek transisi halus saat dipindah dan otomatis menggulung layar ke atas (*scroll to top*).
- **Corporate Geometric Background**: Untuk memberi kesan elegan, tambahkan kelas `geometric-bg bg-left` atau `geometric-bg bg-right` pada setiap elemen `<section>`.
- **Korsel Animasi (Seamless Loop)**: Untuk elemen berjalan (seperti logo Klien), gunakan dua wadah (`marquee-content`) secara berdampingan di dalam satu wadah utama dengan CSS `animation` linear untuk menciptakan putaran mulus tanpa batas tanpa lompatan (jangan mengandalkan perulangan data tunggal).
- **Trik Logo Favicon**: Pasang kode pemanggilan Favicon secara statis langsung di dalam `<head>` pada `index.html`. Pastikan *file* Favicon benar-benar berbentuk persegi sama sisi (contoh: 192x192 piksel) karena mesin pencari Google sangat kaku dan akan menolak gambar persegi panjang.

---

## TAHAP 2: Konfigurasi Panel Admin (Netlify CMS / Decap)

Kita menggunakan peretasan arsitektur cerdas: *Website* dititipkan di GitHub Pages (gratis dan cepat), tetapi kita "meminjam" sistem keamanan Netlify murni hanya untuk Panel Admin (CMS).

### Langkah Konfigurasi & Mengakali Keamanan Cross-Domain:
1. Buat akun di **Netlify.com**, lalu sambungkan (*Import*) repositori GitHub Anda.
2. Di **Site configuration** > **Identity**, klik **Enable Identity**.
3. Di bagian **Services** > **Git Gateway**, klik **Enable Git Gateway**. 
4. **Trik Integrasi Frontend:** Buka file `public/admin/index.html`, tambahkan *script* Netlify Identity, dan paksakan URL API-nya:
   ```html
   <script>
     window.netlifyIdentity.init({ APIUrl: 'https://nama-aplikasi-anda.netlify.app/.netlify/identity' });
   </script>
   ```
5. **Trik Bypass Git-Gateway (Keamanan Tingkat Lanjut):** Panel Admin Anda (Git Gateway) tidak bisa berjalan di sembarang domain karena diblokir oleh Netlify. Agar bisa *login* di domain utama, Anda WAJIB menambahkan `base_url` ke dalam file `public/admin/config.yml`:
   ```yaml
   backend:
     name: git-gateway
     branch: main
     site_domain: nama-aplikasi-anda.netlify.app
     base_url: https://nama-aplikasi-anda.netlify.app
   ```
6. **CATATAN PENTING:** Karena *website* utama ada di GitHub Pages, matikan fitur *Auto Publishing* / *Builds* di Netlify untuk menghemat kuota gratis (300 menit/bulan). Jika ada perubahan pada konfigurasi CMS (`config.yml`), masuk ke dasbor Netlify dan tekan **Trigger Deploy** secara manual. Untuk pembaruan konten biasa (tambah tulisan/klien), Netlify tidak perlu di-*deploy*.

---

## TAHAP 3: Deployment ke GitHub Pages (Otomatisasi)

Kita menggunakan **GitHub Actions** agar setiap kali ada perubahan kode, *website* otomatis merakit dirinya sendiri.

### Langkah Konfigurasi:
1. Buat *file* perakit di: `.github/workflows/deploy.yml`.
2. **Trik Anti-Error SPA (Pencegatan 404):** Karena ini aplikasi React, tambahkan baris berikut di skrip *build* Anda untuk mencegah pesan *404 Not Found* saat *website* di-*refresh*:
   ```yaml
   - name: Generate 404 page for SPA routing
     run: cp dist/index.html dist/404.html
   ```

---

## TAHAP 4: Menghubungkan Domain (cPanel Rumahweb)

### Langkah Konfigurasi DNS:
1. Masuk ke **cPanel Rumahweb** atau **DNS Management**.
2. Buat **A Record** (kosong/`@`) ke 4 nomor IP GitHub:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Buat **CNAME Record** untuk `www` yang mengarah ke `username-github.github.io`.
4. Di GitHub Repository > **Settings** > **Pages**, masukkan nama Domain Custom Anda. Tunggu hingga bisa mencentang **Enforce HTTPS**.

---

## TAHAP 5: Optimasi Mesin Telusur (SEO) & Google Console

Langkah terakhir agar *website* mudah ditemukan dan tampil elegan.

### 1. Injeksi Kode SEO (JSON-LD & Meta Tags)
- **Sitemap**: Buat *file* `public/sitemap.xml`.
- **JSON-LD Schema**: Letakkan di `PageWrapper.jsx` untuk mendeklarasikan entitas bisnis (misal: `GeneralContractor`).
- **Open Graph (OG)**: Sisipkan `<meta property="og:image"...>` di `index.html`.

### 2. Verifikasi Google Search Console
- Buka **Google Search Console** > Tambah Properti (Awalan URL).
- Pilih verifikasi metode **HTML Tag**, lalu sisipkan tag `<meta name="google-site-verification"...>` tersebut di dalam `<head>` pada `index.html`.
- Dorong (*Push*) kode ke GitHub, tunggu 2 menit, lalu klik **Verifikasi**.
- Jangan lupa daftarkan `sitemap.xml`. Jika ikon atau pencarian tidak langsung berubah, jangan panik; **Google membutuhkan waktu 3-14 hari** (fenomena Google Dance) untuk memantapkan posisi pencarian Anda!
