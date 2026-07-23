import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = ({ data }) => {
  return (
    <section className="section container">
      <div className="grid grid-cols-2">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Hubungi Kami</h2>
          <p style={{ marginBottom: '30px' }}>Silakan hubungi kami untuk mendiskusikan proyek Anda selanjutnya. Tim kami siap membantu Anda 24/7.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', gap: '15px' }}>
              <div className="feature-icon"><MapPin size={24} /></div>
              <div>
                <h4>Kantor Pusat</h4>
                <p>{data.address}</p>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', gap: '15px' }}>
              <div className="feature-icon"><Phone size={24} /></div>
              <div>
                <h4>Telepon</h4>
                <p>{data.phone}</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', gap: '15px' }}>
              <div className="feature-icon"><Mail size={24} /></div>
              <div>
                <h4>Email</h4>
                <p>{data.email}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '40px', borderRadius: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
        >
          <MessageCircle size={64} style={{ color: '#25D366', marginBottom: '20px' }} />
          <h3 style={{ marginBottom: '15px' }}>Konsultasi Cepat</h3>
          <p style={{ marginBottom: '30px' }}>Dapatkan respon instan dari tim representatif kami melalui WhatsApp.</p>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary" 
            style={{ backgroundColor: '#25D366', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '15px 30px' }}
          >
            <MessageCircle size={24} />
            Chat WhatsApp
          </motion.a>
        </motion.div>
      </div>

      {/* Google Maps Embed */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '50px', width: '100%', height: '450px', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
      >
        <iframe 
          title="Lokasi Kantor PT Abbasy"
          width="100%" 
          height="100%" 
          frameBorder="0" 
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(data.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          allowFullScreen
        ></iframe>
      </motion.div>
    </section>
  );
};
export default Contact;
