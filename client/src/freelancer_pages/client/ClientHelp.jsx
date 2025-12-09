import React, { useState } from 'react';

// --- SVG Icons ---
const Icons = {
  ChevronDown: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
  ChevronUp: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>,
  Headset: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>,
  Book: () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
};

const faqs = [
  { question: 'How do I fund a milestone?', answer: 'Go to the "Financials" tab, select the project, and click "Fund Milestone". You can use Credit Card or PayPal.' },
  { question: 'Can I edit a job post after publishing?', answer: 'Yes, go to "My Projects", find the job post, click the three dots menu, and select "Edit".' },
  { question: 'Where can I download my invoices?', answer: 'All invoices are available in the "Documents" section under the "Invoices" category.' },
];

const ClientHelp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Help Center</h1>
      
      <div style={styles.grid}>
        {/* FAQ Section */}
        <div style={styles.main}>
          <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div style={styles.faqList}>
            {faqs.map((faq, index) => (
              <div key={index} style={styles.faqItem}>
                <div style={styles.question} onClick={() => toggle(index)}>
                  {faq.question}
                  <span style={styles.icon}>{openIndex === index ? <Icons.ChevronUp/> : <Icons.ChevronDown/>}</span>
                </div>
                {openIndex === index && <div style={styles.answer}>{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div style={styles.sidebar}>
          <div style={styles.card}>
            <div style={{marginBottom: '15px'}}><Icons.Headset /></div>
            <h3 style={styles.cardTitle}>Need more help?</h3>
            <p style={styles.cardText}>Our support team is available 24/7 to assist you.</p>
            <button style={styles.supportBtn}>Contact Support</button>
          </div>

          <div style={styles.card}>
            <div style={{marginBottom: '15px'}}><Icons.Book /></div>
            <h3 style={styles.cardTitle}>Knowledge Base</h3>
            <p style={styles.cardText}>Read detailed guides on how to use the platform.</p>
            <button style={styles.secondaryBtn}>Browse Articles</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  pageTitle: { fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '30px', textAlign: 'center' },
  grid: { display: 'flex', gap: '30px' },
  main: { flex: 2 },
  sidebar: { flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' },
  sectionTitle: { fontSize: '20px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px' },
  faqList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  faqItem: { backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' },
  question: { padding: '15px 20px', fontWeight: '600', color: '#334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', backgroundColor: '#fff' },
  answer: { padding: '0 20px 20px 20px', color: '#64748b', fontSize: '14px', lineHeight: '1.5' },
  icon: { color: '#94a3b8', display: 'flex' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  cardTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' },
  cardText: { fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  supportBtn: { width: '100%', padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  secondaryBtn: { width: '100%', padding: '10px', backgroundColor: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};

export default ClientHelp;