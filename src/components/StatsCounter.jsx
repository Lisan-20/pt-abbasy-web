import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatItem = ({ value, suffix, label, icon, delay }) => {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      style={{
        textAlign: 'center', padding: '40px 20px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {icon && (
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{icon}</div>
      )}
      <div style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: 'var(--color-accent)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ marginTop: '12px', fontSize: '1rem', fontWeight: '500', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.5px' }}>
        {label}
      </div>
    </motion.div>
  );
};

const StatsCounter = ({ data }) => {
  const stats = data?.stats || [];
  const title = data?.title || '';
  const subtitle = data?.subtitle || '';

  if (stats.length === 0) return null;

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3a5c 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,122,0,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,122,0,0.05)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {(title || subtitle) && (
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ color: 'white', marginBottom: '12px' }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem' }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          gap: '24px',
        }}>
          {stats.map((stat, idx) => (
            <StatItem
              key={idx}
              value={parseInt(stat.value) || 0}
              suffix={stat.suffix || ''}
              label={stat.label || ''}
              icon={stat.icon || ''}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
