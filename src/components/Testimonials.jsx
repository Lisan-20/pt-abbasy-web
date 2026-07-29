import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const testimonials = data?.testimonials || [];
  const title = data?.title || 'Apa Kata Klien Kami';

  if (testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-subtle)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 className="section-title">{title}</h2>
        </motion.div>

        {/* Star grid for more than 2 */}
        {testimonials.length >= 3 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} testimonial={t} delay={idx * 0.1} />
            ))}
          </div>
        ) : (
          /* Carousel for 1-2 */
          <div style={{ maxWidth: '750px', margin: '0 auto', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
              >
                <TestimonialCard testimonial={testimonials[current]} />
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '32px' }}>
                <button onClick={prev} style={{ ...btnStyle }}>
                  <ChevronLeft size={20} />
                </button>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {testimonials.map((_, i) => (
                    <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === current ? 'var(--color-accent)' : '#cbd5e1', cursor: 'pointer', transition: 'all 0.3s ease' }} />
                  ))}
                </div>
                <button onClick={next} style={{ ...btnStyle }}>
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const btnStyle = {
  width: '44px', height: '44px', borderRadius: '50%',
  border: '2px solid var(--color-primary)', background: 'white',
  color: 'var(--color-primary)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s ease',
};

const StarRating = ({ rating = 5 }) => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill={i < rating ? 'var(--color-accent)' : '#e2e8f0'} xmlns="http://www.w3.org/2000/svg">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    style={{
      backgroundColor: 'white', borderRadius: '16px',
      padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      position: 'relative', overflow: 'hidden',
      borderTop: '4px solid var(--color-accent)',
    }}
  >
    <Quote size={40} style={{ color: 'var(--color-accent)', opacity: 0.15, position: 'absolute', top: '20px', right: '20px' }} />
    <StarRating rating={testimonial.rating || 5} />
    <p style={{ fontSize: '1rem', lineHeight: '1.8', color: '#475569', marginBottom: '24px', fontStyle: 'italic' }}>
      "{testimonial.quote}"
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      {testimonial.photo ? (
        <img src={testimonial.photo} alt={testimonial.name} style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-accent)' }} />
      ) : (
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '1.2rem', flexShrink: 0 }}>
          {(testimonial.name || 'K')[0]}
        </div>
      )}
      <div>
        <div style={{ fontWeight: '700', color: 'var(--color-primary)' }}>{testimonial.name}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-accent)', fontWeight: '600' }}>{testimonial.position}</div>
        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{testimonial.company}</div>
      </div>
    </div>
  </motion.div>
);

export default Testimonials;
