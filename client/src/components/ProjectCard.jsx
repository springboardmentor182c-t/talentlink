import React from "react";
import { BookmarkPlus, Bookmark, Eye, Calendar, DollarSign, Tag } from "lucide-react";

const ProjectCard = ({ project, isSaved, onToggleSave, onViewDetails }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
          {project.title}
        </h3>
        <button
          onClick={() => onToggleSave(project)}
          className={`p-2 rounded-full transition-colors ${
            isSaved
              ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          }`}
          title={isSaved ? "Remove from saved" : "Save project"}
        >
          {isSaved ? (
          <Bookmark className="h-5 w-5 fill-current" />
        ) : (
          <BookmarkPlus className="h-5 w-5" />
        )}
        </button>
      </div>

      {/* Summary */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {project.summary}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm rounded-full"
          >
            {skill}
          </span>
        ))}
        {project.skills.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
            +{project.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign className="h-4 w-4 mr-2" />
          <span className="font-medium text-gray-900">{project.budget}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onViewDetails(project)}
          className="flex-1 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>
        <button
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;