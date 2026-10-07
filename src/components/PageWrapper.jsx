import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useData } from '../context/DataContext';

const PageWrapper = ({ children, title, description }) => {
  const siteData = useData() || {};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteSettings = siteData.siteSettings || {};
  const isHome = !title || title === 'Beranda' || title === 'Home';
  const pageTitle = isHome 
    ? (siteSettings.seoTitle || 'Kontraktor Umum & Jasa Konstruksi Depok | PT. Abbasy Anugerah Perkasa') 
    : `${title} | ${siteSettings.seoTitle || 'PT. Abbasy Anugerah Perkasa'}`;
  const pageDescription = description || siteSettings.seoDescription || 'General Contractor & General Trade';
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://abbasyanugerahperkasa.com';

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "PT. Abbasy Anugerah Perkasa",
    "image": "https://abbasyanugerahperkasa.com/uploads/logo_transparent.png",
    "@id": "https://abbasyanugerahperkasa.com",
    "url": "https://abbasyanugerahperkasa.com",
    "telephone": siteData.contact?.phone || "021 - 38740464",
    "email": siteData.contact?.email || "abbasyanugerahperkasa523@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jatimulya Lestari Blok B no 3 Jl. Kalimulya Raya no 24, Jatimulya Cilodong",
      "addressLocality": "Depok",
      "addressRegion": "Jawa Barat",
      "addressCountry": "ID"
    },
    "areaServed": ["Depok", "Jakarta", "Bogor", "Tangerang", "Bekasi", "Jawa Barat", "Indonesia"],
    "priceRange": "$$$"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PT Abbasy Anugerah Perkasa",
    "alternateName": ["PT. Abbasy Anugerah Perkasa", "Abbasy Anugerah Perkasa", "Abbasy"],
    "url": "https://abbasyanugerahperkasa.com/"
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Navigasi Utama PT Abbasy Anugerah Perkasa",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Layanan Kami",
        "description": "Layanan kontraktor umum, manajemen konstruksi, renovasi gedung, dan instalasi MEP profesional.",
        "url": "https://abbasyanugerahperkasa.com/services"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Tentang Kami",
        "description": "Profil perusahaan, visi, misi, dan komitmen mutu PT Abbasy Anugerah Perkasa.",
        "url": "https://abbasyanugerahperkasa.com/about"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Portofolio Proyek",
        "description": "Rekam jejak dan dokumentasi proyek konstruksi yang telah diselesaikan dengan sukses.",
        "url": "https://abbasyanugerahperkasa.com/portfolio"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Hubungi Kami",
        "description": "Kontak kantor, nomor telepon, WhatsApp, dan alamat PT Abbasy Anugerah Perkasa di Depok.",
        "url": "https://abbasyanugerahperkasa.com/contact"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Struktur Organisasi",
        "description": "Bagan susunan tim kepemimpinan dan manajemen PT Abbasy Anugerah Perkasa.",
        "url": "https://abbasyanugerahperkasa.com/organization"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "Legalitas Perusahaan",
        "description": "Kelengkapan izin usaha, NIB, NPWP, dan SK Kemenkumham resmi PT Abbasy Anugerah Perkasa.",
        "url": "https://abbasyanugerahperkasa.com/legal"
      }
    ]
  };

  const breadcrumbSchema = !isHome ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://abbasyanugerahperkasa.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title || "Halaman",
        "item": currentUrl
      }
    ]
  } : null;

  const allSchemas = [websiteSchema, structuredData, navigationSchema];
  if (breadcrumbSchema) {
    allSchemas.push(breadcrumbSchema);
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {siteSettings.seoKeywords && <meta name="keywords" content={siteSettings.seoKeywords} />}
        <link rel="canonical" href={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="PT Abbasy Anugerah Perkasa" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://abbasyanugerahperkasa.com/uploads/logo_transparent.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://abbasyanugerahperkasa.com/uploads/logo_transparent.png" />
        {siteSettings.favicon && <link rel="icon" href={siteSettings.favicon} />}
        <script type="application/ld+json">
          {JSON.stringify(allSchemas)}
        </script>
      </Helmet>
      <motion.div
        className="watermark-section"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageWrapper;
