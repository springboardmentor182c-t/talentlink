import { useState } from "react";

interface Filters {
  skills: string;
  minBudget: string;
  maxBudget: string;
  duration: string;
}

interface FilterPanelProps {
  onApplyFilters: (filters: Filters) => void;
  onClearFilters: () => void;
}

export function FilterPanel({ onApplyFilters, onClearFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState<Filters>({
    skills: "",
    minBudget: "",
    maxBudget: "",
    duration: "",
  });

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, skills: e.target.value });
  };

  const handleMinBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, minBudget: e.target.value });
  };

  const handleMaxBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, maxBudget: e.target.value });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, duration: e.target.value });
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setFilters({
      skills: "",
      minBudget: "",
      maxBudget: "",
      duration: "",
    });
    onClearFilters();
  };

  return (
    <div className="bg-sidebar rounded-3xl p-6 w-full max-w-sm flex flex-col gap-6">
      <h3 className="text-foreground font-bold text-base">Filters</h3>

      <div className="space-y-5">
        {/* Skills Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-foreground text-sm font-semibold">
            Skills
          </label>
          <input
            type="text"
            placeholder="e.g. JavaScript/React"
            value={filters.skills}
            onChange={handleSkillsChange}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-foreground placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Budget Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-foreground text-sm font-semibold">
            Budget
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Min Amount"
              value={filters.minBudget}
              onChange={handleMinBudgetChange}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-foreground placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Max Amount"
              value={filters.maxBudget}
              onChange={handleMaxBudgetChange}
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-foreground placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Duration Filter */}
        <div className="flex flex-col gap-3">
          <label className="text-foreground text-sm font-semibold">
            Duration
          </label>
          <div className="space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="1-2-weeks"
                checked={filters.duration === "1-2-weeks"}
                onChange={handleDurationChange}
                className="w-3 h-3 accent-primary"
              />
              <span className="text-sm text-foreground">1-2 weeks</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="1-4-weeks"
                checked={filters.duration === "1-4-weeks"}
                onChange={handleDurationChange}
                className="w-3 h-3 accent-primary"
              />
              <span className="text-sm text-foreground">1-4 weeks</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="1-3-weeks"
                checked={filters.duration === "1-3-weeks"}
                onChange={handleDurationChange}
                className="w-3 h-3 accent-primary"
              />
              <span className="text-sm text-foreground">1-3 weeks</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="duration"
                value="2-3-weeks"
                checked={filters.duration === "2-3-weeks"}
                onChange={handleDurationChange}
                className="w-3 h-3 accent-primary"
              />
              <span className="text-sm text-foreground">2-3 weeks</span>
            </label>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-col gap-3 pt-2">
        <button
          onClick={handleApply}
          className="w-full px-4 py-2.5 bg-primary text-white font-semibold rounded-lg text-sm hover:opacity-90 transition-opacity"
        >
          Apply Filters
        </button>
        <button
          onClick={handleClear}
          className="w-full px-4 py-2.5 bg-white text-foreground border-2 border-foreground font-semibold rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
