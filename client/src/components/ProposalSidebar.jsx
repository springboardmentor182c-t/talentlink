import React, { useState } from "react";
import { Lightbulb, ChevronRight } from "lucide-react";

const ProposalSidebar = ({ currentProjectId }) => {
  const writingTips = [
    "Write a compelling cover letter that highlights your experience",
    "Be specific about your completion timeline and deliverables",
    "Research the market rate for similar projects",
    "Mention relevant skills and past successful projects",
    "Keep your bid amount competitive yet reasonable",
    "Proofread your proposal before submitting",
    "Ask clarifying questions if project details are unclear",
    "Show enthusiasm for the project and the client",
  ];

  const mockProjects = [
    {
      id: 1,
      title: "E-commerce Platform Development",
      applications: 24,
      description: "Building a modern e-commerce platform with React and Node.js",
      status: "Active",
    },
    {
      id: 2,
      title: "Mobile App UI/UX Design",
      applications: 15,
      description: "Design intuitive mobile application interface",
      status: "Active",
    },
    {
      id: 3,
      title: "Corporate Website Redesign",
      applications: 32,
      description: "Complete redesign of corporate website with modern design",
      status: "Completed",
    },
  ];

  const [expandedProject, setExpandedProject] = useState(null);

  return (
    <aside className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-6">
      {/* Writing Tips Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold text-gray-900">Writing Tips</h3>
        </div>
        <ul className="space-y-3">
          {writingTips.slice(0, 5).map((tip, index) => (
            <li key={index} className="flex gap-2 text-sm">
              <span className="text-yellow-500 font-bold flex-shrink-0">•</span>
              <span className="text-gray-700 leading-relaxed">{tip}</span>
            </li>
          ))}
        </ul>
        <button className="mt-4 text-sm text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
          View all tips →
        </button>
      </div>

      {/* Projects Section */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Available Projects</h3>
        <div className="space-y-3">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                expandedProject === project.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
              onClick={() =>
                setExpandedProject(
                  expandedProject === project.id ? null : project.id
                )
              }
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
                    {project.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {project.applications} applications
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
                    expandedProject === project.id ? "rotate-90" : ""
                  }`}
                />
              </div>

              {expandedProject === project.id && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-700 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      project.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}>
                      {project.status}
                    </span>
                    <button className="text-xs text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                      View Project →
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProposalSidebar;
