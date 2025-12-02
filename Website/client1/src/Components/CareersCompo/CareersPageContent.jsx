import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import CareerHero from './CareerHero';
import CareerBento from './CareerBento';
import BrandbaseCapsuleCareersSection from './BrandbaseCapsuleCareersSection';
import BenefitsSection from './BenefitsSection';
import OpenRolesSection from './OpenRolesSection';
// Dummy job data
const dummyJobData = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "New York, NY",
    postedOn: "2024-01-15",
    endDate: "2024-02-15",
    minExp: 2,
    maxExp: 5,
    skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"],
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$80,000 - $120,000"
  },
  {
    id: 2,
    title: "Backend Engineer",
    location: "San Francisco, CA",
    postedOn: "2024-01-10",
    endDate: "2024-02-10",
    minExp: 3,
    maxExp: 7,
    skills: ["Node.js", "Python", "MongoDB", "AWS", "Docker"],
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "$100,000 - $140,000"
  },
  {
    id: 3,
    title: "UX Designer",
    location: "Chicago, IL",
    postedOn: "2024-01-20",
    endDate: "2024-02-20",
    minExp: 1,
    maxExp: 4,
    skills: ["Figma", "Sketch", "Adobe XD", "User Research", "Prototyping"],
    workMode: "On-site",
    jobType: "Full-time",
    salary: "$70,000 - $100,000"
  },
  {
    id: 4,
    title: "Data Scientist",
    location: "Boston, MA",
    postedOn: "2024-01-18",
    endDate: "2024-02-18",
    minExp: 4,
    maxExp: 8,
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "PyTorch"],
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$110,000 - $150,000"
  },
  {
    id: 5,
    title: "DevOps Engineer",
    location: "Austin, TX",
    postedOn: "2024-01-12",
    endDate: "2024-02-12",
    minExp: 3,
    maxExp: 6,
    skills: ["Kubernetes", "AWS", "Terraform", "CI/CD", "Linux"],
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "$95,000 - $130,000"
  },
  {
    id: 6,
    title: "Product Manager",
    location: "Seattle, WA",
    postedOn: "2024-01-22",
    endDate: "2024-02-22",
    minExp: 5,
    maxExp: 10,
    skills: ["Product Strategy", "Agile", "JIRA", "User Stories", "Roadmapping"],
    workMode: "On-site",
    jobType: "Full-time",
    salary: "$120,000 - $160,000"
  },
  {
    id: 7,
    title: "Mobile Developer",
    location: "Miami, FL",
    postedOn: "2024-01-14",
    endDate: "2024-02-14",
    minExp: 2,
    maxExp: 5,
    skills: ["React Native", "iOS", "Android", "JavaScript", "Redux"],
    workMode: "Remote",
    jobType: "Contract",
    salary: "$85,000 - $115,000"
  },
  {
    id: 8,
    title: "QA Engineer",
    location: "Denver, CO",
    postedOn: "2024-01-16",
    endDate: "2024-02-16",
    minExp: 1,
    maxExp: 4,
    skills: ["Selenium", "Jest", "Cypress", "Test Automation", "JIRA"],
    workMode: "Hybrid",
    jobType: "Full-time",
    salary: "$75,000 - $100,000"
  },
  {
    id: 9,
    title: "Full Stack Developer",
    location: "Portland, OR",
    postedOn: "2024-01-19",
    endDate: "2024-02-19",
    minExp: 3,
    maxExp: 6,
    skills: ["React", "Node.js", "PostgreSQL", "Express", "REST APIs"],
    workMode: "Remote",
    jobType: "Full-time",
    salary: "$90,000 - $125,000"
  }
];


const CareersPageContent = () => {
  const [jobData, setJobData] = useState([]);
  const [likedJobs, setLikedJobs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState("newest");
  const [page, setPage] = useState(1);
  const jobsPerPage = 9;

  // Load saved jobs from localStorage
  useEffect(() => {
    const loadSavedJobs = () => {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('savedJobs');
          setLikedJobs(stored ? JSON.parse(stored) : []);
        } catch (error) {
          console.error('Error loading saved jobs:', error);
          setLikedJobs([]);
        }
      }
    };

    loadSavedJobs();
    
    // Listen for storage changes from other tabs
    const handleStorageChange = (e) => {
      if (e.key === 'savedJobs') {
        try {
          setLikedJobs(e.newValue ? JSON.parse(e.newValue) : []);
        } catch (error) {
          setLikedJobs([]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Load dummy data
  useEffect(() => {
    setJobData(dummyJobData);
  }, []);

  // Toggle like/save job
  const toggleLike = (jobId) => {
    setLikedJobs((prev) => {
      const newLiked = prev.includes(jobId) 
        ? prev.filter((id) => id !== jobId) 
        : [...prev, jobId];
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('savedJobs', JSON.stringify(newLiked));
        } catch (error) {
          console.error('Error saving to localStorage:', error);
        }
      }
      
      return newLiked;
    });
  };

  // Filter jobs based on search keyword
  const filteredJobs = jobData.filter((job) =>
    job.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortOption === "newest") return new Date(b.postedOn) - new Date(a.postedOn);
    if (sortOption === "oldest") return new Date(a.postedOn) - new Date(b.postedOn);
    if (sortOption === "exp-low") return a.minExp - b.minExp;
    if (sortOption === "exp-high") return b.maxExp - a.maxExp;
    return 0;
  });

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const visibleJobs = sortedJobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  return (
    <div className="min-h-screen">
      <CareerHero/>
      <CareerBento/>
      <OpenRolesSection/>
      <BrandbaseCapsuleCareersSection/>
      <BenefitsSection/>
    </div>
  );
};

export default CareersPageContent;