import React from "react";
import Card from "../components/Card";
import ChartArea from "../components/ChartArea";

export default function Dashboard() {
  const cards = [
    { title:"Total Clients", value: 124 },
    { title:"Active Projects", value: 18 },
    { title:"Monthly Revenue", value: "$12,400" },
    { title:"Pending Reports", value: 7 }
  ];

  return (
    <div>
      <div className="cards">
        {cards.map((c, i) => <Card key={i} title={c.title} value={c.value} />)}
      </div>

      <div className="bottom-grid">
        <div>
          <div className="chart-card">
            <h3>Client Growth</h3>
            <ChartArea />
          </div>
        </div>

        <div>
          <div className="card">
            <h3>My Projects</h3>
            <ul>
              <li><b>PRJ001</b> — E-commerce App (Active)</li>
              <li><b>PRJ002</b> — Dashboard UI (Active)</li>
              <li><b>PRJ003</b> — Analytics System (Completed)</li>
            </ul>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>Latest Report</h3>
            <p>Q3 Performance report submitted by ABC Corp.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
