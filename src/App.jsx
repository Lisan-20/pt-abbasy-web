import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

import DynamicPage from './pages/DynamicPage';

import siteData from './content/data.json';
import './index.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {siteData.pages && siteData.pages.map((page, idx) => {
          const pagePath = page.slug === '/' ? '/' : `/${page.slug.replace(/^\//, '')}`;
          return (
            <Route 
              key={idx} 
              path={pagePath} 
              element={<DynamicPage pageData={page} siteData={siteData} />} 
            />
          );
        })}
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
