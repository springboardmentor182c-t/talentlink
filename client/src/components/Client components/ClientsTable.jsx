import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function ClientsTable({ clients = [], onEdit, onDelete, onView }) {
  return (
    <div className="table-card">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th><th>Client</th><th>Project ID</th><th>Status</th><th>Reports</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.projectId}</td>
              <td>{c.status}</td>
              <td>{c.reports}</td>
              <td>
                <button className="btn" onClick={() => onView(c)} title="View"><FaEye/></button>
                <button className="btn" onClick={() => onEdit(c)} title="Edit"><FaEdit/></button>
                <button className="btn" onClick={() => onDelete(c.id)} title="Delete"><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
