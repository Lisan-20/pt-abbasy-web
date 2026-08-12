const fs = require('fs');
const puppeteer = require('puppeteer');
const path = require('path');

const desktopPath = 'C:\\Users\\lsidq\\OneDrive\\Desktop';
const erpPdfPath = path.join(desktopPath, 'Portofolio_ERP_LisanSidqi.pdf');
const webPdfPath = path.join(desktopPath, 'Portofolio_Website_LisanSidqi.pdf');

const erpHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Portofolio ERP</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; font-size: 14px;}
    .container { max-width: 800px; margin: 0 auto; padding: 0; }
    h1 { border-bottom: 2px solid #2c3e50; padding-bottom: 10px; color: #2c3e50; margin-top: 0; }
    h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 35px; color: #34495e; }
    h3 { color: #2980b9; margin-top: 25px; margin-bottom: 10px; }
    p { margin-bottom: 15px; text-align: justify; }
    ul { margin-top: 0; padding-left: 20px; }
    li { margin-bottom: 8px; text-align: justify; }
    .meta { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 25px; }
    .meta p { margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dokumen Portofolio</h1>
    <div class="meta">
      <p><strong>Nama:</strong> Lisan Sidqi</p>
      <p><strong>Peran:</strong> Fullstack / Software Engineer</p>
      <p><strong>Kontak:</strong> Lsidqi51@gmail.com</p>
    </div>

    <h2>1. Sistem Enterprise Resource Planning (ERP)</h2>
    <p><strong>Peran:</strong> Fullstack Engineer & Systems Architect<br>
    <strong>Status:</strong> Sedang Berjalan (Ongoing)<br>
    <strong>Lingkungan:</strong> Enterprise, B2B</p>

    <h3>Ringkasan Proyek</h3>
    <p>Memimpin perancangan dan pengembangan arsitektur perangkat lunak untuk platform <em>Enterprise Resource Planning</em> (ERP) yang komprehensif dan berkinerja tinggi. Sistem ini dibangun secara terpusat untuk memfasilitasi operasional bisnis berskala besar dari hulu ke hilir, mencakup <em>Point of Sales</em> (Kasir), Manajemen Inventaris & Rantai Pasok, Sumber Daya Manusia (HRD), hingga Akuntansi Inti (<em>General Ledger</em>).</p>

    <h3>Teknologi yang Digunakan</h3>
    <ul>
      <li><strong>Frontend:</strong> React.js, Inertia.js, Vite, Tailwind CSS (Tema Glassmorphism)</li>
      <li><strong>Backend (Inti):</strong> Laravel 11, PHP 8.2, Laravel Octane (Swoole)</li>
      <li><strong>Microservices (Analitik):</strong> Golang (Framework Fiber)</li>
      <li><strong>Database & Cache:</strong> PostgreSQL, Redis</li>
      <li><strong>Infrastruktur:</strong> Docker (App, NGINX, Redis)</li>
      <li><strong>Integrasi AI:</strong> Google Gemini & Ollama (AI Lokal)</li>
    </ul>

    <h3>Fitur Utama & Kontribusi</h3>
    <ul>
      <li><strong>Microservices Golang Berperforma Tinggi:</strong> Mengidentifikasi dan memecahkan kendala kehabisan memori (<em>Memory Exhaustion</em>) serta <em>timeout</em> pada Laravel Octane saat merender laporan akuntansi berukuran raksasa (puluhan ribu baris Buku Besar). Merancang arsitektur <em>microservice</em> ringan menggunakan Golang (Fiber dan driver murni PostgreSQL) khusus untuk menangani analitik berat. Mengintegrasikannya dengan React via <em>client-side fetching</em> (Axios), memangkas waktu <em>generate</em> laporan dari 20+ detik menjadi di bawah 1 detik.</li>
      <li><strong>Arsitektur In-Memory Caching:</strong> Mengimplementasikan pola <em>Cache-Aside</em> menggunakan Redis di dalam <em>microservice</em> Golang untuk laporan Keuangan dan Kasir. Mencapai waktu respons API di bawah satu milidetik (<em>sub-millisecond</em>) dengan masa kedaluwarsa (TTL) 5 menit, secara drastis mengurangi beban pada database utama PostgreSQL.</li>
      <li><strong>Point of Sales (POS) Canggih & Asisten AI:</strong> Merancang antarmuka kasir <em>split-view</em> yang mampu memproses jutaan baris inventaris tanpa jeda (<em>lag</em>) berkat penerapan <em>live-search</em> dengan <em>debounce</em> dan paginasi presisi. Mengintegrasikan Asisten AI (<em>Agnostic AI</em> untuk Gemini maupun Ollama) yang dibekali <em>parser RegEx</em> dan <em>fuzzy search</em> guna memberikan rekomendasi barang otomatis yang cerdas walau ada kesalahan pengejaan.</li>
      <li><strong>Rantai Pasok Kompleks & Akuntansi Otomatis:</strong> Mengembangkan siklus pengadaan barang (<em>Procurement</em>) secara mulus (dari <em>Purchase Orders</em> ➔ <em>Goods Receipts</em> ➔ <em>Returns</em>). Menciptakan sistem <em>double-entry</em> jurnal otomatis (<code>JurnalHelper</code>) yang seketika memicu efek finansial (penyesuaian Hutang/Piutang) sejalan dengan mutasi fisik stok gudang.</li>
      <li><strong>Optimasi & Efisiensi Database:</strong> Merancang struktur pangkalan data (<em>database</em>) PostgreSQL yang solid dan terukur. Secara progresif memangkas ribuan objek data dan tabel yang tidak efisien, dilanjutkan dengan reorganisasi indeks dan pemeliharaan tabel (VACUUM/ANALYZE) yang sukses melipatgandakan kecepatan eksekusi kueri untuk transaksi berat.</li>
      <li><strong>Desain UI/UX Premium:</strong> Menerapkan estetika <em>Glassmorphism</em> modern menggunakan Tailwind CSS. Membangun kestabilan tata letak dengan mengimplementasikan ruang lingkup kelas CSS terisolasi (<em>scoping</em>), menyematkan <em>sidebar mobile</em> cerdas (<em>auto-collapsing</em>), dan menggunakan sistem navigasi atas bergaya Odoo demi memaksimalkan porsi layar untuk visibilitas data perusahaan.</li>
    </ul>
  </div>
</body>
</html>
`;

const webHtml = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Portofolio Website</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; font-size: 14px;}
    .container { max-width: 800px; margin: 0 auto; padding: 0; }
    h1 { border-bottom: 2px solid #2c3e50; padding-bottom: 10px; color: #2c3e50; margin-top: 0; }
    h2 { border-bottom: 1px solid #ccc; padding-bottom: 5px; margin-top: 35px; color: #34495e; }
    h3 { color: #2980b9; margin-top: 25px; margin-bottom: 10px; }
    p { margin-bottom: 15px; text-align: justify; }
    ul { margin-top: 0; padding-left: 20px; }
    li { margin-bottom: 10px; text-align: justify; }
    .meta { background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin-bottom: 25px; }
    .meta p { margin: 5px 0; }
    a { color: #3498db; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Dokumen Portofolio</h1>
    <div class="meta">
      <p><strong>Nama:</strong> Lisan Sidqi</p>
      <p><strong>Peran:</strong> Fullstack / Software Engineer</p>
      <p><strong>Kontak:</strong> Lsidqi51@gmail.com</p>
    </div>

    <h2>2. Website Perusahaan dengan Headless CMS</h2>
    <p><strong>Klien:</strong> PT. Abbasy Anugerah Perkasa<br>
    <strong>Peran:</strong> Frontend Developer<br>
    <strong>Status:</strong> Selesai<br>
    <strong>Tautan:</strong> <a href="https://abbasyanugerahperkasa.com">https://abbasyanugerahperkasa.com</a></p>

    <h3>Ringkasan Proyek</h3>
    <p>Mengembangkan <em>website</em> profil perusahaan infrastruktur dan konstruksi yang berkinerja tinggi serta modern. Tujuan utamanya adalah menciptakan platform yang elegan, cepat, dan dapat dikustomisasi penuh, di mana staf non-teknis klien dapat memperbarui konten (layanan, portofolio, berita, dan struktur organisasi) secara mandiri tanpa memerlukan campur tangan <em>developer</em>.</p>

    <h3>Teknologi yang Digunakan</h3>
    <ul>
      <li><strong>Frontend Framework:</strong> React.js, Vite</li>
      <li><strong>Styling & Animasi:</strong> Vanilla CSS, Framer Motion</li>
      <li><strong>Manajemen Konten:</strong> Decap CMS (<em>Headless CMS</em> berbasis Git)</li>
      <li><strong>Deployment & Hosting:</strong> Cloudflare Pages, GitHub Actions (CI/CD)</li>
    </ul>

    <h3>Fitur Utama & Kontribusi</h3>
    <ul>
      <li><strong>Integrasi Headless CMS:</strong> Berhasil mengintegrasikan Decap CMS, memetakan struktur data JSON yang kompleks ke dalam komponen React. Hal ini memungkinkan klien mengelola tata letak halaman, menu <em>dropdown</em> hierarkis, dan konfigurasi bagian bawah situs (<em>footer</em>) secara dinamis melalui dasbor admin yang sangat ramah pengguna.</li>
      <li><strong>Arsitektur Caching Tingkat Lanjut:</strong> Merancang solusi tangguh atas sistem penyimpanan sementara (<em>edge caching</em>) Cloudflare yang agresif, di mana sebelumnya berkonflik dengan perpindahan rute pada <em>Single Page Application</em> (SPA). Mengonfigurasi ulang proses <em>build</em> di Vite untuk mencetak nama <em>file</em> rakitan secara statis (<code>index.js</code>, <code>index.css</code>) sembari menyuntikkan pencegah <em>cache</em> stempel waktu (<em>timestamp cache-busters</em>) secara dinamis (<code>?v=timestamp</code>). Solusi ini 100% melenyapkan eror 404 MIME type selama pembaruan versi <em>website</em> di Cloudflare.</li>
      <li><strong>Implementasi UI/UX Modern:</strong> Menerjemahkan desain figma ke dalam antarmuka yang sepenuhnya responsif, menonjolkan efek <em>glassmorphism</em>, navigasi melayang (<em>sticky navigation</em>), dan animasi gulir nan mulus menggunakan Framer Motion.</li>
      <li><strong>Optimasi Performa & SEO:</strong> Mengatur <code>_headers</code> khusus pada Cloudflare untuk mengoptimalkan kebijakan <em>cache</em> (mencegah <em>browser</em> menyimpan HTML lama sementara tetap membiarkan aset berat tersimpan permanen), yang menghasilkan waktu <em>loading</em> super cepat dan menjamin setiap pengunjung selalu menerima konten terbaru secara instan.</li>
    </ul>
  </div>
</body>
</html>
`;

(async () => {
  try {
    console.log('Generating ERP Portfolio...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.setContent(erpHtml, { waitUntil: 'domcontentloaded' });
    await page.pdf({ path: erpPdfPath, format: 'A4', printBackground: true, margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' } });
    console.log('ERP Portfolio saved:', erpPdfPath);

    console.log('Generating Website Portfolio...');
    await page.setContent(webHtml, { waitUntil: 'domcontentloaded' });
    await page.pdf({ path: webPdfPath, format: 'A4', printBackground: true, margin: { top: '40px', bottom: '40px', left: '40px', right: '40px' } });
    console.log('Website Portfolio saved:', webPdfPath);

    await browser.close();
    
    // Remove the old combined file to avoid confusion
    const oldPath = path.join(desktopPath, 'Portfolio_Supporting_Document.pdf');
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
      console.log('Removed old combined portfolio document.');
    }
    
  } catch (err) {
    console.error(err);
  }
})();
