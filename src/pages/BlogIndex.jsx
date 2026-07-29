import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User } from 'lucide-react';

const BlogIndex = () => {
  // Load all articles using Vite's glob import
  const articleModules = import.meta.glob('../content/articles/*.json', { eager: true });
  const articles = Object.values(articleModules)
    .map(mod => mod.default || mod)
    .filter(a => a.title && a.slug)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      <Helmet>
        <title>Blog & Berita - PT. Abbasy Anugerah Perkasa</title>
        <meta name="description" content="Kumpulan berita, artikel, dan update terbaru dari PT. Abbasy Anugerah Perkasa." />
      </Helmet>

      {/* Header Banner */}
      <section style={{
        padding: '120px 20px 60px',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3a5c 100%)',
        textAlign: 'center',
        color: 'white'
      }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '20px', color: '#ffffff' }}
        >
          Blog & Berita
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}
        >
          Kumpulan informasi, insight, dan update proyek terbaru dari perusahaan kami.
        </motion.p>
      </section>

      {/* Articles Grid */}
      <section className="container" style={{ padding: '80px 20px', minHeight: '50vh' }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {articles.map((article, idx) => (
              <motion.article 
                key={article.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
                }}
              >
                {article.thumbnail && (
                  <Link to={`/blog/${article.slug}`} style={{ display: 'block', height: '220px', overflow: 'hidden' }}>
                    <img 
                      src={article.thumbnail} 
                      alt={article.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    />
                  </Link>
                )}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.85rem', color: '#666' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} />
                      {article.author || 'Admin'}
                    </span>
                  </div>
                  <Link to={`/blog/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '12px', color: 'var(--color-primary)', lineHeight: 1.4 }}>
                      {article.title}
                    </h2>
                  </Link>
                  <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                    {article.summary}
                  </p>
                  <Link 
                    to={`/blog/${article.slug}`} 
                    style={{ 
                      marginTop: '20px', 
                      display: 'inline-block', 
                      color: 'var(--color-accent)', 
                      fontWeight: '600', 
                      textDecoration: 'none',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Baca Selengkapnya &rarr;
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default BlogIndex;
