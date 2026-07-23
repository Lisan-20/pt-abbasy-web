import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = ({ data }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!data || !data.photos || data.photos.length === 0) return null;

  return (
    <div className="container">
      {data.title && (
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="section-title">{data.title}</h2>
        </div>
      )}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        padding: '20px 0'
      }}>
        {data.photos.map((photo, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              aspectRatio: '1 / 1', // Square thumbnails
              backgroundColor: 'var(--color-bg-subtle)',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img 
              src={photo.image} 
              alt={photo.caption || `Gallery image ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
            {photo.caption && (
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '20px 15px 15px',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                {photo.caption}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '30px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '40px',
                cursor: 'pointer',
                zIndex: 100000
              }}
            >
              &times;
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedPhoto.image}
              alt={selectedPhoto.caption || 'Expanded view'}
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            />
            {selectedPhoto.caption && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  position: 'absolute',
                  bottom: '40px',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '1.1rem'
                }}
              >
                {selectedPhoto.caption}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
