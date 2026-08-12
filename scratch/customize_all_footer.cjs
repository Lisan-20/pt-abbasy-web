const fs = require('fs');

// 1. Update config.yml
let config = fs.readFileSync('public/manajemen-web/config.yml', 'utf8');
const linksRegex = /              - label: "Tautan Cepat Footer"/;
if (linksRegex.test(config)) {
  config = config.replace(linksRegex, `              - {label: "Judul Kolom Tautan Cepat", name: "footerQuickLinksTitle", widget: "string", default: "Tautan Cepat"}
              - {label: "Judul Kolom Kontak", name: "footerContactTitle", widget: "string", default: "Hubungi Kami"}
              - {label: "Judul Kolom Peta", name: "footerMapTitle", widget: "string", default: "Lokasi Kantor"}
              - {label: "URL Embed Peta (Google Maps Iframe src)", name: "footerMapIframeUrl", widget: "string", required: false}
              - label: "Tautan Cepat Footer"`);
  fs.writeFileSync('public/manajemen-web/config.yml', config, 'utf8');
  console.log('Updated config.yml');
}

// 2. Update data.json
let dataStr = fs.readFileSync('src/content/data.json', 'utf8');
let data = JSON.parse(dataStr);
if (!data.siteSettings.footerContactTitle) {
  data.siteSettings.footerQuickLinksTitle = "Tautan Cepat";
  data.siteSettings.footerContactTitle = "Hubungi Kami";
  data.siteSettings.footerMapTitle = "Lokasi Kantor";
  data.siteSettings.footerMapIframeUrl = "https://maps.google.com/maps?q=Jatimulya%20Lestari%20Blok%20B%20no%203%20Jl.%20Kalimulya%20Raya%20no%2024%2C%20Jatimulya%20Cilodong%2C%20Depok%20Jawa%20Barat&t=&z=15&ie=UTF8&iwloc=&output=embed";
  fs.writeFileSync('src/content/data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('Updated data.json');
}

// 3. Update Footer.jsx
let footer = fs.readFileSync('src/components/Footer.jsx', 'utf8');

footer = footer.replace(
  /<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Tautan Cepat<\/h4>/,
  `<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>{siteSettings?.footerQuickLinksTitle || 'Tautan Cepat'}</h4>`
);

footer = footer.replace(
  /<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Hubungi Kami<\/h4>/,
  `<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>{siteSettings?.footerContactTitle || 'Hubungi Kami'}</h4>`
);

footer = footer.replace(
  /<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Lokasi Kantor<\/h4>/,
  `<h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>{siteSettings?.footerMapTitle || 'Lokasi Kantor'}</h4>`
);

const iframeRegex = /src="https:\/\/maps\.google\.com\/maps\?q=Jatimulya.*?output=embed"/;
footer = footer.replace(iframeRegex, `src={siteSettings?.footerMapIframeUrl || "https://maps.google.com/maps?q=Jatimulya%20Lestari%20Blok%20B%20no%203%20Jl.%20Kalimulya%20Raya%20no%2024%2C%20Jatimulya%20Cilodong%2C%20Depok%20Jawa%20Barat&t=&z=15&ie=UTF8&iwloc=&output=embed"}`);

fs.writeFileSync('src/components/Footer.jsx', footer, 'utf8');
console.log('Updated Footer.jsx');
