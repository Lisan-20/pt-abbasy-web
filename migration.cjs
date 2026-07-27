const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'content', 'data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const pages = [];

pages.push({
  title: "Beranda",
  slug: "/",
  showInMenu: false,
  blocks: [
    {
      type: "heroBlock",
      headline: data.hero?.headline || "",
      subheadline: data.hero?.subheadline || "",
      bgImage: data.hero?.bgImage || ""
    },
    {
      type: "aboutBlock",
      title: "Selamat Datang di PT Abbasy Anugerah Perkasa",
      description: data.siteSettings?.welcomeDescription || "",
      vision: "",
      mission: ""
    },
    {
      type: "servicesBlock",
      title: "Layanan & Fitur",
      limit: 3
    },
    {
      type: "clientsMarqueeBlock"
    }
  ]
});

pages.push({
  title: "Tentang Kami",
  slug: "about",
  showInMenu: false,
  blocks: [
    {
      type: "aboutBlock",
      title: data.about?.title || "Tentang Kami",
      description: data.about?.description || "",
      vision: data.about?.vision || "",
      mission: data.about?.mission || ""
    }
  ]
});

pages.push({
  title: "Struktur Organisasi",
  slug: "organization",
  showInMenu: false,
  blocks: [
    { type: "organizationBlock", title: "Struktur Organisasi Perusahaan" }
  ]
});

pages.push({
  title: "Layanan",
  slug: "services",
  showInMenu: false,
  blocks: [
    { type: "servicesBlock", title: "Layanan Kami", limit: 0 }
  ]
});

pages.push({
  title: "Portofolio",
  slug: "portfolio",
  showInMenu: false,
  blocks: [
    { type: "portfolioBlock", title: "Proyek Kami" },
    { type: "clientsMarqueeBlock" }
  ]
});

pages.push({
  title: "Tenaga Ahli",
  slug: "experts",
  showInMenu: false,
  blocks: [
    { type: "expertsBlock", title: "Sertifikasi Tenaga Ahli" }
  ]
});

pages.push({
  title: "Legalitas",
  slug: "legal",
  showInMenu: false,
  blocks: [
    { type: "legalBlock", title: "Legalitas Perusahaan" }
  ]
});

pages.push({
  title: "Hubungi Kami",
  slug: "contact",
  showInMenu: false,
  blocks: [
    { type: "contactBlock", title: "Hubungi Kami" }
  ]
});

if (data.customPages && data.customPages.length > 0) {
  data.customPages.forEach(p => pages.push(p));
}

data.pages = pages;
delete data.hero;
delete data.about;
delete data.customPages;

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log("Data migration successful.");
