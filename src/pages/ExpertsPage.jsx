import React, { useState } from 'react';
import { Award, X } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertsPage = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <PageWrapper title="Tenaga Ahli">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Dukungan Tenaga Ahli</h1>
      </div>
      
      <div className="section container">
        <div className="grid grid-cols-2" style={{ gap: '30px' }}>
          {data.map((expert, idx) => (
            <motion.div 
              key={idx} 
              className="feature-card" 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              <div>
                <h3 className="mb-2" style={{ fontSize: '1.5rem' }}>{expert.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-accent)', fontWeight: '600', fontSize: '1.1rem' }}>
                  <Award size={24} />
                  <span>{expert.qualification}</span>
                </div>
              </div>
              
              {expert.images && expert.images.length > 0 && (
                <div style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                  {expert.images.map((imgObj, imgIdx) => (
                    imgObj.image ? (
                      <motion.div 
                        key={imgIdx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(imgObj.image)}
                        style={{ width: '150px', height: '150px', flexShrink: 0, overflow: 'hidden', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                      >
                        <img 
                          src={imgObj.image} 
                          alt={`${expert.name} Certificate`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      </motion.div>
                    ) : null
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Pop-up */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: 9999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10000
              }}
            >
              <X size={40} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Enlarged Certificate"
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default ExpertsPage;
