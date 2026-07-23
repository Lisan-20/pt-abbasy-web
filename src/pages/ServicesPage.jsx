import React from 'react';
import Services from '../components/Services';
import PageWrapper from '../components/PageWrapper';

const ServicesPage = ({ data }) => {
  return (
    <PageWrapper title="Layanan Kami">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Layanan Kami</h1>
      </div>
      <Services data={data} />
    </PageWrapper>
  );
};
export default ServicesPage;
