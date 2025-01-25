export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  salary_range: string;
  job_type: string;
  experience_level: string;
  posted_at: string;
  company_logo?: string;
  apply_url: string;
  skills: string[];
  created_at: string;
}