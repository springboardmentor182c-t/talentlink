import React from 'react';
import { useProjects } from '../../context/ProjectContext';

const Icons = {
  Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Circle: () => <svg width="8" height="8" viewBox="0 0 24 24" fill="#10b981" stroke="none"><circle cx="12" cy="12" r="10"></circle></svg>
};

const FreelancerMessages = () => {
  const { projects, addProject, updateProject, addMessage } = useProjects();
  const project = projects && projects.length ? projects[0] : null;
  // Freelancers can message only when proposal is accepted
  const canSend = project ? project.status === 'Accepted' : false;
  const [text, setText] = React.useState('');

  const createDemo = () => {
    addProject({ title: 'Demo Project', proposalSent: true, status: 'Open' });
  };

  const acceptProject = () => {
    if (!project) return;
    updateProject(project.id, { status: 'Accepted' });
  };

  const sendMessage = () => {
    if (!project || !text.trim()) return;
    const msg = { id: Date.now(), from: 'freelancer', text: text.trim(), ts: new Date().toISOString() };
    addMessage(project.id, msg);
    setText('');
  };

  return (
    <div style={{height:'calc(100vh - 100px)', maxWidth:1200, margin:'0 auto'}}>
      <div style={{display:'flex', gap:20}}>
        <div style={{width:320, borderRight:'1px solid #e2e8f0', padding:20}}>
          <div style={{marginBottom:12, fontWeight:700}}>Chats</div>
          <div style={{color:'#64748b'}}>Project: {project ? project.title : '—'}</div>
        </div>
        <div style={{flex:1, display:'flex', flexDirection:'column'}}>
          <div style={{padding:16, borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center'}}>
            <div style={{width:40, height:40, borderRadius:20, backgroundColor:'#e2e8f0', display:'flex', alignItems:'center', justifyContent:'center'}}>F</div>
            <div style={{marginLeft:12}}>
              <div style={{fontWeight:700}}>Freelancer</div>
              <div style={{fontSize:12, color:'#64748b'}}>Available</div>
            </div>
          </div>

          <div style={{flex:1, padding:20}}>
            {project && Array.isArray(project.messages) && project.messages.length > 0 ? (
              project.messages.map(m => (
                m.from === 'freelancer' ? (
                  <div key={m.id} style={{alignSelf:'flex-end', maxWidth:'70%', display:'flex', flexDirection:'column'}}>
                    <div style={{backgroundColor:'#3b82f6', color:'white', padding:'10px 15px', borderRadius:'12px 12px 0 12px'}}>{m.text}</div>
                    <div style={{fontSize:10, color:'#94a3b8', marginTop:4}}>{new Date(m.ts).toLocaleTimeString()}</div>
                  </div>
                ) : (
                  <div key={m.id} style={{alignSelf:'flex-start', maxWidth:'70%'}}>
                    <div style={{backgroundColor:'#f1f5f9', padding:'10px 15px', borderRadius:'12px 12px 12px 0'}}>{m.text}</div>
                    <div style={{fontSize:10, color:'#94a3b8', marginTop:4}}>{new Date(m.ts).toLocaleTimeString()}</div>
                  </div>
                )
              ))
            ) : (
              <div style={{color:'#94a3b8'}}>No messages yet — start a conversation after acceptance.</div>
            )}
          </div>

          <div style={{padding:16, borderTop:'1px solid #e2e8f0', display:'flex', gap:12}}>
            {!project && (
              <>
                <div style={{color:'#64748b', flex:1}}>No project. Create a demo to try the flow.</div>
                <button onClick={createDemo} style={{padding:'8px 12px', borderRadius:8}}>Create Demo</button>
              </>
            )}

            {project && (
              <>
                {!canSend && (
                  <div style={{display:'flex', alignItems:'center', gap:12, flex:1}}>
                    <div style={{color:'#64748b'}}>You can message once the client accepts.</div>
                    <button onClick={acceptProject} style={{padding:'8px 12px', borderRadius:8}}>Simulate: Accept</button>
                  </div>
                )}

                {canSend && (
                  <>
                    <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendMessage(); }} style={{flex:1, padding:12, borderRadius:8, border:'1px solid #e2e8f0'}} placeholder="Type a message..." />
                    <button onClick={sendMessage} style={{backgroundColor:'#3b82f6', color:'white', borderRadius:8, padding:'8px 12px'}}><Icons.Send /></button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerMessages;
