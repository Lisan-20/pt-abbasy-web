import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NotFound from './NotFound';

const BlogPost = () => {
  const { slug } = useParams();
  
  // Load all articles
  const articleModules = import.meta.glob('../content/articles/*.json', { eager: true });
  const articles = Object.values(articleModules).map(mod => mod.default || mod);
  
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - PT. Abbasy Anugerah Perkasa</title>
        <meta name="description" content={article.summary} />
        {article.thumbnail && <meta property="og:image" content={`https://abbasyanugerahperkasa.com${article.thumbnail}`} />}
      </Helmet>

      {/* Article Header */}
      <section style={{
        padding: '120px 20px 60px',
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3a5c 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '24px', fontSize: '0.95rem' }}>
            <ArrowLeft size={16} />
            Kembali ke Blog
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '24px', lineHeight: 1.2 }}
          >
            {article.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', color: 'rgba(255,255,255,0.8)' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              {new Date(article.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={16} />
              {article.author || 'Admin'}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
          {article.thumbnail && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ width: '100%', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px' }}
            >
              <img src={article.thumbnail} alt={article.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="markdown-content"
            style={{ 
              fontSize: '1.1rem', 
              lineHeight: 1.8, 
              color: '#334155' 
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </motion.div>
        </div>
      </section>
      
      {/* Markdown Styles (added globally via style tag for simplicity in this component) */}
      <style>{`
        .markdown-content h1, .markdown-content h2, .markdown-content h3 {
          color: var(--color-primary);
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          line-height: 1.3;
        }
        .markdown-content p {
          margin-bottom: 1.2em;
        }
        .markdown-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 1.5em 0;
        }
        .markdown-content ul, .markdown-content ol {
          margin-bottom: 1.2em;
          padding-left: 1.5em;
        }
        .markdown-content li {
          margin-bottom: 0.5em;
        }
        .markdown-content blockquote {
          border-left: 4px solid var(--color-accent);
          padding-left: 1em;
          margin: 1.5em 0;
          color: #64748b;
          font-style: italic;
          background: #f1f5f9;
          padding: 1em;
          border-radius: 0 8px 8px 0;
        }
        .markdown-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5em 0;
        }
        .markdown-content th, .markdown-content td {
          border: 1px solid #e2e8f0;
          padding: 12px;
          text-align: left;
        }
        .markdown-content th {
          background: #f8fafc;
          font-weight: 600;
          color: var(--color-primary);
        }
        .markdown-content a {
          color: var(--color-accent);
          text-decoration: none;
        }
        .markdown-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};

export default BlogPost;
