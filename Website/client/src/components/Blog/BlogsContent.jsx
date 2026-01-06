// BlogsContent.jsx
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, TrendingUp } from 'lucide-react';
import BlogHero from './BlogHero';
import EditorPicksSection from './EditorPicksSection';
import HelpfulResourcesSection from './HelpfulResourcesSection';
import ReusableContentSection from './ReusableContentSection';
import { BlogsData, getEditorsPicks, getHelpfulResources, getSliderBlogs } from '@/Data/BlogsData';

// Blog categories for filtering
const blogCategories = [
  "All",
  "productivity",
  "technology",
  "wellness",
  "marketing",
  "business"
];

// Search and Filter Component
const BlogSearchFilter = ({ onSearch, onFilter, activeCategory }) => {
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
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        
        <div
          className="flex items-center gap-3 overflow-x-auto pb-2 w-full md:w-auto flex-grow"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => onFilter(category)}
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
  // Get trending topics from blog data
  const trendingTopics = BlogsData.reduce((acc, blog) => {
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
    <div className="bg-white dark:bg-black rounded-2xl p-8 border border-gray-200 mb-12">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
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
            <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 mb-1">
              {topic.name.charAt(0).toUpperCase() + topic.name.slice(1)}
            </div>
            <div className="text-sm text-gray-500 group-hover:text-orange-500">
              {topic.posts} post{topic.posts !== 1 ? 's' : ''}
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
  const [filteredBlogs, setFilteredBlogs] = useState(BlogsData);

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterBlogs(term, activeCategory);
  };

  const handleFilter = (category) => {
    setActiveCategory(category);
    filterBlogs(searchTerm, category);
  };

  const filterBlogs = (search, category) => {
    const filtered = BlogsData.filter(blog => {
      const matchesSearch = !search || 
        blog.metadata.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.metadata.description.toLowerCase().includes(search.toLowerCase()) ||
        blog.metadata.category.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = category === 'All' || blog.metadata.category === category;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredBlogs(filtered);
  };

  // Get data for components
  const editorPicks = getEditorsPicks();
  const sliderBlogs = BlogsData.filter(blog => blog.metadata.isSlider);
  const helpfulResources = BlogsData.filter(blog => blog.metadata.isHelpfulResources);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <BlogHero sliderBlogs={sliderBlogs} />
      <EditorPicksSection editorPicks={editorPicks} />
      <HelpfulResourcesSection helpfulResources={helpfulResources} />
      <TrendingTopics />
      <BlogSearchFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        activeCategory={activeCategory}
      />
      <ReusableContentSection allBlogs={filteredBlogs} />
    </div>
  );
};

export default BlogsContent;
