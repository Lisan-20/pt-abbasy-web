# Panduan Proyek Web PT. Abbasy Anugerah Perkasa

Dokumen ini berisi panduan teknis, langkah-langkah instalasi, dan standarisasi desain (UI/UX) untuk website PT. Abbasy Anugerah Perkasa. Gunakan panduan ini sebagai acuan utama setiap kali ingin melakukan perbaikan, penambahan fitur, atau modifikasi website di masa depan agar semuanya tetap rapi dan seragam.

---

## 1. Instalasi dan Konfigurasi Lokal

Untuk menjalankan atau mengembangkan website ini di komputer lokal Anda, ikuti langkah-langkah berikut:

### Prasyarat (Requirements):
- **Node.js**: Versi 18 ke atas (Direkomendasikan versi terbaru LTS).
- **NPM / Yarn**: Sudah termasuk saat menginstal Node.js.
- **Git**: Untuk menarik dan mendorong (push) kode ke repositori.

### Langkah Instalasi:
1. **Buka Terminal / Command Prompt** dan arahkan ke folder proyek (`pt-abbasy`).
2. Jalankan perintah instalasi dependensi (hanya perlu dilakukan sekali di awal):
   ```bash
   npm install
   ```
3. Untuk menjalankan website di komputer Anda (Local Development Server):
   ```bash
   npm run dev
   ```
   Website akan terbuka di browser secara otomatis atau bisa diakses di `http://localhost:5173`.
4. Untuk membangun website ke versi final (Production Build) yang siap diunggah ke server (meskipun saat ini sudah menggunakan auto-deploy dari GitHub ke Cloudflare Pages):
   ```bash
   npm run build
   ```

### Mengakses CMS secara Lokal (Decap CMS):
Untuk mencoba mengubah data CMS di lokal tanpa harus push ke GitHub:
1. Buka terminal baru dan jalankan proxy server lokal untuk CMS:
   ```bash
   npx decap-server
   ```
2. Buka `http://localhost:5173/manajemen-web/` di browser.

---

## 2. Standarisasi Tampilan (UI/UX)

Agar desain website tidak belang-belang atau berantakan saat ada penambahan fitur baru, WAJIB mengikuti standarisasi warna, gaya, dan komponen berikut:

### Palet Warna:
- **Warna Utama (Primary Background)**: `#0A192F` (Biru Gelap Elegan). 
  - *Fungsi*: Digunakan untuk warna latar belakang (background) pada section utama, navbar (saat terbuka), dan footer.
- **Warna Aksen (Accent/Highlight)**: `#FF7A00` (Oranye).
  - *Fungsi*: Digunakan untuk tombol utama, warna teks saat mouse diarahkan (hover), garis dekorasi, dan ikon (seperti ikon telepon/email).
- **Warna Latar Terang (Light Background)**: `#F8FAFC` atau Putih (`#FFFFFF`).
  - *Fungsi*: Digunakan untuk section yang membutuhkan kontras (seperti halaman Tentang Kami atau Layanan).
- **Warna Teks**:
  - Di atas latar gelap: `White` atau `#E2E8F0` (supaya tidak terlalu tajam).
  - Di atas latar terang: `#333333` (Hitam pudar) atau `#4A5568` untuk deskripsi.

### Tipografi (Font):
- Menggunakan jenis huruf (font-family) Sans-Serif modern yang bersih (seperti Inter, Roboto, atau font bawaan sistem).
- Ukuran teks (Font Size):
  - Heading 1 (`h1`): Besar, tebal (bold), untuk judul utama banner.
  - Heading 2 (`h2`): Judul Section (contoh: "Layanan Kami").
  - Paragraf (`p`): `16px` hingga `18px` dengan line-height `1.6` hingga `1.8` agar mudah dibaca.
  - Perataan Teks: Paragraf sebaiknya diatur dari CMS (Rata Kiri, Kanan, Tengah, atau Justify).

