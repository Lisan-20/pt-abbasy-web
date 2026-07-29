import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BlogIndex = () => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = React.useState('All');

  // Load all articles using Vite's glob import
  const articleModules = import.meta.glob('../content/articles/*.json', { eager: true });
  const articles = Object.entries(articleModules)
    .map(([path, mod]) => {
      const data = mod.default || mod;
      // Handle slug fallback
      let fallbackSlug = path.split('/').pop().replace('.json', '');
      fallbackSlug = fallbackSlug.replace(`.${i18n.language}`, '');
      return { ...data, slug: data.slug || fallbackSlug, _path: path };
    })
    .filter(a => a.title)
    .filter(a => {
      // Filter by language if using multiple files
      if (a._path.includes(`.${i18n.language}.json`)) return true;
      if (!a._path.includes('.en.json') && !a._path.includes('.id.json')) return true;
      return false;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const categories = ['All', ...new Set(articles.map(a => a.category).filter(Boolean))];
  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

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
          {t('Newsroom & Blog') || 'Blog & Berita'}
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

      {/* Categories Filter */}
      {categories.length > 1 && (
        <div className="container" style={{ paddingTop: '40px' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-accent text-white shadow-lg'
                    : 'bg-[rgba(0,0,0,0.05)] text-gray-600 hover:bg-[rgba(0,0,0,0.1)]'
                }`}
              >
                {cat === 'All' ? t('All Categories') || 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      <section className="container" style={{ padding: '40px 20px 80px', minHeight: '50vh' }}>
        {filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {filteredArticles.map((article, idx) => (
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
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.85rem', color: '#666', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} />
                      {new Date(article.date).toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} />
                      {article.author || 'Admin'}
                    </span>
                    {article.category && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-accent)' }}>
                        <Tag size={14} />
                        {article.category}
                      </span>
                    )}
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
                    {t('Read More') || 'Baca Selengkapnya'} &rarr;
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
