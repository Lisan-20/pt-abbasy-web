import React, { useState } from 'react';
import { FileText, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

const Legal = ({ data, title }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const legalData = data || {};
  const coverImgObj = legalData.legalImages && legalData.legalImages.length > 0 ? legalData.legalImages.find(img => img && img.image && img.image.trim() !== '') : null;
  const coverImage = coverImgObj ? coverImgObj.image : null;

  return (
    <div className="section container">
      {title && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-2" style={{ marginBottom: '40px' }}>
        <motion.div 
          className="contact-info" 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ backgroundColor: 'var(--color-bg-subtle)', borderRadius: '8px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h3 className="mb-4" style={{ color: 'var(--color-accent)' }}>Informasi Legal Perusahaan</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '20px', listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>Nama:</strong> {legalData.companyName}</span></li>
            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><FileText className="text-accent" /> <span><strong>Akta Pendirian:</strong> {legalData.deed}</span></li>
            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>NIB:</strong> {legalData.nib}</span></li>
            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>NPWP:</strong> {legalData.npwp}</span></li>
            <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><FileText className="text-accent" /> <span><strong>SK Kemenkumham:</strong> {legalData.sk}</span></li>
          </ul>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}
        >
          {coverImage ? (
            <div 
              className="portfolio-card" 
              onClick={() => setIsLightboxOpen(true)}
              style={{ cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
            >
               <div className="portfolio-image" style={{ height: '350px', backgroundImage: `url(${coverImage})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'relative', backgroundColor: 'white' }}>
                  <div className="portfolio-image-overlay">
                    <span className="portfolio-overlay-text">Klik untuk melihat semua foto</span>
                  </div>
                </div>
            </div>
          ) : (
             <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>Dokumen belum diunggah</div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 20px 40px 20px', overflowY: 'auto' }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'white', borderRadius: '12px', padding: '30px', marginTop: '20px', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <div 
                onClick={() => setIsLightboxOpen(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', color: '#64748b', cursor: 'pointer', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={24} />
              </div>
              <h2 style={{ marginBottom: '20px', color: 'var(--color-primary)' }}>Semua Dokumen Legalitas</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {legalData.legalImages && legalData.legalImages.map((imgObj, i) => (
                  imgObj.image && (
                    <img key={i} src={imgObj.image} alt={`Legal Document ${i+1}`} style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Legal;
