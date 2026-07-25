import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  return (
    <section className="section container">
      <div className="grid grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">{data.title}</h2>
          <p style={{ marginBottom: '20px', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>{data.description}</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <motion.div whileHover={{ scale: 1.02 }} className="feature-card">
            <h3 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Visi Kami</h3>
            <p style={{ whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>{data.vision}</p>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} className="feature-card">
            <h3 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>Misi Kami</h3>
            <p style={{ whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>{data.mission}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default About;
