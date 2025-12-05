import React from "react";
import bell from "../assets/Bell.png";
import search from "../assets/Search.png";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 border-b">
      <h1 className="text-3xl font-bold">TalentLink</h1>
      <nav className="hidden md:flex gap-8">
        <a>Dashboard</a>
        <a>Messages</a>
        <a>Contracts</a>
      </nav>
      <div className="flex items-center gap-4">
        <img src={search} className="w-8 h-8" alt="Search" />
        <img src={bell} className="w-8 h-8" alt="Bell" />
        <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center">S</div>
      </div>
    </header>
  );
}
