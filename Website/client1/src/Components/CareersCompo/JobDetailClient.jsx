'use client';

import React, { useState, useEffect } from 'react';
import ApplyFormModal from './ApplyFormModal';
import RedirectModal from './RedirectModal';

// Static dummy job data
const dummyJob = {
  _id: 'JOB001',
  title: 'Frontend Developer',
  location: 'Remote',
  postedOn: '2024-01-15',
  endDate: '2024-02-15',
  startDate: '2024-03-01',
  minExp: '2',
  maxExp: '5',
  salary: '$80,000 - $120,000',
  jobType: 'Full-time',
  workMode: 'Remote',
  duration: 'Permanent',
  category: 'Engineering',
  description: 'We are looking for a skilled Frontend Developer to join our team. You will be responsible for building user interfaces and implementing visual elements that users see and interact with in web applications.',
  responsibilities: [
    'Develop new user-facing features',
    'Build reusable code and libraries for future use',
    'Optimize applications for maximum speed and scalability',
    'Collaborate with back-end developers and web designers',
    'Ensure the technical feasibility of UI/UX designs'
  ],
  qualifications: [
    'Bachelor\'s degree in Computer Science or related field',
    '2+ years of experience in frontend development',
    'Proficiency in HTML, CSS, JavaScript',
    'Experience with React.js or similar frameworks',
    'Understanding of responsive design principles'
  ],
  skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'TypeScript', 'Git'],
  perks: [
    'Health insurance',
    'Flexible working hours',
    'Remote work options',
    'Professional development budget',
    'Stock options'
  ],
  who_can_apply: [
    'Only candidates with 2+ years of experience',
    'Available to work during EST business hours',
    'Must have portfolio of previous work'
  ]
};

// Static dummy user data
const dummyUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    linkedin: 'https://linkedin.com/in/johndoe',
    portfolio: 'https://johndoeportfolio.com',
    appliedJobs: ['JOB001']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    linkedin: 'https://linkedin.com/in/janesmith',
    portfolio: 'https://janesmithportfolio.com',
    appliedJobs: []
  }
];

export default function JobDetailClient() {
  const [showModal, setShowModal] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showRedirect, setShowRedirect] = useState(false);
  
  // Check if user is logged in and has applied
  useEffect(() => {
    // Simulate checking if user is logged in
    const isLoggedIn = Math.random() > 0.5; // 50% chance user is logged in
    
    if (isLoggedIn) {
      // Simulate API delay
      setLoadingCheck(true);
      setTimeout(() => {
        const randomUser = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
        setCurrentUser(randomUser);
        
        // Check if this user has already applied
        const hasApplied = randomUser.appliedJobs.includes(dummyJob._id);
        setAlreadyApplied(hasApplied);
        setLoadingCheck(false);
      }, 500);
    } else {
      setCurrentUser(null);
      setLoadingCheck(false);
    }
  }, []);

  // Mock router back function
  const goBack = () => {
    window.history.back();
  };

  // Handle apply button click
  const handleApplyClick = () => {
    if (!currentUser) {
      setShowRedirect(true);
      return;
    }
    if (alreadyApplied) {
      alert('You have already applied for this job.');
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 py-10 mt-20">
        <article itemScope itemType="https://schema.org/JobPosting">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">{dummyJob.title}</h1>

          <div className="text-gray-700 text-sm space-y-1 mb-6">
            <p><strong>Job ID:</strong> {dummyJob._id}</p>
            <p><strong>Location:</strong> {dummyJob.location}</p>
            <p><strong>Posted On:</strong> {dummyJob.postedOn}</p>
            <p><strong>Deadline:</strong> {dummyJob.endDate}</p>
            <p><strong>Start Date:</strong> {dummyJob.startDate || 'TBD'}</p>
            <p><strong>Experience:</strong> {dummyJob.minExp} – {dummyJob.maxExp} yrs</p>
            <p><strong>Salary:</strong> {dummyJob.salary}</p>
            <p><strong>Job Type:</strong> {dummyJob.jobType}</p>
            <p><strong>Work Mode:</strong> {dummyJob.workMode}</p>
            <p><strong>Duration:</strong> {dummyJob.duration || 'Not specified'}</p>
            {dummyJob.category && <p><strong>Category:</strong> {dummyJob.category}</p>}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Description</h2>
            <p className="text-gray-700">{dummyJob.description}</p>
          </div>

          {dummyJob.responsibilities?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dummyJob.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {dummyJob.qualifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Qualifications</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dummyJob.qualifications.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {dummyJob.skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {dummyJob.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium border border-orange-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {dummyJob.perks?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Perks</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dummyJob.perks.map((perk, i) => (
                  <li key={i}>{perk}</li>
                ))}
              </ul>
            </div>
          )}

          {dummyJob.who_can_apply?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Who Can Apply</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {dummyJob.who_can_apply.map((cond, i) => (
                  <li key={i}>{cond}</li>
                ))}
              </ul>
            </div>
          )}

          <footer className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <button
              onClick={goBack}
              className="text-orange-600 hover:text-orange-800 hover:underline text-sm font-medium"
            >
              &larr; Back to Careers
            </button>
            
            <button
              onClick={handleApplyClick}
              disabled={loadingCheck || alreadyApplied}
              className={`px-6 py-3 rounded text-sm font-medium transition ${
                alreadyApplied
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              {loadingCheck ? 'Checking...' : alreadyApplied ? 'Already Applied' : 'Apply Now'}
            </button>
          </footer>

          {showModal && (
            <ApplyFormModal
              job={dummyJob}
              onClose={() => setShowModal(false)}
              user={currentUser}
            />
          )}

          {showRedirect && (
            <RedirectModal onClose={() => setShowRedirect(false)} />
          )}
        </article>
      </main>
    </>
  );
}