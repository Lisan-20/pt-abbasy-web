# Panduan Proyek Web - PT Abbasy Anugerah Perkasa

Dokumen ini berisi panduan teknis, pedoman instalasi, dan standarisasi desain untuk situs web PT Abbasy Anugerah Perkasa. Patuhi panduan ini saat membuat fitur atau halaman baru agar konsistensi desain premium tetap terjaga.

## 1. Instalasi dan Konfigurasi

### Persyaratan Sistem
- Node.js (versi 16 atau lebih baru)
- npm (Node Package Manager)

### Langkah Instalasi
1. Buka terminal di dalam folder `pt-abbasy`.
2. Jalankan perintah `npm install` untuk mengunduh semua dependensi.
3. Jalankan `npm run dev` untuk menjalankan *server* pengembangan lokal. Aplikasi dapat diakses di `http://localhost:5173`.
4. Untuk mem-build versi produksi, jalankan `npm run build`.

### Konfigurasi Data (JSON)
Seluruh konten teks, alamat, kontak, pengaturan situs, dan tautan sosial media diatur secara terpusat pada *file*:
**`src/content/data.json`**

Jika Anda ingin mengubah deskripsi Beranda, alamat email, atau menambah anggota tim ahli, Anda hanya perlu mengedit *file* JSON ini tanpa menyentuh kode program React (JSX).

## 2. Standarisasi Desain (UI/UX)

Untuk mempertahankan tampilan *Corporate Premium*, gunakan kelas-kelas CSS bawaan yang telah ditetapkan di `src/index.css`. Jangan menggunakan elemen gaya (*inline styling*) yang bertentangan dengan pakem berikut.

### Palet Warna
- **Warna Utama (Navy Blue):** `var(--color-primary)` - Digunakan untuk Teks Heading dan warna dominan.
- **Warna Aksen (Orange):** `var(--color-accent)` - Digunakan untuk Tombol, Garis bawah judul, dan Sorotan (*Highlight*).
- **Warna Latar Terang:** `var(--color-bg-light)` - Digunakan untuk latar halaman umum.
- **Warna Latar Gelap/Kontras:** `var(--color-bg-subtle)` - Digunakan sebagai selang-seling latar belakang bagian (*section*) agar tidak monoton.

### Tipografi
- Semua *font* menggunakan **Outfit** (Google Fonts).
- Semua ukuran huruf dibuat cair (*Fluid Typography*) menggunakan fungsi CSS `clamp()`. Jangan memaksakan ukuran *pixel* mati seperti `font-size: 16px` untuk judul atau paragraf.

### Kelas CSS Global (Komponen Siap Pakai)

Gunakan kelas berikut pada elemen Anda untuk hasil yang seragam:

1. **`.container`**
   Bungkus seluruh konten Anda dalam `div` berkelas `container` agar ukurannya tidak melebar tanpa batas di layar besar, serta memiliki jarak kiri-kanan (padding) yang rapi di HP.
   
2. **`.section` & `.section-title`**
   Gunakan kelas ini untuk memisahkan bagian-bagian konten.
   ```jsx
   <section className="section">
     <div className="container">
       <h2 className="section-title">Judul Bagian</h2>
       {/* Konten... */}
     </div>
   </section>
   ```

3. **Tombol (`.btn` & `.btn-primary`)**
   Gunakan kelas ini untuk semua tautan Call-To-Action (CTA).
   ```jsx
   <Link to="/contact" className="btn btn-primary">Hubungi Kami</Link>
   ```

4. **Kartu Fitur (`.feature-card`)**
   Untuk menampilkan layanan, nilai inti, atau profil singkat. Secara otomatis akan memiliki bayangan (*box-shadow*) elegan saat diarahkan kursor (*hover*).
   ```jsx
   <motion.div whileHover={{ scale: 1.02 }} className="feature-card">
     <h3>Visi</h3>
     <p>Deskripsi visi perusahaan.</p>
   </motion.div>
   ```

5. **Watermark / Backdrop Logo (`.watermark-section`)**
   Logo PT Abbasy sebagai bayangan latar belakang telah diatur secara **global**. Semua halaman yang dibungkus dengan komponen `<PageWrapper>` otomatis memiliki latar ini. **Jangan** menambahkan *watermark* manual menggunakan tag `<img>` statis di latar belakang.

## 3. Efek dan Animasi (Framer Motion)

Semua halaman menggunakan `AnimatePresence` dan perpindahan halaman yang halus. 
Jika Anda membuat komponen baru, pastikan ia merespons saat di-*scroll* menggunakan `framer-motion`:

```jsx
import { motion } from 'framer-motion';

// Contoh elemen yang muncul elegan dari bawah saat masuk area layar
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Konten Anda...
</motion.div>
```

## 4. Header (Navbar) dan Footer
- **Navbar** dilengkapi dengan efek *Glassmorphism* transparan, namun akan otomatis menjadi **Putih Solid** saat halaman digulir untuk mencegah *watermark* menembus menu navigasi.
- **Footer** selalu berada di lapisan terdepan (`z-index: 10`) untuk menutupi *watermark* saat halaman digulir hingga paling bawah.

## 5. Menambahkan Halaman Baru
1. Jika halamannya bersifat dinamis dan hanya berisi teks panjang, tambahkan saja objek JSON baru di dalam `data.json` di bawah *array* `"customPages"`. Halaman otomatis akan terbentuk menggunakan kerangka `<DynamicPage>`.
2. Jika butuh halaman dengan desain khusus, buat *file* baru di `src/pages/`, lalu daftarkan jalurnya di `src/App.jsx` di dalam blok `<AnimatedRoutes>`. 
3. Gunakan `<PageWrapper>` sebagai tag pembungkus utama di halaman baru Anda agar mewarisi transisi animasi, *helmet* (SEO Meta), dan *watermark* latar belakang otomatis.
