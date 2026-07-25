import React from 'react';
import Portfolio from '../components/Portfolio';
import PageWrapper from '../components/PageWrapper';

const PortfolioPage = ({ projects }) => {
  return (
    <PageWrapper title="Portofolio">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Portofolio</h1>
      </div>
      <Portfolio data={projects} />
    </PageWrapper>
  );
};
export default PortfolioPage;
