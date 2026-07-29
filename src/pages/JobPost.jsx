import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Briefcase, MapPin, Clock, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const JobPost = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
    const siteData = useData();

  useEffect(() => {
    const loadJob = async () => {
      try {
        const modules = import.meta.glob('../content/careers/*.json');
        
        let foundJob = null;
        for (const path in modules) {
          if (path.includes(id) && (path.includes(`.${'id'}.json`) || (!path.includes('.en.json') && !path.includes('.id.json')))) {
            const mod = await modules[path]();
            foundJob = mod.default;
            break;
          }
        }
        
        if (foundJob) {
          setJob(foundJob);
        } else {
          // If not found in current language, try the other as fallback
          for (const path in modules) {
            if (path.includes(id)) {
              const mod = await modules[path]();
              foundJob = mod.default;
              break;
            }
          }
          setJob(foundJob);
        }
      } catch (error) {
        console.error("Failed to load job post", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadJob();
  }, [id, 'id']);

  if (loading) {
    return <PageWrapper title="Loading..."><div style={{ padding: '100px 0', textAlign: 'center' }}>Memuat...</div></PageWrapper>;
  }

  if (!job) {
    return (
      <PageWrapper title="Lowongan Tidak Ditemukan">
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Lowongan pekerjaan tidak ditemukan atau sudah ditutup.</h2>
          <Link to="/careers" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>Kembali ke Karir</Link>
        </div>
      </PageWrapper>
    );
  }
  
  const emailHR = siteData?.contact?.email || 'hrd@abbasy.co.id';
  const waHR = siteData?.contact?.whatsapp || '';
  
  const applyEmailUrl = `mailto:${emailHR}?subject=Lamaran Pekerjaan: ${job.title}&body=Halo HRD PT Abbasy,%0D%0A%0D%0ASaya tertarik untuk melamar posisi ${job.title}. Bersama email ini saya lampirkan CV saya.`;
  const applyWaUrl = waHR ? `https://wa.me/${waHR}?text=Halo HRD PT Abbasy, saya ingin melamar posisi ${job.title}.` : applyEmailUrl;

  return (
    <PageWrapper title={`${job.title} | Karir`}>
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '140px 0 60px', textAlign: 'center' }}>
        <h1 style={{ color: 'white', margin: '0 0 20px 0' }}>{job.title}</h1>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px', color: 'rgba(255,255,255,0.8)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={18} /> {job.department}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} /> {job.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} /> {job.type}
          </div>
        </div>
      </div>
      
      <div className="container" style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
        <Link to="/careers" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: 'var(--color-text-light)', marginBottom: '30px', textDecoration: 'none' }}>
          <ArrowLeft size={16} /> {'Back to Careers' || 'Kembali ke Daftar Karir'}
        </Link>
        
        <div style={{ backgroundColor: 'var(--color-bg-subtle)', padding: '40px', borderRadius: '12px', marginBottom: '40px' }}>
          <h3 style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Deskripsi Pekerjaan</h3>
          <div className="markdown-content" style={{ marginBottom: '40px', lineHeight: '1.8' }}>
            <ReactMarkdown>{job.description || ''}</ReactMarkdown>
          </div>
          
          <h3 style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '10px', marginBottom: '20px' }}>Persyaratan</h3>
          <div className="markdown-content" style={{ marginBottom: '40px', lineHeight: '1.8' }}>
            <ReactMarkdown>{job.requirements || ''}</ReactMarkdown>
          </div>
          
          <div style={{ marginTop: '50px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href={applyEmailUrl} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <Send size={18} /> Lamar via Email
            </a>
            {waHR && (
              <a href={applyWaUrl} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                Lamar via WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default JobPost;
