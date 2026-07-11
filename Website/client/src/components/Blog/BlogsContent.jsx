// BlogsContent.jsx
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, AlertCircle } from 'lucide-react';
import Breadcrumbs from '@/components/General/Breadcrumbs';
import BlogHero from './BlogHero';
import EditorPicksSection from './EditorPicksSection';
import HelpfulResourcesSection from './HelpfulResourcesSection';
import ReusableContentSection from './ReusableContentSection';

// Search and Filter Component
const BlogSearchFilter = ({ onSearch, onFilter, activeCategory, categories = ['All'] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-12 px-5 bg-white dark:bg-black">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          />
        </div>

        <div
          className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto flex-grow"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onFilter(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 capitalize
                ${activeCategory === category || (category === 'All' && activeCategory === 'All')
                  ? 'bg-[#FF6600] text-white shadow-md'
                  : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
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
const TrendingTopics = ({ allBlogs = [] }) => {
  // Get trending topics from blog data
  const trendingTopics = allBlogs.reduce((acc, blog) => {
    const category = blog.metadata.category;
    const existingTopic = acc.find(topic => topic.name === category);
    if (existingTopic) {
      existingTopic.posts += 1;
    } else {
      acc.push({ name: category, posts: 1 });
    }
    return acc;
  }, []);

  return (
    <div className="bg-white dark:bg-black rounded-2xl p-8 border border-gray-200 dark:border-zinc-800 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-[#FF6600]" />
        Trending Topics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {trendingTopics.map((topic, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 text-center cursor-pointer hover:bg-[#FF6600]/5 hover:border-[#FF6600]/30 border border-transparent transition-all group"
          >
            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-[#FF6600] mb-1 capitalize">
              {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-[#FF6600]">
              {topic.posts} post{topic.posts !== 1 ? 's' : ''}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Main BlogsContent Component
const BlogsContent = ({
  allBlogs = [],
  editorPicks = [],
  sliderBlogs = [],
  helpfulResources = [],
  error = null
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Initialize filteredBlogs with allBlogs when component mounts or allBlogs changes
  useEffect(() => {
    setFilteredBlogs(allBlogs);
  }, [allBlogs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterBlogs(term, activeCategory);
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    filterBlogs(searchTerm, category);
  };

  const blogCategories = useMemo(() => {
    const cats = new Set(allBlogs.map((b) => b.metadata?.category).filter(Boolean));
    return ['All', ...Array.from(cats).sort()];
  }, [allBlogs]);

  const filterBlogs = (search, category) => {
    const filtered = allBlogs.filter(blog => {
      const matchesSearch = !search ||
        blog.metadata.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.metadata.description.toLowerCase().includes(search.toLowerCase()) ||
        blog.metadata.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === 'All' || blog.metadata.category === category;

      return matchesSearch && matchesCategory;
    });

    setFilteredBlogs(filtered);
  };

  // Show error state if provided
  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-[#FF6600] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Unable to Load Blogs</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#FF6600] text-white rounded-lg hover:bg-[#E55A00] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading state if no blogs
  if (allBlogs.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF6600] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blogs' },
          ]}
        />
      </div>
      <BlogHero sliderBlogs={sliderBlogs} />
      {editorPicks.length > 0 && <EditorPicksSection editorPicks={editorPicks} />}
      {helpfulResources.length > 0 && <HelpfulResourcesSection helpfulResources={helpfulResources} />}
      {allBlogs.length > 0 && <TrendingTopics allBlogs={allBlogs} />}
      <BlogSearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        activeCategory={activeCategory}
        categories={blogCategories}
      />
      <ReusableContentSection allBlogs={filteredBlogs} />
    </div>
  );
};

export default BlogsContent;
