import React, { useState } from 'react';
import {
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Award,
  Tag,
  FileText,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const PostNewProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: '',
    minBudget: '',
    maxBudget: '',
    duration: '',
    location: '',
    experienceLevel: 'Any',
    projectType: 'Fixed Price'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (!formData.skills.trim()) {
      newErrors.skills = 'Please specify required skills';
    }

    if (formData.minBudget && formData.maxBudget) {
      if (Number(formData.minBudget) > Number(formData.maxBudget)) {
        newErrors.maxBudget = 'Maximum budget must be greater than minimum';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills,
        min_budget: formData.minBudget || null,
        max_budget: formData.maxBudget || null,
        duration: formData.duration,
        location: formData.location,
        experience_level: formData.experienceLevel,
        project_type: formData.projectType,
        status: 'active'
      };

      const res = await api.post('/projects/', payload);
      console.log('Saved project:', res.data);

      alert('🎉 Project saved successfully!');
      
      setFormData({
        title: '',
        description: '',
        skills: '',
        minBudget: '',
        maxBudget: '',
        duration: '',
        location: '',
        experienceLevel: 'Any',
        projectType: 'Fixed Price'
      });

      navigate('/client/projects');
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Something went wrong while saving the project.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveAsDraft = async () => {
    if (!formData.title.trim()) {
      setErrors(prev => ({
        ...prev,
        title: 'Title is required to save as draft'
      }));
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        title: formData.title,
        description: formData.description,
        skills: formData.skills,
        min_budget: formData.minBudget || null,
        max_budget: formData.maxBudget || null,
        duration: formData.duration,
        location: formData.location,
        experience_level: formData.experienceLevel,
        project_type: formData.projectType,
        status: 'draft'
      };

      const res = await api.post('/projects/', payload);
      console.log('Saved draft project:', res.data);

      alert('📝 Project saved as draft!');
      navigate('/projects');
    } catch (err) {
      console.error('Error saving draft:', err);
      alert('Something went wrong while saving as draft.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
      navigate('/projects');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-4 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 transition-colors"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Back to Projects</span>
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Briefcase size={20} className="sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Post New Project</h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-0.5 sm:mt-1">
                Find the perfect freelancer for your project
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            
            {/* Project Title */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <FileText size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Project Title <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Build a React dashboard"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <FileText size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Project Description <span className="text-red-500">*</span></span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your project, requirements, and goals in detail..."
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.description}</p>
              )}
              <p className="mt-1.5 sm:mt-2 text-xs text-gray-500">
                Tip: Include specific requirements, deliverables, and timeline expectations
              </p>
            </div>

            {/* Required Skills */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <Tag size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Required Skills <span className="text-red-500">*</span></span>
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, PostgreSQL"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                  errors.skills ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.skills && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.skills}</p>
              )}
              <p className="mt-1.5 sm:mt-2 text-xs text-gray-500">
                Separate skills with commas
              </p>
            </div>

            {/* Budget Range */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <DollarSign size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Budget Range</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <input
                    type="number"
                    name="minBudget"
                    value={formData.minBudget}
                    onChange={handleChange}
                    placeholder="Min Budget ($)"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="maxBudget"
                    value={formData.maxBudget}
                    onChange={handleChange}
                    placeholder="Max Budget ($)"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                      errors.maxBudget ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.maxBudget && (
                    <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.maxBudget}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <Clock size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Project Duration</span>
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 2 weeks, 3 months"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Experience Level & Project Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Experience Level */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  <Award size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                  <span>Experience Level</span>
                </label>
                <select
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="Any">Any Level</option>
                  <option value="Junior">Junior (0-2 years)</option>
                  <option value="Mid-level">Mid-level (2-5 years)</option>
                  <option value="Senior">Senior (5+ years)</option>
                </select>
              </div>

              {/* Project Type */}
              <div>
                <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  <Briefcase size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                  <span>Project Type</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="Fixed Price">Fixed Price</option>
                  <option value="Hourly">Hourly Rate</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                <MapPin size={16} className="sm:w-4.5 sm:h-4.5 text-indigo-600 flex-shrink-0" />
                <span>Location (Optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, Hyderabad, Bangalore"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200">
              {/* Post Project (active) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:from-indigo-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <CheckCircle size={18} className="sm:w-5 sm:h-5" />
                {isSubmitting ? 'Posting...' : 'Post Project'}
              </button>

              {/* Save as Draft */}
              <button
                type="button"
                onClick={handleSaveAsDraft}
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-yellow-50 text-yellow-800 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-yellow-100 transition-all border border-yellow-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Save as Draft
              </button>

              {/* Cancel */}
              <button
                type="button"
                onClick={handleCancel}
                className="w-full sm:w-auto sm:flex-initial bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Helper Tips */}
        <div className="mt-4 sm:mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
            Tips for a Great Project Post
          </h3>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
              <span>Be specific about your requirements and deliverables</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
              <span>Set a realistic budget based on project complexity</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
              <span>List all required skills to attract the right freelancers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-600 mt-0.5 sm:mt-1 flex-shrink-0">•</span>
              <span>Include timeline expectations and any important deadlines</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostNewProject;
