import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const NotFound = () => {
  return (
    <PageWrapper title="404 - Halaman Tidak Ditemukan">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3a5c 100%)', padding: '40px 20px', textAlign: 'center' }}>
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{ fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: '900', color: 'var(--color-accent)', lineHeight: 1, letterSpacing: '-4px' }}
          >
            404
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ color: 'white', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', marginBottom: '16px' }}
          >
            Halaman Tidak Ditemukan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}
          >
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px' }}>
              ← Kembali ke Beranda
            </Link>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
