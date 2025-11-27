import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { FilterPanel } from "@/components/FilterPanel";
import { ProjectCard } from "@/components/ProjectCard";
import { Search } from "lucide-react";

interface Filters {
  skills: string;
  minBudget: string;
  maxBudget: string;
  duration: string;
}

const sampleProjects = [
  {
    id: 1,
    title: "React Front Developer",
    description:
      "Build UI components for a dashboard application using React.js and modern frameworks",
    skills: ["React", "JavaScript", "CSS"],
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

  const handleApplyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    console.log("Filters applied:", filters);
  };

  const handleClearFilters = () => {
    setAppliedFilters(null);
    console.log("Filters cleared");
  };

  const handleViewDetails = () => {
    console.log("View details clicked");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-foreground">
              Freelancer Dashboard
            </h1>
            <button className="px-6 py-2.5 bg-gray-300 text-foreground font-semibold rounded-full hover:bg-gray-400 transition-colors text-sm">
              Saved Projects (3)
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-lg">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by project title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-full bg-white text-foreground placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="flex-shrink-0">
              <FilterPanel
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Projects Grid */}
            <div className="flex-1">
              {sampleProjects.length > 0 ? (
                <div className="grid gap-6">
                  {sampleProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      description={project.description}
                      skills={project.skills}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-foreground opacity-60">
                    No projects found. Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
