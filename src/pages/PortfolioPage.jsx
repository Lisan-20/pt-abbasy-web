import React from 'react';
import Portfolio from '../components/Portfolio';
import PageWrapper from '../components/PageWrapper';

const PortfolioPage = ({ projects, clients }) => {
  return (
    <PageWrapper title="Portofolio Proyek">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Portofolio & Klien</h1>
      </div>
      <Portfolio data={projects} clients={clients} />
    </PageWrapper>
  );
};
export default PortfolioPage;
