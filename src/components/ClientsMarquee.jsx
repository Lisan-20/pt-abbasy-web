import React from 'react';
import './ClientsMarquee.css';

const ClientsMarquee = ({ clients }) => {
  if (!clients || clients.length === 0) return null;

  // Render client card helper
  const renderClientCard = (client, idx) => (
    <div key={idx} className="client-logo-card">
      {client.logo ? (
        <>
          <img src={client.logo} alt={client.name} className="client-logo-img" title={client.name} style={{ height: '60px', marginBottom: '8px' }} />
          <span className="client-logo-text" style={{ fontSize: '0.85rem', color: '#64748b' }}>{client.name}</span>
        </>
      ) : (
        <span className="client-logo-text">{client.name}</span>
      )}
    </div>
  );

  // Menggandakan array agar cukup panjang di layar resolusi besar (4K)
  const repeatedClients = [...clients, ...clients, ...clients, ...clients];

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Klien Kami</h2>
        
        <div className="marquee-container">
          <div className="marquee-content">
            {repeatedClients.map((client, idx) => renderClientCard(client, `set1-${idx}`))}
          </div>
          {/* Duplikat bayangan untuk ilusi perputaran tanpa putus (seamless loop) */}
          <div className="marquee-content" aria-hidden="true">
            {repeatedClients.map((client, idx) => renderClientCard(client, `set2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
