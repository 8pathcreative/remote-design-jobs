INSERT INTO jobs (
  title,
  company,
  location,
  description,
  salary_range,
  job_type,
  experience_level,
  company_logo,
  apply_url,
  skills,
  created_by
) VALUES (
  'Senior Product Designer',
  'DesignCraft Studios',
  'Remote (Worldwide)',
  'We''re looking for a Senior Product Designer to join our fully remote team. You''ll be working on cutting-edge digital products used by millions of users worldwide.

Key Responsibilities:
• Lead the design process from concept to implementation
• Collaborate with product managers and engineers
• Create user flows, wireframes, and high-fidelity prototypes
• Conduct user research and usability testing
• Mentor junior designers and contribute to our design system

Requirements:
• 5+ years of product design experience
• Strong portfolio demonstrating end-to-end design process
• Experience with modern design tools (Figma, etc.)
• Excellent communication and collaboration skills
• Experience working in remote teams',
  '$120,000 - $160,000',
  'full-time',
  'senior',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
  'https://example.com/apply',
  ARRAY['UI/UX', 'Product Design', 'Figma', 'User Research', 'Design Systems', 'Prototyping'],
  (SELECT id FROM auth.users LIMIT 1)
);