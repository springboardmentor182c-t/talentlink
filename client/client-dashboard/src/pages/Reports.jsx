import React, { useState, useEffect } from "react";
import { save, load, STORAGE_KEYS } from "../components/utils";
import { saveAs } from "file-saver";

export default function Reports(){
  const [reports, setReports] = useState(() => load(STORAGE_KEYS.REPORTS, [
    { id:1, client:"ABC Corp", title:"Marketing Analysis", date:"2025-10-20", status:"Delivered" },
    { id:2, client:"SoftTech", title:"Performance Report", date:"2025-11-11", status:"Pending" },
  ]));

  useEffect(()=> save(STORAGE_KEYS.REPORTS, reports), [reports]);

  function exportCSV() {
    const headers = ["id","client","title","date","status"];
    const rows = [headers.join(",")].concat(reports.map(r => [r.id, r.client, `"${r.title}"`, r.date, r.status].join(",")));
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "reports.csv");
  }

  return (
    <div>
      <div className="list-header">
        <h2>Reports</h2>
        <div>
          <button className="btn btn-primary" onClick={exportCSV}>Export CSV</button>
        </div>
      </div>

      <div className="cards" style={{marginBottom:12}}>
        <div className="card">
          <div className="label">Total Reports</div>
          <div className="value">{reports.length}</div>
        </div>
        <div className="card">
          <div className="label">Delivered</div>
          <div className="value">{reports.filter(r => r.status==="Delivered").length}</div>
        </div>
        <div className="card">
          <div className="label">Pending</div>
          <div className="value">{reports.filter(r => r.status==="Pending").length}</div>
        </div>
      </div>

      <div className="table-card">
        <table className="table">
          <thead>
            <tr><th>ID</th><th>Client</th><th>Title</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.client}</td><td>{r.title}</td><td>{r.date}</td><td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
