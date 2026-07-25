import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import siteData from '../content/data.json';

const PageWrapper = ({ children, title, description }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { siteSettings } = siteData;
  const pageTitle = title ? `${title} | ${siteSettings.seoTitle || 'PT. Abbasy Anugerah Perkasa'}` : (siteSettings.seoTitle || 'PT. Abbasy Anugerah Perkasa');
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
    "priceRange": "$$$"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Abbasy Anugerah Perkasa",
    "url": "https://abbasyanugerahperkasa.com/"
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {siteSettings.seoKeywords && <meta name="keywords" content={siteSettings.seoKeywords} />}
        <link rel="canonical" href={currentUrl} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Abbasy Anugerah Perkasa" />
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
          {JSON.stringify([websiteSchema, structuredData])}
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
