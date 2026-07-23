import React from 'react';
import Contact from '../components/Contact';
import PageWrapper from '../components/PageWrapper';

const ContactPage = ({ data }) => {
  return (
    <PageWrapper title="Hubungi Kami">
      <div className="page-header" style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ color: 'white' }}>Hubungi Kami</h1>
      </div>
      <Contact data={data} />
    </PageWrapper>
  );
};
export default ContactPage;
