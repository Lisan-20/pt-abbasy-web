import React, { useState } from 'react';
import { FileText, CheckCircle, X } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';
import '../components/Portfolio.css';

const LegalPage = ({ data }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const coverImage = data.legalImages && data.legalImages.length > 0 ? data.legalImages[0].image : null;

  return (
    <PageWrapper title="Legalitas">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Legalitas & Izin Perusahaan</h1>
      </div>
      <div className="section container">
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
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>Nama:</strong> {data.companyName}</span></li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><FileText className="text-accent" /> <span><strong>Akta Pendirian:</strong> {data.deed}</span></li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>NIB:</strong> {data.nib}</span></li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><CheckCircle className="text-accent" /> <span><strong>NPWP:</strong> {data.npwp}</span></li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}><FileText className="text-accent" /> <span><strong>SK Kemenkumham:</strong> {data.sk}</span></li>
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
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', overflowY: 'auto' }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div style={{ position: 'absolute', top: '20px', right: '30px', color: 'white', cursor: 'pointer', backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '50%' }}>
              <X size={32} />
            </div>
            
            <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'white', borderRadius: '12px', padding: '30px', marginTop: '20px' }} onClick={e => e.stopPropagation()}>
              <h2 style={{ marginBottom: '20px', color: 'var(--color-primary)' }}>Semua Dokumen Legalitas</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {data.legalImages.map((imgObj, i) => (
                  imgObj.image && (
                    <img key={i} src={imgObj.image} alt={`Legal Document ${i+1}`} style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  )
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageWrapper>
  );
};
export default LegalPage;
