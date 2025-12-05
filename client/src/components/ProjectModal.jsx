import React from "react";
import { X, BookmarkPlus, Bookmark, Eye, Calendar, DollarSign, Tag, User, Mail } from "lucide-react";

const ProjectModal = ({ project, isSaved, onToggleSave, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 pr-4">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Details */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3" />
              <span className="font-medium">Duration:</span>
              <span className="ml-2">{project.duration}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-5 w-5 mr-3" />
              <span className="font-medium">Budget:</span>
              <span className="ml-2 font-semibold text-green-600">{project.budget}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
            <p className="text-gray-600">{project.summary}</p>
          </div>

          {/* Required Skills */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="h-5 w-5 mr-2" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={() => onToggleSave(project)}
            className={`flex items-center px-4 py-2 rounded-md transition-colors ${
              isSaved
                ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isSaved ? (
              <>
                <Bookmark className="h-4 w-4 mr-2 fill-current" />
                Saved
              </>
            ) : (
              <>
                <BookmarkPlus className="h-4 w-4 mr-2" />
                Save Project
              </>
            )}
          </button>
          
          <div className="flex gap-3">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              <Mail className="h-4 w-4 mr-2" />
              Contact Client
            </button>
            <button className="flex items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              <User className="h-4 w-4 mr-2" />
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;