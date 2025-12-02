import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Using your provided data structure, but organizing it by Department to match the image layout
const jobsByDepartment = {
  Engineering: [
    {
      id: 1,
      title: "Senior iOS Engineer",
      location: "MULTIPLE LOCATIONS",
      jobId: "ENG001", // Add unique job ID
    },
    {
      id: 2,
      title: "Senior Full Stack Engineer",
      location: "MULTIPLE LOCATIONS",
      jobId: "ENG002",
    },
  ],
  Marketing: [
    {
      id: 3,
      title: "YouTube Content Creator Lead",
      location: "LONDON - HYBRID",
      jobId: "MKT001",
    },
    {
      id: 4,
      title: "Influencer Marketing Specialist (YouTube)",
      location: "PHILIPPINES - REMOTE",
      jobId: "MKT002",
    },
    {
      id: 5,
      title: "Influencer & Affiliate Marketing Manager",
      location: "LONDON - HYBRID",
      jobId: "MKT003",
    },
    {
      id: 6,
      title: "Social Media Content Creator",
      location: "LONDON - HYBRID",
      jobId: "MKT004",
    },
  ],
  Design: [
    {
      id: 7,
      title: "Creative Director",
      location: "LONDON - HYBRID",
      jobId: "DES001",
    },
    {
      id: 8,
      title: "Senior Digital Brand Designer",
      location: "MULTIPLE LOCATIONS",
      jobId: "DES002",
    },
  ],
};

// Extended job details for each job ID
const jobDetailsMap = {
  "ENG001": {
    _id: "ENG001",
    title: "Senior iOS Engineer",
    location: "MULTIPLE LOCATIONS",
    postedOn: "2024-01-15",
    endDate: "2024-03-15",
    startDate: "2024-04-01",
    minExp: "5",
    maxExp: "8",
    salary: "$120,000 - $160,000",
    jobType: "Full-time",
    workMode: "Hybrid",
    duration: "Permanent",
    category: "Engineering",
    description: 'We are seeking an experienced Senior iOS Engineer to lead the development of our mobile applications. You will be responsible for architecting, building, and maintaining high-performance iOS applications.',
    responsibilities: [
      'Lead iOS app development from concept to deployment',
      'Architect and implement scalable mobile solutions',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with cross-functional teams',
      'Stay updated with latest iOS technologies and trends'
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      '5+ years of iOS development experience',
      'Expertise in Swift and Objective-C',
      'Experience with iOS frameworks and architecture patterns',
      'Published apps on the App Store'
    ],
    skills: ['Swift', 'Objective-C', 'iOS SDK', 'Xcode', 'Git', 'CI/CD'],
    perks: [
      'Competitive salary with bonuses',
      'Comprehensive health benefits',
      'Stock options',
      'Flexible work schedule',
      'Conference & training budget'
    ],
    who_can_apply: [
      'Only candidates with 5+ years of iOS experience',
      'Must have published at least 2 apps on App Store',
      'Available for occasional team meetings'
    ]
  },
  "ENG002": {
    _id: "ENG002",
    title: "Senior Full Stack Engineer",
    location: "MULTIPLE LOCATIONS",
    postedOn: "2024-01-20",
    endDate: "2024-03-20",
    startDate: "2024-04-15",
    minExp: "4",
    maxExp: "7",
    salary: "$110,000 - $150,000",
    jobType: "Full-time",
    workMode: "Remote",
    duration: "Permanent",
    category: "Engineering",
    description: 'Looking for a Senior Full Stack Engineer to build end-to-end solutions. You will work on both frontend and backend systems, ensuring seamless integration and optimal performance.',
    responsibilities: [
      'Develop full-stack web applications',
      'Design and implement RESTful APIs',
      'Optimize database performance',
      'Implement security best practices',
      'Collaborate with product and design teams'
    ],
    qualifications: [
      "Bachelor's degree in Computer Science",
      '4+ years of full-stack development',
      'Proficiency in React and Node.js',
      'Experience with databases (SQL/NoSQL)',
      'Knowledge of cloud platforms (AWS/Azure)'
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
    perks: [
      'Remote-first culture',
      'Health insurance',
      'Unlimited PTO',
      'Home office stipend',
      'Annual learning credit'
    ],
    who_can_apply: [
      'Minimum 4 years of experience required',
      'Must have portfolio of previous projects',
      'Available for occasional sync meetings'
    ]
  },
  // Add similar data for other job IDs...
};

const OpenRolesSection = () => {
  const navigate = useNavigate();

  const handleJobClick = (job) => {
    // Navigate to job details page with job ID
    navigate(`/job/${job.jobId}`);
  };

  return (
    <div className="bg-white min-h-screen py-16 md:py-24 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT COLUMN: Sticky Header & Info [#303236] */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#303236] leading-tight mb-6">
                Open Roles
              </h1>
              
              <div className="space-y-4 text-[#1a1a1a] text-sm md:text-base font-medium leading-relaxed max-w-xs">
                <p>
                  We operate across major Indian cities: <span className="opacity-60 text-xs uppercase font-bold mr-1">DL</span> Delhi, <span className="opacity-60 text-xs uppercase font-bold mr-1">MH</span> Mumbai, and <span className="opacity-60 text-xs uppercase font-bold mr-1">KA</span> Bangalore.
                </p>
                <p>
                  With additional presence in <span className="opacity-60 text-xs uppercase font-bold mr-1">TN</span> Chennai for Operations and <span className="opacity-60 text-xs uppercase font-bold mr-1">TG</span> Hyderabad for our Technical teams.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Job Lists */}
          <div className="lg:w-2/3">
            {Object.entries(jobsByDepartment).map(([department, jobs], deptIndex) => (
              <div key={department} className={`mb-16 ${deptIndex !== 0 ? 'mt-16' : ''}`}>
                <h2 className="text-3xl font-medium text-[#1a1a1a] mb-6 tracking-tight">
                  {department}
                </h2>
                
                <div className="flex flex-col space-y-2">
                  {jobs.map((job) => (
                    <div 
                      key={job.id} 
                      onClick={() => handleJobClick(job)}
                      className="
                        group block relative rounded-xl p-6 
                        bg-white overflow-hidden
                        transition-all duration-300 
                        cursor-pointer no-underline
                        border border-gray-100 hover:border-orange-200
                      "
                    >
                      {/* Hover Gradient */}
                      <span
                        className="
                          absolute inset-0 
                          bg-gradient-to-r from-white to-orange-50
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                          pointer-events-none
                        "
                      ></span>

                      {/* Content Wrapper */}
                      <div className="relative z-10 flex items-start justify-between">
                        
                        {/* Left Content */}
                        <div className="flex flex-col">
                          <h3 className="text-lg md:text-xl font-medium text-[#1a1a1a] mb-2">
                            {job.title}
                          </h3>

                          <span className="
                            flex items-center text-sm font-semibold text-[#1a1a1a]
                            transition-colors
                            group-hover:text-orange-600
                          ">
                            View Details & Apply
                            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>

                        {/* Location Tag */}
                        <div className="shrink-0 ml-4">
                          <span
                            className="
                              bg-[#333333] text-white text-[10px] md:text-[11px]
                              font-bold px-3 py-1.5 rounded uppercase tracking-wider
                              transition-colors duration-300
                              group-hover:bg-gradient-to-r from-orange-600 via-orange-300 to-orange-600
                            "
                          >
                            {job.location}
                          </span>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default OpenRolesSection;