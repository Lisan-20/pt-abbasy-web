import React from 'react';
import { Settings, HardHat, Wrench, Building, Bolt, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = [Settings, HardHat, Building, Bolt, Wrench, Zap];

const Services = ({ data }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-3">
        {data.map((service, idx) => {
          const Icon = iconMap[idx % iconMap.length];
          return (
            <motion.div 
              key={idx} 
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="feature-icon" style={{ marginBottom: '20px' }}>
                <Icon size={32} />
              </div>
              <h3 style={{ marginBottom: '15px' }}>{service.title}</h3>
              <p style={{ whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>{service.description}</p>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
export default Services;
