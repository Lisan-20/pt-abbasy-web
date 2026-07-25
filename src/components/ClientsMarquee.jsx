import React from 'react';
import './ClientsMarquee.css';

const ClientsMarquee = ({ clients }) => {
  if (!clients || clients.length === 0) return null;

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
      <div className="container">
        <h2 className="section-title text-center" style={{ marginBottom: '40px' }}>Klien Kami</h2>
        
        <div className="marquee-container">
          <div className="marquee-content">
            {/* Render dua kali untuk infinite scroll */}
            {[...clients, ...clients].map((client, idx) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsMarquee;
