import React from "react";
import { Search, Filter, X } from "lucide-react";

const FilterSidebar = ({ 
  filterForm, 
  onFilterChange, 
  onApplyFilters, 
  onClearFilters 
}) => {
  const skills = [
    "Any",
    "React",
    "JavaScript",
    "CSS",
    "Node.js",
    "MongoDB",
    "Express",
    "UI/UX",
    "Figma",
    "Angular",
    "TypeScript",
    "Python",
    "REST API",
    "Backend"
  ];

  const durations = [
    "",
    "1-4 weeks",
    "1-3 months",
    "> 3 months"
  ];

  return (
    <div className="w-full lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <X className="h-4 w-4 mr-1" />
          Clear All
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search Projects
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title, skills..."
            value={filterForm.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Skills Required
        </label>
        <select
          value={filterForm.skill}
          onChange={(e) => onFilterChange("skill", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project Duration
        </label>
        <select
          value={filterForm.duration}
          onChange={(e) => onFilterChange("duration", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Any Duration</option>
          {durations.filter(d => d).map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budget Range (₹)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Min"
            value={filterForm.minBudget}
            onChange={(e) => onFilterChange("minBudget", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className="text-gray-500 self-center">to</span>
          <input
            type="number"
            placeholder="Max"
            value={filterForm.maxBudget}
            onChange={(e) => onFilterChange("maxBudget", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={onApplyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;