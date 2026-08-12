import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onEnter, logoUrl, audioUrl }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Mencegah scroll saat welcome screen aktif
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  const handleEnter = () => {
    // Memutar audio
    const audioSource = audioUrl || '/assets/audio/welcome.mp3';
    const audio = new Audio(audioSource);
    audio.play().catch(e => console.error("Audio play failed:", e));
    
    // Menutup welcome screen
    setIsVisible(false);
    
    // Memberi tahu parent (App.jsx) bahwa pengguna sudah masuk
    if (onEnter) {
      setTimeout(onEnter, 800); // Tunggu sampai animasi fade out selesai
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="welcome-screen-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          onClick={handleEnter}
          style={{ cursor: 'pointer' }}
        >
          <div className="welcome-background-glow"></div>
          
          <div className="welcome-content">
            <motion.img 
              src={logoUrl || '/uploads/logo_transparent.png'} 
              alt="Logo PT Abbasy Anugerah Perkasa" 
              className="welcome-logo"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
            
            <motion.h1 
              className="welcome-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Selamat Datang di <br/> PT Abbasy Anugerah Perkasa
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5, duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
              style={{ marginTop: '40px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px' }}
            >
              Klik di mana saja untuk melanjutkan
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
