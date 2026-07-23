import React from 'react';
import About from '../components/About';
import PageWrapper from '../components/PageWrapper';

const AboutPage = ({ data }) => {
  return (
    <PageWrapper title="Tentang Kami">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Tentang Kami</h1>
      </div>
      <About data={data} />
    </PageWrapper>
  );
};
export default AboutPage;
