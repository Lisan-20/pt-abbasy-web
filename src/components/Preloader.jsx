import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ logoUrl }) => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Tampilkan loading setiap kali rute halaman berubah
    setIsVisible(true);
    
    // Sembunyikan setelah 0.8 detik agar tidak mengganggu kecepatan navigasi
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img 
            src={logoUrl || '/uploads/logo_transparent.png'} 
            alt="Loading PT Abbasy Anugerah Perkasa..."
            className="preloader-logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: [0, 1, 1]
            }}
            transition={{ 
              duration: 1.5,
              ease: "easeOut"
            }}
          />
          
          <motion.div 
            className="preloader-spinner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
