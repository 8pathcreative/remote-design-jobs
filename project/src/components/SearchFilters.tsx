import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  jobType: string;
  onJobTypeChange: (value: string) => void;
  experienceLevel: string;
  onExperienceLevelChange: (value: string) => void;
}

export function SearchFilters({
  search,
  onSearchChange,
  jobType,
  onJobTypeChange,
  experienceLevel,
  onExperienceLevelChange,
}: SearchFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select
            value={jobType}
            onChange={(e) => onJobTypeChange(e.target.value)}
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
          
          <select
            value={experienceLevel}
            onChange={(e) => onExperienceLevelChange(e.target.value)}
            className="pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Experience Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead</option>
          </select>
          
          <button className="p-2 text-gray-600 hover:text-purple-600 focus:outline-none">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}