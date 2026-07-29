import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { DataProvider } from './context/DataContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <DataProvider>
          <App />
        </DataProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Dummy comment to force a new JS bundle hash to bypass Cloudflare broken edge cache
console.log("App version: " + Date.now());
