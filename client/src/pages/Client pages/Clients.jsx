import React, { useEffect, useState } from "react";
import ClientsTable from "../components/ClientsTable";
import Modal from "../components/Modal";
import { load, save, STORAGE_KEYS } from "../components/utils";

export default function Clients() {
  const [clients, setClients] = useState(() => load(STORAGE_KEYS.CLIENTS, [
    { id:1, name:"ABC Corp", projectId:"PRJ001", status:"Active", reports:12 },
    { id:2, name:"SoftTech", projectId:"PRJ002", status:"Completed", reports:8 }
  ]));

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ id:null, name:"", projectId:"", status:"Active", reports:0 });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(()=> save(STORAGE_KEYS.CLIENTS, clients), [clients]);

  function handleAdd() {
    setForm({ id:null, name:"", projectId:"", status:"Active", reports:0 });
    setOpen(true);
  }
  function handleEdit(c) { setForm(c); setOpen(true); }
  function handleDelete(id) { setClients(prev => prev.filter(p => p.id !== id)); }
  function handleView(c) { alert(JSON.stringify(c, null, 2)); }

  function handleSave() {
    if (!form.name || !form.projectId) { alert("Name and project required"); return; }
    if (form.id) {
      setClients(prev => prev.map(x => x.id === form.id ? form : x));
    } else {
      const next = Math.max(0, ...clients.map(c => c.id)) + 1;
      setClients(prev => [...prev, { ...form, id: next }]);
    }
    setOpen(false);
  }

  const filtered = clients.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.projectId.toLowerCase().includes(query.toLowerCase()));
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const shown = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <div>
      <div className="list-header">
        <h2>Clients</h2>
        <div style={{display:"flex", gap:8}}>
          <input placeholder="Search..." value={query} onChange={(e)=>{setQuery(e.target.value); setPage(1);}} />
          <button className="btn btn-primary" onClick={handleAdd}>+ Add Client</button>
        </div>
      </div>

      <ClientsTable clients={shown} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />

      <div style={{marginTop:12, display:"flex", gap:6, alignItems:"center"}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="btn">Prev</button>
        <div>Page {page} / {pages}</div>
        <button onClick={()=>setPage(p=>Math.min(p+1,pages))} className="btn">Next</button>
      </div>

      <Modal open={open} onClose={()=>setOpen(false)} title={form.id ? "Edit Client" : "Add Client"}>
        <div style={{display:"grid", gap:8}}>
          <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} />
          <input placeholder="Project ID" value={form.projectId} onChange={(e)=>setForm({...form, projectId:e.target.value})} />
          <input type="number" placeholder="Reports" value={form.reports} onChange={(e)=>setForm({...form, reports: Number(e.target.value)})} />
          <select value={form.status} onChange={(e)=> setForm({...form, status:e.target.value})}>
            <option>Active</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
          <div style={{display:"flex", justifyContent:"flex-end", gap:8}}>
            <button className="btn" onClick={()=>setOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
