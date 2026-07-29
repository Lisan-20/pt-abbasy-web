import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Static translations for UI elements (not CMS content)
const resources = {
  id: {
    translation: {
      "Read More": "Baca Selengkapnya",
      "Back to Home": "Kembali ke Beranda",
      "Page Not Found": "Halaman Tidak Ditemukan",
      "Loading...": "Memuat...",
      "Contact Us": "Hubungi Kami",
      "Location": "Lokasi",
      "Department": "Departemen",
      "Job Type": "Tipe Pekerjaan",
      "Apply Now": "Lamar Sekarang",
      "Search": "Cari",
      "All Categories": "Semua Kategori",
      "Published on": "Diterbitkan pada"
    }
  },
  en: {
    translation: {
      "Read More": "Read More",
      "Back to Home": "Back to Home",
      "Page Not Found": "Page Not Found",
      "Loading...": "Loading...",
      "Contact Us": "Contact Us",
      "Location": "Location",
      "Department": "Department",
      "Job Type": "Job Type",
      "Apply Now": "Apply Now",
      "Search": "Search",
      "All Categories": "All Categories",
      "Published on": "Published on"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'id', // Default language is Indonesian
    interpolation: {
      escapeValue: false // React already escapes values to prevent XSS
    }
  });

export default i18n;
