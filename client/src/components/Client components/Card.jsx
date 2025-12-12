
import React from "react";

export default function Card({ title, value, small }) {
  return (
    <div className="card">
      <div className="label">{title}</div>
      <div className="value">{value}</div>
      {small && <div className="small">{small}</div>}
    </div>
  );
}