### Komponen Standar:
1. **Tombol (Buttons)**:
   - Gunakan kombinasi CSS class `.btn` dan `.btn-primary`.
   - Ciri khas: Latar belakang warna Aksen (`#FF7A00`), teks warna putih, bentuk kotak dengan sudut sedikit membulat (*border-radius: 4px* atau *8px*).
   - Efek Hover (saat kursor mendekat): Tombol membesar sedikit (`transform: scale(1.05)`) dan menampilkan efek cahaya/bayangan.
2. **Kartu Konten (Cards)**:
   - Jika diletakkan di latar gelap: Gunakan latar belakang semi-transparan `rgba(255, 255, 255, 0.05)` dengan border tipis `1px solid rgba(255,255,255,0.1)`.
   - Jika diletakkan di latar terang: Gunakan latar putih murni dengan efek bayangan kotak (box-shadow lembut).
   - Wajib memiliki animasi *hover* (misal: kartu bergeser naik ke atas sedikit).
3. **Navbar (Menu Navigasi)**:
   - Memiliki efek *Glassmorphism* (blur) dan berubah dari transparan menjadi memiliki *background solid* (putih) dan teks menyesuaikan warna utama (Biru Gelap) saat halaman di-scroll ke bawah.
   - Responsif: Berubah menjadi ikon "garis tiga" (hamburger) di layar HP.
4. **Animasi (Framer Motion)**:
   - Semua elemen penting harus masuk ke layar secara perlahan (Fade In) dan bergeser dari bawah ke atas saat di-scroll. Jangan membuat elemen statis kaku.

---

## 3. Aturan Pengembangan Code & Sistem

### Manajemen Data (Decap CMS)
1. **Sumber Kebenaran Data (Source of Truth)**: Semua teks, tautan, gambar logo, dan pengaturan utama tidak boleh di-hardcode (ditulis mati) di dalam *file* JavaScript (`.jsx`). Semuanya **HARUS** diambil dari file `src/content/data.json`.
2. **Menambahkan Field Baru**: Jika fitur baru membutuhkan isian teks baru, wajib daftarkan konfigurasinya di `public/manajemen-web/config.yml` agar bisa diubah melalui Dashboard Admin, lalu pasang variabelnya di komponen `.jsx`.

### Sistem Caching Cloudflare (PENTING!)
Website ini memiliki riwayat masalah *caching* dengan Cloudflare Pages di mana layar sering menjadi putih (blank) setelah adanya *update* karena *file* JavaScript lama yang di-cache oleh browser tidak ditemukan di server baru (Error 404).

Untuk mengatasi ini secara permanen, telah diterapkan **2 lapis perlindungan di tingkat kode**. JANGAN PERNAH MENGUBAH / MENGHAPUS hal ini:
1. **File `public/_headers`**: Berisi aturan larangan keras bagi Cloudflare dan Browser untuk men-cache (menyimpan) *file* kerangka utama (HTML) di rute navigasi mana pun (`/*`).
2. **File `vite.config.js`**: Fitur *chunk hashing* standar Vite telah dimatikan! *File* output akan selalu bernama `index.js` dan `index.css`. Sebagai gantinya, *cache-buster* berbasis *timestamp* secara dinamis ditambahkan (contoh: `index.js?v=123456`). Ini menjamin *file* tidak akan pernah *Not Found* di server meskipun di-cache.
3. **Auto-reload di `index.html`**: Ada script JavaScript murni di `<head>` yang bertugas sebagai satpam. Jika (karena alasan ajaib apa pun) skrip gagal dimuat, ia akan memaksa *Hard Refresh* secara otomatis.

### Menambahkan Halaman Baru
1. Buat *file* komponen halamannya di dalam folder `src/pages/` (contoh: `Karir.jsx`).
2. Desain halaman tersebut dengan mengikuti standarisasi UI (menggunakan *wrapper* yang tepat).
3. Buka `src/App.jsx`.
4. Import komponen tersebut di atas, lalu tambahkan rute baru di dalam blok `<Routes>`.
   - Format standar: `<Route path="/karir" element={<Karir />} />`
5. Tambahkan akses rute (tombol/link) tersebut di CMS (Navigation Menu atau Footer Quick Links) agar pengunjung bisa mengkliknya.
