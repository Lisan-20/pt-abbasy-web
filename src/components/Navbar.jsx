import React, { useState, useEffect } from 'react';
// Remove lucide-react import
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ contact, siteSettings, customPages }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Menutup menu mobile ketika berpindah halaman
  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', minWidth: 0 }}>
          {siteSettings?.logoImage && (
            <img 
              src={siteSettings.logoImage} 
              alt="Logo PT Abbasy" 
              style={{ height: '50px', width: 'auto', objectFit: 'contain' }} 
            />
          )}
          {siteSettings?.logoText && (
            <span className="logo-text" style={{ margin: 0 }}>
              {siteSettings.logoText}
            </span>
          )}
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {siteSettings?.navigation ? (
            siteSettings.navigation.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.path} 
                className={item.isButton ? "btn btn-primary" : ""}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))
          ) : (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Beranda</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
              <Link to="/contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</Link>
            </>
          )}
          {customPages && customPages.filter(p => p.showInMenu !== false).map((page, idx) => (
            <Link key={`custom-${idx}`} to={`/${page.slug}`} onClick={() => setMobileMenuOpen(false)}>{page.title}</Link>
          ))}
        </div>

        <button className={`mobile-toggle ${mobileMenuOpen ? 'menu-open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ padding: '10px' }}>
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
