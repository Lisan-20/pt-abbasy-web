import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import PageWrapper from '../components/PageWrapper';
import { motion } from 'framer-motion';

const HomePage = ({ data }) => {
  return (
    <PageWrapper title="Beranda">
      <Hero data={data.hero} />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '80px 0', textAlign: 'center' }}
      >
        <h2 className="section-title">Selamat Datang di PT Abbasy Anugerah Perkasa</h2>
        <p className="container" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>
          {data.siteSettings?.welcomeDescription || data.about.description}
        </p>
      </motion.div>
      <Services data={data.services.slice(0, 3)} />
    </PageWrapper>
  );
};
export default HomePage;
