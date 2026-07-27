import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const About = ({ data }) => {
  const hasItems = data.items && data.items.length > 0;

  return (
    <section className="section container">
      <div className={hasItems ? "grid grid-cols-2" : ""}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={hasItems ? {} : { maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
        >
          <h2 className="section-title" style={hasItems ? {} : { margin: '0 auto 20px auto', width: 'fit-content' }}>{data.title}</h2>
          <p style={{ marginBottom: '20px', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: hasItems ? 'var(--global-text-alignment)' : 'center' }}>{data.description}</p>
        </motion.div>
        
        {hasItems && (
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {data.items.map((item, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.02 }} className="feature-card">
                <h3 style={{ marginBottom: '10px', color: 'var(--color-primary)' }}>{item.title}</h3>
                <p style={{ whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
export default About;
