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

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {siteSettings.seoKeywords && <meta name="keywords" content={siteSettings.seoKeywords} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>
      <motion.div
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
