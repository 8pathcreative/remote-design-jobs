import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { supabase } from './lib/supabase';
import { JobCard } from './components/JobCard';
import { SearchFilters } from './components/SearchFilters';
import { PostJobForm } from './components/PostJobForm';
import { AuthModal } from './components/AuthModal';
import type { Job } from './types';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [jobType, setJobType] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPostJob, setShowPostJob] = useState(false);
  const [showAuth, setShowAuth] = useState<'signin' | 'signup' | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchJobs();
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  }

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await checkUser();
  };

  const handleSignUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    alert('Please check your email to confirm your account');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = search === '' || 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesJobType = jobType === '' || job.job_type.toLowerCase() === jobType.toLowerCase();
    const matchesExperience = experienceLevel === '' || 
      job.experience_level.toLowerCase() === experienceLevel.toLowerCase();

    return matchesSearch && matchesJobType && matchesExperience;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-purple-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Design Jobs Remote
              </h1>
            </div>
            <nav className="flex space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setShowPostJob(true)}
                    className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
                  >
                    Post a Job
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowAuth('signin')}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setShowAuth('signup')}
                    className="text-gray-600 hover:text-purple-600"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          search={search}
          onSearchChange={setSearch}
          jobType={jobType}
          onJobTypeChange={setJobType}
          experienceLevel={experienceLevel}
          onExperienceLevelChange={setExperienceLevel}
        />

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Design Jobs Remote. All rights reserved.
          </p>
        </div>
      </footer>

      {showPostJob && (
        <PostJobForm onClose={() => {
          setShowPostJob(false);
          fetchJobs();
        }} />
      )}

      {showAuth && (
        <AuthModal
          mode={showAuth}
          onClose={() => setShowAuth(null)}
          onSubmit={showAuth === 'signin' ? handleSignIn : handleSignUp}
        />
      )}
    </div>
  );
}

export default App;