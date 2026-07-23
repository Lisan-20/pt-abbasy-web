import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = ({ data }) => {
  const bgImageUrl = data.bgImage || 'https://images.unsplash.com/photo-1541888086925-0c13d4cc5dfc?q=80&w=2000&auto=format&fit=crop';
  
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${bgImageUrl})` }}>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-headline fade-in-up">{data.headline}</h1>
        <p className="hero-subheadline fade-in-up" style={{ animationDelay: '0.2s' }}>{data.subheadline}</p>
        <div className="hero-actions fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link to="/contact" className="btn btn-primary">Konsultasi Gratis <ArrowRight size={20} /></Link>
          <Link to="/services" className="btn btn-secondary hero-btn-secondary">Layanan Kami</Link>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="scroll-indicator" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrow-scroll"></div>
      </div>
    </section>
  );
};
export default Hero;
