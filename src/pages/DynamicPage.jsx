import React from 'react';
import PageWrapper from '../components/PageWrapper';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Gallery from '../components/Gallery';

const DynamicPage = ({ pageData }) => {
  if (!pageData) {
    return (
      <PageWrapper title="Halaman Tidak Ditemukan">
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Halaman ini belum memiliki konten.</h2>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={pageData.title}>
      {/* Jika tidak ada blocks sama sekali */}
      {(!pageData.blocks || pageData.blocks.length === 0) && (
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Halaman ini belum memiliki blok konten.</h2>
          <p>Silakan tambah blok di halaman Admin.</p>
        </div>
      )}

      {/* Render blocks */}
      {pageData.blocks && pageData.blocks.map((block, index) => {
        switch (block.type) {
          case 'heroBlock':
            return <Hero key={index} data={block} />;
          
          case 'aboutBlock':
            return (
              <div key={index} style={{ padding: '60px 0', backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' }}>
                <About data={block} />
              </div>
            );
          
          case 'servicesBlock':
            return (
              <div key={index} style={{ padding: '60px 0', backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' }}>
                <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <h2 className="section-title">Layanan & Fitur</h2>
                </div>
                <Services data={block.items || []} />
              </div>
            );
            
          case 'galleryBlock':
            return (
              <div key={index} style={{ padding: '60px 0', backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' }}>
                <Gallery data={block} />
              </div>
            );

          case 'markdownBlock':
            return (
              <div key={index} className="container" style={{ padding: '60px 0', backgroundColor: index % 2 === 0 ? 'transparent' : 'var(--color-bg-subtle)' }}>
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
