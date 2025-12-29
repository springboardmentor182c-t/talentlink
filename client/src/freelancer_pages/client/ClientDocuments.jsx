import React from 'react';

// --- SVG Icons ---
const Icons = {
  Pdf: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Image: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>,
  File: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Upload: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
};

const docs = [
  { id: 1, name: 'Project_Contract_v2.pdf', type: 'pdf', size: '2.4 MB', date: 'Nov 20, 2025', category: 'Contracts' },
  { id: 2, name: 'Invoice_#1024.pdf', type: 'pdf', size: '1.1 MB', date: 'Nov 25, 2025', category: 'Invoices' },
  { id: 3, name: 'Homepage_Mockup.png', type: 'image', size: '4.5 MB', date: 'Nov 28, 2025', category: 'Design' },
  { id: 4, name: 'Requirements_Spec.docx', type: 'word', size: '500 KB', date: 'Nov 10, 2025', category: 'Specs' },
];

const ClientDocuments = () => {
  const getIcon = (type) => {
    if (type === 'pdf') return <Icons.Pdf />;
    if (type === 'image') return <Icons.Image />;
    return <Icons.File />;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>Documents</h1>
        <div style={styles.actions}>
          <div style={styles.searchWrapper}>
            <div style={styles.searchIcon}><Icons.Search /></div>
            <input type="text" placeholder="Search files..." style={styles.searchInput} />
          </div>
          <button style={styles.uploadBtn}>
            <span style={{marginRight: '8px', display:'flex'}}><Icons.Upload /></span> Upload File
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tHeadRow}>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Date Uploaded</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.fileName}>
                    <span style={styles.fileIcon}>{getIcon(doc.type)}</span>
                    {doc.name}
                  </div>
                </td>
                <td style={styles.td}><span style={styles.catBadge}>{doc.category}</span></td>
                <td style={styles.td}>{doc.date}</td>
                <td style={styles.td}>{doc.size}</td>
                <td style={styles.td}>
                  <button style={styles.downloadBtn}><Icons.Download /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b' },
  actions: { display: 'flex', gap: '15px' },
  searchWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  searchIcon: { position: 'absolute', left: '12px', display: 'flex' },
  searchInput: { padding: '10px 10px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', width: '250px' },
  uploadBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center' },
  card: { backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tHeadRow: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { textAlign: 'left', padding: '15px 20px', fontSize: '12px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '15px 20px', fontSize: '14px', color: '#334155' },
  fileName: { display: 'flex', alignItems: 'center', fontWeight: '500' },
  fileIcon: { marginRight: '12px', display: 'flex' },
  catBadge: { backgroundColor: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' },
  downloadBtn: { background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }
};

export default ClientDocuments;