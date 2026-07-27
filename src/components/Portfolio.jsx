import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Portfolio.css';

const Portfolio = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // function to get first image or fallback
  const getCoverImage = (project) => {
    if (project.images && project.images.length > 0) {
      const validImg = project.images.find(img => img && img.image && img.image.trim() !== '');
      if (validImg) return validImg.image;
    }
    return null;
  };

  return (
    <section className="section">
      <div className="container">
        
        {/* Projects Gallery */}
        <div className="grid grid-cols-3" style={{ marginBottom: '60px' }}>
          {data.map((project, idx) => {
            const coverImage = getCoverImage(project);
            return (
              <motion.div 
                key={idx} 
                className="portfolio-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                style={{ cursor: 'pointer' }}
              >
                {coverImage ? (
                  <div className="portfolio-image" style={{ height: '200px', backgroundImage: `url(${coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                    <div className="portfolio-image-overlay">
                      <span className="portfolio-overlay-text">Klik untuk melihat semua foto</span>
                    </div>
                  </div>
                ) : (
                  <div className="portfolio-image" style={{ height: '200px', backgroundColor: 'var(--color-primary-light)', position: 'relative' }}>
                    <div className="portfolio-image-overlay">
                      <span className="portfolio-overlay-text">Klik untuk melihat semua foto</span>
                    </div>
                  </div>
                )}
                <div className="portfolio-content">
                  <h3 className="portfolio-title">{project.title}</h3>
                  <p className="text-accent" style={{ fontWeight: '600', marginBottom: '10px' }}>{project.client}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '10px' }}>
                    <span style={{ color: 'rgba(255,255,255,0.8)', flex: 1, paddingRight: '10px' }}>{project.purpose}</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{project.status}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clients section has been moved to HomePage via ClientsMarquee component */}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '120px 20px 40px 20px', overflowY: 'auto' }}
            onClick={() => setSelectedProject(null)}
          >
            <div style={{ width: '100%', maxWidth: '900px', backgroundColor: 'white', borderRadius: '12px', padding: '30px', marginTop: '20px', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <div 
                onClick={() => setSelectedProject(null)}
                style={{ position: 'absolute', top: '15px', right: '15px', color: '#64748b', cursor: 'pointer', backgroundColor: '#f1f5f9', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={24} />
              </div>
              <h2 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>{selectedProject.title}</h2>
              <h4 style={{ marginBottom: '20px', color: 'var(--color-accent)' }}>Klien: {selectedProject.client}</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  selectedProject.images.map((imgObj, i) => (
                    imgObj.image && (
                      <img key={i} src={imgObj.image} alt={`${selectedProject.title} - ${i+1}`} style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                    )
                  ))
                ) : (
                  <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b' }}>
                    Belum ada foto untuk proyek ini.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
export default Portfolio;
