import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Fix Leaflet marker icons issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically set map view
const MapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const ProjectMap = ({ projects = [], data }) => {
  const { t } = useTranslation();
  const title = data?.title || "Peta Proyek";
  const focus = data?.focus || "Indonesia";
  
  // Default to Indonesia center
  const [center, setCenter] = useState([-0.789275, 113.921327]);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (focus === 'Dunia') {
      setCenter([20, 0]);
      setZoom(2);
    } else {
      setCenter([-0.789275, 113.921327]);
      setZoom(5);
    }
  }, [focus]);

  // Filter out projects that don't have valid lat/lng
  const mapProjects = projects.filter(p => p && p.lat != null && p.lng != null);

  return (
    <div className="container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <h2 className="section-title">{title}</h2>
        <p style={{ color: 'var(--color-text-light)', marginTop: '10px' }}>
          {t('Our projects across')} {focus === 'Dunia' ? 'the globe' : 'Indonesia'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ 
          height: '500px', 
          width: '100%', 
          borderRadius: '12px', 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          {/* Dark theme tiles for premium look */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          <MapView center={center} zoom={zoom} />
          
          {mapProjects.map((project, idx) => (
            <Marker key={idx} position={[project.lat, project.lng]}>
              <Popup>
                <div style={{ padding: '5px' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: 'var(--color-primary)', fontWeight: 'bold' }}>{project.title}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#555' }}>
                    <strong>Client:</strong> {project.client}
                  </p>
                  <p style={{ margin: '0', fontSize: '12px', color: '#777' }}>
                    {project.category || 'General'}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default ProjectMap;
