import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Building2, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import type { Job } from '../types';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <Building2 className="w-4 h-4 mr-2" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Briefcase className="w-4 h-4 mr-2" />
              <span>{job.job_type}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span>{job.experience_level}</span>
            </div>
          </div>
        </div>
        {job.company_logo && (
          <img
            src={job.company_logo}
            alt={`${job.company} logo`}
            className="w-16 h-16 object-contain rounded"
          />
        )}
      </div>
      
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          Posted {formatDistanceToNow(new Date(job.posted_at))} ago
        </span>
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}