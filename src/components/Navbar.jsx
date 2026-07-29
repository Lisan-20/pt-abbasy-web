import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ contact, siteSettings, customPages }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdownIdx, setOpenDropdownIdx] = useState(null);
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
    setOpenDropdownIdx(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleDropdown = (idx, e) => {
    e.preventDefault();
    setOpenDropdownIdx(openDropdownIdx === idx ? null : idx);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px', minWidth: 0 }}>
          {siteSettings?.logoImage && (
            <div className="logo-img-wrapper">
              <img 
                src={siteSettings.logoImage} 
                alt="Logo PT Abbasy" 
              />
            </div>
          )}
          {siteSettings?.logoText && (
            <span className="logo-text" style={{ margin: 0 }}>
              {siteSettings.logoText}
            </span>
          )}
        </Link>
        
        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {siteSettings?.navigation ? (
            siteSettings.navigation.map((item, idx) => {
              const hasChildren = item.children && item.children.length > 0;
              
              if (hasChildren) {
                return (
                  <div 
                    key={idx} 
                    className={`nav-item dropdown ${openDropdownIdx === idx ? 'mobile-open' : ''}`}
                    onMouseEnter={() => !mobileMenuOpen && setOpenDropdownIdx(idx)}
                    onMouseLeave={() => !mobileMenuOpen && setOpenDropdownIdx(null)}
                  >
                    <div 
                      className="nav-link dropdown-toggle" 
                      onClick={(e) => mobileMenuOpen && toggleDropdown(idx, e)}
                    >
                      {item.path ? (
                        <Link to={item.path} onClick={(e) => {
                          if (mobileMenuOpen) e.preventDefault(); // On mobile, click toggles accordion
                        }}>{item.label}</Link>
                      ) : (
                        <span>{item.label}</span>
                      )}
                      <ChevronDown className="dropdown-icon" size={16} />
                    </div>
                    
                    <div className="dropdown-menu">
                      {item.children.map((child, cIdx) => (
                        <Link 
                          key={cIdx} 
                          to={child.path} 
                          className="dropdown-item"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link 
                  key={idx} 
                  to={item.path || '#'} 
                  className={item.isButton ? "btn btn-primary" : "nav-link"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })
          ) : (
            <>
              <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Beranda</Link>
              <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Tentang Kami</Link>
              <Link to="/contact" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</Link>
            </>
          )}
          {customPages && customPages.filter(p => p.showInMenu !== false).map((page, idx) => (
            <Link key={`custom-${idx}`} to={`/${page.slug}`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{page.title}</Link>
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
