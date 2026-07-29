import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { Briefcase, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const CareersIndex = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Vite glob import for markdown JSON files
    const loadJobs = async () => {
      try {
        const modules = import.meta.glob('../content/careers/*.json');
        const jobsData = [];
        
        for (const path in modules) {
          // Only load files matching current language if we are using multiple_files i18n
          if (path.includes(`.${'id'}.json`) || !path.includes('.en.json') && !path.includes('.id.json')) {
            const mod = await modules[path]();
            // Try to extract slug from filename
            let slug = path.split('/').pop().replace('.json', '').replace(`.${'id'}`, '');
            if (mod.default.slug) slug = mod.default.slug;
            
            jobsData.push({
              ...mod.default,
              id: slug,
              slug: slug
            });
          }
        }
        
        setJobs(jobsData.filter(job => job.active !== false));
      } catch (error) {
        console.error("Failed to load careers:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJobs();
  }, ['id']);

  return (
    <PageWrapper title="Karir & Lowongan">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: 0 }}>{'Careers' || 'Karir & Lowongan'}</h1>
        <p style={{ marginTop: '20px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)' }}>
          {'Join our team' || 'Bergabunglah bersama tim profesional kami'}
        </p>
      </div>
      
      <div className="container" style={{ padding: '60px 0', minHeight: '50vh' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>{'Loading...'}</div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--color-bg-subtle)', borderRadius: '12px' }}>
            <Briefcase size={48} style={{ margin: '0 auto 20px', color: 'var(--color-text-light)' }} />
            <h3>{'No job openings' || 'Belum ada lowongan pekerjaan saat ini'}</h3>
            <p>{'Check back later' || 'Silakan periksa kembali di lain waktu.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2" style={{ gap: '30px' }}>
            {jobs.map((job, idx) => (
              <motion.div 
                key={job.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                style={{ 
                  backgroundColor: 'var(--color-bg-subtle)', 
                  padding: '30px', 
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <h3 style={{ marginBottom: '15px', color: 'var(--color-primary)' }}>{job.title}</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Briefcase size={16} /> {job.department}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={16} /> {job.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={16} /> {job.type}
                  </div>
                </div>
                
                <Link to={`/careers/${job.slug}`} className="btn btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                  {'View Details' || 'Lihat Detail'}
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default CareersIndex;
