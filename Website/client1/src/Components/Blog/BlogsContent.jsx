'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Filter, TrendingUp, BookOpen, Users, Share2 } from 'lucide-react';

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
  "SEO",
  "Video Production"
];

// Stats component
const BlogStats = () => (
  <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-8 text-white mb-12">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div>
        <div className="text-3xl font-bold mb-2">250+</div>
        <div className="text-orange-100 text-sm">Articles Published</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">50K+</div>
        <div className="text-orange-100 text-sm">Monthly Readers</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">15+</div>
        <div className="text-orange-100 text-sm">Expert Writers</div>
      </div>
      <div>
        <div className="text-3xl font-bold mb-2">98%</div>
        <div className="text-orange-100 text-sm">Reader Satisfaction</div>
      </div>
    </div>
  </div>
);

// Search and Filter Component
const BlogSearchFilter = ({ onSearch, onFilter, activeCategory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-12">
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
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => onFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === category || (category === 'All' && !activeCategory)
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced BlogCard Component
const BlogCard = ({ id, title, image, category, excerpt, date, readTime, featured }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blogs/${id}`);
  };

  return (
    <motion.div 
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-xs font-medium shadow-lg">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            {category}
          </span>
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
        
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-orange-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read Article
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Carousel Component
const Carousel = ({ blogPosts }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
          >
            ←
          </button>
          <button
            onClick={scrollRight}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-orange-500 hover:text-orange-600 transition-all shadow-sm"
          >
            →
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {blogPosts.length} articles
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-8 -mx-4 px-4"
        style={{ 
          scrollbarWidth: 'thin',
          scrollbarColor: '#f97316 transparent'
        }}
      >
        {blogPosts.map((post, index) => (
          <div key={index} className="flex-shrink-0 w-80 lg:w-96">
            <BlogCard
              id={post.slug}
              title={post.title}
              image={post.image}
              category={post.category}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              featured={post.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Grid Layout for non-carousel sections
const BlogGrid = ({ blogPosts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {blogPosts.map((post, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <BlogCard
          id={post.slug}
          title={post.title}
          image={post.image}
          category={post.category}
          excerpt={post.excerpt}
          date={post.date}
          readTime={post.readTime}
          featured={post.featured}
        />
      </motion.div>
    ))}
  </div>
);

// Enhanced BlogsHero Component
const BlogsHero = () => {
  return (
    <section className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 px-6 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Insights & <span className="text-orange-600">Stories</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover the latest trends, expert tips, and innovative strategies in digital marketing, 
            technology, and branding to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Start Reading
            </button>
            <button className="border border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
              <Users className="w-5 h-5" />
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Newsletter Subscription Component
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setMessage("🎉 Subscribed successfully! Welcome to our community.");
    setEmail("");
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 my-16">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Ahead of the Curve
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get weekly insights, exclusive content, and early access to our latest articles. 
            Join 50,000+ marketers and entrepreneurs.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-800 text-white placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-lg whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          {message && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-green-400 font-medium"
            >
              {message}
            </motion.p>
          )}
          <p className="text-gray-400 text-sm mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
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
    <div className="min-h-screen bg-gray-50">
      <BlogsHero />
      
      <section className="max-w-7xl mx-auto px-6 py-16">
        <BlogStats />
        
        <BlogSearchFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          activeCategory={activeCategory}
        />
        
        <TrendingTopics />

        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <div key={index} className="mb-20">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {section.title}
                  </h2>
                  <p className="text-gray-600">
                    {section.posts.length} articles to explore
                  </p>
                </div>
                <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors flex items-center gap-2">
                  View all
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {section.category === 'featured' ? (
                <BlogGrid blogPosts={section.posts} />
              ) : (
                <Carousel blogPosts={section.posts} />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        <NewsletterSection />
      </section>
    </div>
  );
};

export default BlogsContent;