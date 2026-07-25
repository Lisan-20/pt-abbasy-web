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

## 2. Keamanan dan Optimalisasi (Tingkat Tinggi)
Proyek ini telah dikonfigurasi dengan standar keamanan dan performa kelas militer. Jangan menghapus *file-file* berikut:

1. **`public/_headers` (Perisai Netlify)**: Menyimpan instruksi keamanan seperti `X-Frame-Options: DENY` untuk mencegah serangan *Clickjacking* dan *XSS*.
2. **`public/admin/index.html` (Gembok Dasbor)**: Dilengkapi dengan algoritma Javascript yang menolak akses ke CMS jika diakses melalui `abbasyanugerahperkasa.com/admin`. Hanya izinkan lewat `.netlify.app`.
3. **`public/robots.txt`**: Berisi perintah `Disallow: /admin` yang melarang mesin pencari Googlebot untuk menelusuri halaman rahasia admin. Halaman admin juga dilengkapi dengan Meta Label `noindex, nofollow`.
4. **`vite.config.js` (Obfuscation)**: Diprogram secara khusus agar setiap kali Anda menjalankan `npm run build`, ia akan menghancurkan *Source Maps* (agar struktur *file* disembunyikan dari peramban publik) dan secara otomatis menghapus seluruh jejak `console.log` peninggalan masa *development*.

*(PENTING: Pastikan opsi "Registration preferences" di menu Identity pada Dashboard Netlify Anda selalu terkunci di mode "Invite Only".)*

## 3. SEO Meta dan JSON-LD (Search Engine Optimization)
Website ini sudah dilengkapi dengan injeksi SEO paripurna di dalam `index.html` dan `src/components/PageWrapper.jsx`:
- **WebSite JSON-LD**: Secara paksa menyuruh Google untuk mengenali nama situs sebagai "PT Abbasy Anugerah Perkasa".
- **Theme Color & Twitter Cards**: `theme-color` telah diset ke `#0A192F` (Navy Blue), dan *metadata* Twitter/X telah disematkan untuk pratinjau tautan (*Link Preview*) yang elegan.
- **Canonical Links**: Mencegah pinalti konten duplikat dari Google.

## 4. Standarisasi Desain (UI/UX)

Untuk mempertahankan tampilan *Corporate Premium*, gunakan kelas-kelas CSS bawaan yang telah ditetapkan di `src/index.css`. Jangan menggunakan elemen gaya (*inline styling*) yang bertentangan dengan pakem berikut.

### Palet Warna
- **Warna Utama (Navy Blue):** `var(--color-primary)` - Digunakan untuk Teks Heading dan warna dominan.
- **Warna Aksen (Orange):** `var(--color-accent)` - Digunakan untuk Tombol, Garis bawah judul, dan Sorotan (*Highlight*).
- **Warna Latar Terang:** `var(--color-bg-light)` - Digunakan untuk latar halaman umum.
- **Warna Latar Gelap/Kontras:** `var(--color-bg-subtle)` - Digunakan sebagai selang-seling latar belakang bagian (*section*) agar tidak monoton.

### Kelas CSS Global (Komponen Siap Pakai)
1. **`.container`**: Bungkus seluruh konten Anda dalam `div` berkelas `container` agar ukurannya tidak melebar tanpa batas di layar besar, serta memiliki jarak padding yang rapi di HP.
2. **`.section` & `.section-title`**: Gunakan kelas ini untuk memisahkan bagian-bagian konten secara vertikal.
3. **Tombol (`.btn` & `.btn-primary`)**: Gunakan kelas ini untuk semua tautan Call-To-Action (CTA).
4. **Kartu Fitur (`.feature-card`)**: Untuk menampilkan layanan. Akan otomatis menampilkan bayangan elegan saat di-*hover*.
5. **Watermark Logo (`.watermark-section`)**: Fitur otomatis (Global). Setiap elemen yang dibungkus dengan komponen `<PageWrapper>` akan memiliki bayangan lambang PT Abbasy yang mengunci (*fixed*) di tengah-tengah layar tanpa mempedulikan arah guliran halaman (*scroll*). Navbar akan otomatis berwarna putih pekat (*solid*) untuk menutupi *watermark* saat digulir, dan Footer memilki `z-index: 10` agar tetap berada di lapisan terdepan.

## 5. Menambahkan Halaman Baru
1. Jika halamannya bersifat dinamis dan hanya berisi teks panjang, tambahkan saja objek JSON baru di dalam `data.json` di bawah *array* `"customPages"`. Halaman otomatis akan terbentuk menggunakan kerangka `<DynamicPage>`.
2. Jika butuh halaman dengan desain khusus, buat *file* baru di `src/pages/`, lalu daftarkan jalurnya di `src/App.jsx` di dalam blok `<AnimatedRoutes>`. 
3. Selalu gunakan `<PageWrapper>` sebagai tag pembungkus utama di halaman baru Anda agar mewarisi SEO, Transisi, dan *Watermark* latar belakang otomatis.
