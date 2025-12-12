'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Filter, TrendingUp, BookOpen, Users, Share2 } from 'lucide-react';
import BlogHero from './BlogHero';
import EditorPicksSection from './EditorPicksSection';
import HelpfulResourcesSection from './HelpfulResourcesSection';
import ReusableContentSection from './ReusableContentSection';

// Enhanced JSON data for blog sections
const blogSections = [
  {
    title: "Featured Articles",
    category: "featured",
    posts: [
      {
        slug: "ai-in-digital-marketing",
        title: "The Future of AI in Digital Marketing",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
        category: "Technology",
        excerpt: "Discover how artificial intelligence is revolutionizing digital marketing strategies and what it means for your business.",
        date: "Jan 15, 2024",
        readTime: "8 min read",
        featured: true
      },
      {
        slug: "content-strategy-2024",
        title: "Content Strategy Trends for 2024",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        category: "Marketing",
        excerpt: "Stay ahead with the latest content strategy trends shaping the digital landscape this year.",
        date: "Feb 3, 2024",
        readTime: "6 min read",
        featured: true
      }
    ]
  },
  {
    title: "Latest Articles",
    category: "latest",
    posts: [
      {
        slug: "social-media-algorithms",
        title: "Understanding Social Media Algorithms",
        image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400&h=300&fit=crop",
        category: "Social Media",
        excerpt: "Master social media algorithms to boost your organic reach and engagement.",
        date: "Mar 12, 2024",
        readTime: "5 min read",
        featured: false
      },
      {
        slug: "brand-storytelling",
        title: "The Power of Brand Storytelling",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
        category: "Branding",
        excerpt: "Learn how compelling brand stories can create emotional connections with your audience.",
        date: "Apr 5, 2024",
        readTime: "7 min read",
        featured: false
      },
      {
        slug: "seo-strategy-2024",
        title: "SEO Strategy for 2024: What's Changed?",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        category: "SEO",
        excerpt: "Latest SEO updates and strategies to keep your website ranking high.",
        date: "May 20, 2024",
        readTime: "9 min read",
        featured: false
      },
      {
        slug: "video-marketing-tips",
        title: "Video Marketing Tips for Small Businesses",
        image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=300&fit=crop",
        category: "Video Production",
        excerpt: "Effective video marketing strategies that deliver results without breaking the bank.",
        date: "Jun 8, 2024",
        readTime: "6 min read",
        featured: false
      }
    ]
  }
];

// Blog categories for filtering
const blogCategories = [
  "All",
  "Technology",
  "Marketing",
  "Social Media",
  "Branding",
];

// Search and Filter Component
const BlogSearchFilter = ({ onSearch, onFilter, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-12 px-5">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
<div
  // Ensure the container allows horizontal scrolling on small screens
  // and adapts its width correctly.
  className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto flex-grow"
  style={{ WebkitOverflowScrolling: 'touch' }} // Optional: Improves scrolling smoothness on iOS
>
  {blogCategories.map((category) => (
    <button
      key={category}
      onClick={() => onFilter(category)}
      // 'whitespace-nowrap' is essential to keep buttons on a single line, enabling scrolling.
      className={`
        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
        ${activeCategory === category || (category === 'All' && !activeCategory)
          ? 'bg-orange-600 text-white shadow-lg'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {category}
    </button>
  ))}
</div>
      </div>
    </div>
  );
};


// Trending Topics Component
const TrendingTopics = () => {
  const trendingTopics = [
    { name: "AI Marketing", posts: 24 },
    { name: "Content Strategy", posts: 18 },
    { name: "Social Media", posts: 32 },
    { name: "Brand Building", posts: 15 },
    { name: "SEO Optimization", posts: 27 },
    { name: "Video Marketing", posts: 21 }
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-orange-600" />
        Trending Topics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 rounded-xl p-4 text-center cursor-pointer hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group"
          >
            <div className="font-semibold text-gray-900 group-hover:text-orange-600 mb-1">
              {topic.name}
            </div>
            <div className="text-sm text-gray-500 group-hover:text-orange-500">
              {topic.posts} posts
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main BlogsContent Component
const BlogsContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredSections, setFilteredSections] = useState(blogSections);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterContent(term, activeCategory);
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    filterContent(searchTerm, category);
  };

  const filterContent = (search, category) => {
    const filtered = blogSections.map(section => ({
      ...section,
      posts: section.posts.filter(post => {
        const matchesSearch = !search || 
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
          post.category.toLowerCase().includes(search.toLowerCase());
        
        const matchesCategory = category === 'All' || post.category === category;
        
        return matchesSearch && matchesCategory;
      })
    })).filter(section => section.posts.length > 0);
    
    setFilteredSections(filtered);
  };

  return (
    <div className="min-h-screen">
      <BlogHero/>
      <EditorPicksSection/>
      <HelpfulResourcesSection/>

              <BlogSearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          activeCategory={activeCategory}
        />
        <TrendingTopics />
      <ReusableContentSection/>
    </div>
  );
};

export default BlogsContent;