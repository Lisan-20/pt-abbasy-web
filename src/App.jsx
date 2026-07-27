import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OrganizationPage from './pages/OrganizationPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ExpertsPage from './pages/ExpertsPage';
import LegalPage from './pages/LegalPage';
import ContactPage from './pages/ContactPage';
import DynamicPage from './pages/DynamicPage';

import siteData from './content/data.json';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage data={siteData} />} />
        <Route path="/about" element={<AboutPage data={siteData.about} />} />
        <Route path="/organization" element={<OrganizationPage data={siteData.organization} />} />
        <Route path="/services" element={<ServicesPage data={siteData.services} />} />
        <Route path="/portfolio" element={<PortfolioPage projects={siteData.projects} clients={siteData.clients} />} />
        <Route path="/experts" element={<ExpertsPage data={siteData.experts} />} />
        <Route path="/legal" element={<LegalPage data={siteData.legal} />} />
        <Route path="/contact" element={<ContactPage data={siteData.contact} />} />
        {siteData.customPages && siteData.customPages.map((page, idx) => (
          <Route key={idx} path={`/${page.slug}`} element={<DynamicPage pageData={page} />} />
        ))}
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const textAlignment = siteData?.siteSettings?.textAlignment || 'justify';
  const theme = siteData?.siteSettings?.theme || {};

  return (
    <HelmetProvider>
    <Router>
      <div className="app-container" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        '--global-text-alignment': textAlignment,
        ...(theme.colorPrimary && { '--color-primary': theme.colorPrimary }),
        ...(theme.colorAccent && { '--color-accent': theme.colorAccent })
      }}>
        <Navbar contact={siteData.contact} siteSettings={siteData.siteSettings} customPages={siteData.customPages} />
        <Preloader logoUrl={siteData.siteSettings?.logoImage} />
        <main style={{ flex: 1 }}>
          <AnimatedRoutes />
        </main>
        <Footer data={siteData.contact} siteSettings={siteData.siteSettings} />
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;
