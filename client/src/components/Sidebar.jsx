import React from "react";
import mobileTaxiService from "../assets/Mobile Taxi Service.png";
import processImprovement from "../assets/Process Improvement.png";
import shop from "../assets/Shop.png";

export default function Sidebar({ tips = [], related = [] }) {
  const relatedItems = related.length ? related : [
    { icon: mobileTaxiService, title: "Mobile App UI Design for Startup" },
    { icon: processImprovement, title: "Landing Page Optimization Project" },
    { icon: shop, title: "E-Commerce Dashboard Redesign" },
  ];
  const proposalTips = tips.length ? tips : [
    "Keep your message short and relevant.",
    "Mention your experience and how you'll solve the problem.",
    "Include your estimated budget and timeline.",
    "Be polite and professional.",
  ];

  return (
    <aside className="bg-[#a2add7] p-6 md:p-8 rounded-[24px] space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Related Projects</h3>
        {relatedItems.map((p, i) => (
          <div key={i} className="flex gap-3 mb-3 items-center">
            <img src={p.icon} alt="" className="w-8 h-8" />
            <span>{p.title}</span>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-4">Proposal Tips</h3>
        <ul className="list-disc ml-6 space-y-2">
          {proposalTips.map((t, i) => <li key={i}>{t}</li>)}
        </ul>
      </div>
    </aside>
  );
}
