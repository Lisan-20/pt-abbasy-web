import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Portfolio from '../components/Portfolio';
import Organization from '../components/Organization';
import Experts from '../components/Experts';
import Legal from '../components/Legal';
import Contact from '../components/Contact';
import ClientsMarquee from '../components/ClientsMarquee';

const DynamicPage = ({ pageData, siteData }) => {
  if (!pageData) {
    return (
      <PageWrapper title="Halaman Tidak Ditemukan">
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Halaman ini belum memiliki konten.</h2>
        </div>
      </PageWrapper>
    );
  }

  const hasHeroFirst = pageData.blocks && pageData.blocks.length > 0 && pageData.blocks[0].type === 'heroBlock';

  return (
    <PageWrapper title={pageData.title}>
      {!hasHeroFirst && (
        <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
          <h1 style={{ color: 'white', margin: 0 }}>{pageData.title}</h1>
        </div>
      )}
      {/* Fallback jika tidak ada block */}
      {(!pageData.blocks || pageData.blocks.length === 0) && (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Halaman ini belum memiliki blok konten.</h2>
          <p>Silakan tambah blok di halaman Admin.</p>
        </div>
      )}

      {/* Render blocks berurutan */}
      {pageData.blocks && pageData.blocks.map((block, index) => {
        const bgStyle = { backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' };
        
        switch (block.type) {
          case 'heroBlock':
            return <Hero key={index} data={block} />;
          
          case 'aboutBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <About data={block} />
              </div>
            );
          
          case 'servicesBlock':
            const servicesData = block.limit && block.limit > 0 && siteData.services 
              ? siteData.services.slice(0, block.limit) 
              : siteData.services;
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                {block.title && (
                  <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="section-title">{block.title}</h2>
                  </div>
                )}
                <Services data={servicesData} />
              </div>
            );
            
          case 'galleryBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <Gallery data={block} />
              </div>
            );

          case 'portfolioBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                {block.title && (
                  <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h2 className="section-title">{block.title}</h2>
                  </div>
                )}
                <Portfolio data={siteData.projects} />
              </div>
            );

          case 'organizationBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <Organization data={siteData.organization} title={block.title} />
              </div>
            );

          case 'expertsBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <Experts data={siteData.experts} title={block.title} />
              </div>
            );

          case 'legalBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <Legal data={siteData.legal} title={block.title} />
              </div>
            );

          case 'contactBlock':
            return (
              <div key={index} style={{ padding: '60px 0', ...bgStyle }}>
                <Contact data={siteData.contact} />
              </div>
            );

          case 'clientsMarqueeBlock':
            return block.active !== false ? (
              <div key={index}>
                <ClientsMarquee clients={siteData.clients} />
              </div>
            ) : null;

          case 'markdownBlock':
            return (
              <div key={index} className="container" style={{ padding: '60px 0', ...bgStyle }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment, justify)' }}>
                  {block.content}
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </PageWrapper>
  );
};

export default DynamicPage;
