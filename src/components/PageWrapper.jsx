import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import siteData from '../content/data.json';

const PageWrapper = ({ title, children }) => {
  useEffect(() => {
    const siteTitle = siteData.siteSettings?.logoText || "PT. Abbasy Anugerah Perkasa";
    document.title = title ? `${title} - ${siteTitle}` : siteTitle;

    if (siteData.siteSettings?.favicon) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = siteData.siteSettings.favicon;
    }
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
