import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = ({ data, siteSettings }) => {
  return (
    <footer style={{ position: 'relative', zIndex: 10, backgroundColor: '#030a16', color: 'rgba(255,255,255,0.7)', paddingTop: '80px', paddingBottom: '30px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div className="container">
        <div className="grid grid-cols-4" style={{ marginBottom: '60px', gap: '40px' }}>
          
          {/* Column 1: About */}
          <div>
            <h3 style={{ color: 'white', marginBottom: '25px', fontSize: '1.5rem' }}>{siteSettings?.footerTitle || 'PT. Abbasy'}</h3>
            <p style={{ marginBottom: '20px', lineHeight: '1.8', whiteSpace: 'pre-line', textAlign: 'var(--global-text-alignment)' }}>
              {siteSettings?.footerDescription || 'Menjadi perusahaan terkemuka di bidang Konstruksi, Perdagangan Umum, dan Jasa dengan layanan berkualitas internasional.'}
            </p>
            <div style={{ display: 'flex', gap: '15px' }}>
              {data?.facebook && (
                <a href={data.facebook} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
              )}
              {data?.instagram && (
                <a href={data.instagram} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
              {data?.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', transition: 'all 0.3s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Tautan Cepat</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {siteSettings?.footerQuickLinks ? (
                siteSettings.footerQuickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link to="/about" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Tentang Kami</Link></li>
                  <li><Link to="/services" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Layanan Kami</Link></li>
                  <li><Link to="/portfolio" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Portofolio Proyek</Link></li>
                  <li><Link to="/experts" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Tenaga Ahli</Link></li>
                  <li><Link to="/legal" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>Legalitas</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Hubungi Kami</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <MapPin className="text-accent" size={20} style={{ flexShrink: 0, marginTop: '5px' }} />
                <span>{data?.address}</span>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Phone className="text-accent" size={20} style={{ flexShrink: 0 }} />
                <span>{data?.phone}</span>
              </li>
              {data?.whatsapp && (
                <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <svg className="text-accent" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <a href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                    {data.whatsapp}
                  </a>
                </li>
              )}
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Mail className="text-accent" size={20} style={{ flexShrink: 0 }} />
                <span>{data?.email}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Maps/Business */}
          <div>
            <h4 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Lokasi Kantor</h4>
            <div style={{ width: '100%', height: '150px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Jatimulya%20Lestari%20Blok%20B%20no%203%20Jl.%20Kalimulya%20Raya%20no%2024%2C%20Jatimulya%20Cilodong%2C%20Depok%20Jawa%20Barat&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} PT. Abbasy Anugerah Perkasa. All rights reserved.</p>
          <p>Designed with ❤️ for Excellence</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
