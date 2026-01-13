import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, X, FileText, Briefcase, ChevronRight, Command } from 'lucide-react';

const GlobalSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [data, setData] = useState({ services: [], blogs: [] });
    const [loading, setLoading] = useState(false);

    const API_KEY = "8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de";

    // Function to generate URL for services using slug and category from API
    const getServiceUrl = (service) => {
        // Use the slug and category from the API response
        const category = service.category?.toLowerCase().replace(/\s+/g, '-') || 'services';
        const slug = service.slug || service.data?.hero?.headline?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        if (category && slug) {
            return `/services/${category}/${slug}`;
        }
        return '/services';
    };

    // Function to generate URL for blogs using slug and category from API
    const getBlogUrl = (blog) => {
        // Use the slug and category from the API response
        const category = blog.metadata?.category?.toLowerCase().replace(/\s+/g, '-') || 'blogs';
        const slug = blog.metadata?.slug || blog.metadata?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        if (category && slug) {
            return `/blogs/${category}/${slug}`;
        }
        return '/blogs';
    };

    // Handle click on result item
    const handleResultClick = (url) => {
        setIsModalOpen(false); // Close modal
        setQuery(''); // Clear search query
        // Navigation will happen via the <a> tag
    };

    // Keyboard Shortcut (Cmd/K or Ctrl/K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsModalOpen(true);
            }
            if (e.key === 'Escape') setIsModalOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [blogsRawRes, servicesRawRes, portfoliosRawRes] = await Promise.all([
                    fetch(`https://api.brandbasecapsule.com/api/blogs?search=${encodeURIComponent(query)}&limit=5`, {
                        headers: { 'X-API-Key': API_KEY }
                    }),
                    fetch(`https://api.brandbasecapsule.com/api/services?search=${encodeURIComponent(query)}&limit=5`, {
                        headers: { 'X-API-Key': API_KEY }
                    }),
                    fetch(`https://api.brandbasecapsule.com/api/portfolios?search=${encodeURIComponent(query)}&limit=5`, {
                        headers: { 'X-API-Key': API_KEY }
                    })
                ]);

                const [blogsRes, servicesRes, portfoliosRes] = await Promise.all([
                    blogsRawRes.json(),
                    servicesRawRes.json(),
                    portfoliosRawRes.json()
                ]);

                setData({
                    services: servicesRes.data || [],
                    blogs: blogsRes.data || [],
                    portfolios: portfoliosRes.data || []
                });
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredServices = data.services.filter(item =>
        item.data?.hero?.headline?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.slug?.toLowerCase().includes(query.toLowerCase())
    );

    const filteredBlogs = data.blogs.filter(item =>
        item.metadata?.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.category?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.slug?.toLowerCase().includes(query.toLowerCase())
    );

    const highlightText = (text, highlight) => {
        if (!text || !highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) =>
            part.toLowerCase() === highlight.toLowerCase() ?
                <span key={i} className="text-blue-600 font-bold underline decoration-blue-200">{part}</span> : part
        );
    };

    return (
        <div className="relative w-full max-w-sm">
            {/* 1. NAVBAR TRIGGER */}
            <div
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center justify-between px-3 py-1.5 bg-white dark:bg-zinc-900 dark:bg-black rounded-xl cursor-pointer transition-all duration-200"
            >
                <div className="flex items-center gap-2.5">
                    <Search className="w-6 h-6 text-orange-500 group-hover:text-orange-600" />
                </div>
            </div>

            {/* 2. COMMAND PALETTE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4">
                    <div
                        className="absolute inset-0 animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Search Container */}
                    <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 dark:bg-black rounded-[2rem] shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300">

                        {/* Search Input Area */}
                        <div className="flex items-center px-6 py-5 border-b border-gray-50">
                            <Search className="w-6 h-6 text-blue-500" />
                            <input
                                autoFocus
                                type="text"
                                className="flex-1 ml-4 outline-none text-xl text-gray-800 dark:text-gray-200 dark:text-gray-200 placeholder-gray-400 font-medium"
                                placeholder="What can we help you find?"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 bg-gray-50 dark:bg-zinc-900 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 dark:text-gray-300"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Heading Tabs */}
                        <div className="flex px-8 border-b border-gray-50">
                            {['All', 'Services', 'Blogs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`mr-8 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab
                                            ? 'border-blue-600 text-blue-600'
                                            : 'border-transparent text-gray-400 hover:text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                    {(tab === 'Services' || tab === 'Blogs') && (
                                        <span className="ml-1.5 text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full group-hover:bg-blue-50">
                                            {tab === 'Services' ? filteredServices.length : filteredBlogs.length}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Results List */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                            {query.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Search for services, articles, or categories</p>
                                    <p className="text-xs text-gray-400 mt-1 italic">Try searching "Marketing" or "UI Design"</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {/* SERVICES */}
                                    {(activeTab === 'All' || activeTab === 'Services') && filteredServices.map((service) => {
                                        const serviceUrl = getServiceUrl(service);
                                        return (
                                            <a
                                                key={service._id}
                                                href={serviceUrl}
                                                onClick={() => handleResultClick(serviceUrl)}
                                                className="block no-underline text-inherit hover:no-underline"
                                            >
                                                <div className="flex items-center p-3.5 hover:bg-gray-50 dark:bg-zinc-900 rounded-2xl group cursor-pointer transition-all border border-transparent hover:border-gray-100">
                                                    <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mr-4 shadow-sm group-hover:scale-110 transition-transform">
                                                        <Briefcase className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Service</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                                                                {service.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </span>
                                                        </div>
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200">
                                                            {highlightText(service.data?.hero?.headline || 'Service', query)}
                                                        </p>
                                                        {service.slug && (
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                /services/{service.category}/{service.slug}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-900 dark:bg-black p-2 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 transition-all">
                                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}

                                    {/* BLOGS */}
                                    {(activeTab === 'All' || activeTab === 'Blogs') && filteredBlogs.map((blog) => {
                                        const blogUrl = getBlogUrl(blog);
                                        return (
                                            <a
                                                key={blog._id}
                                                href={blogUrl}
                                                onClick={() => handleResultClick(blogUrl)}
                                                className="block no-underline text-inherit hover:no-underline"
                                            >
                                                <div className="flex items-center p-3.5 hover:bg-gray-50 dark:bg-zinc-900 rounded-2xl group cursor-pointer transition-all border border-transparent hover:border-gray-100">
                                                    <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mr-4 shadow-sm group-hover:scale-110 transition-transform">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Article</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                                                                {blog.metadata?.category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                            </span>
                                                        </div>
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200 dark:text-gray-200">
                                                            {highlightText(blog.metadata?.title, query)}
                                                        </p>
                                                        {blog.metadata?.slug && (
                                                            <p className="text-xs text-gray-400 mt-1">
                                                                /blogs/{blog.metadata.category}/{blog.metadata.slug}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-900 dark:bg-black p-2 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 transition-all">
                                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}

                                    {/* Empty State */}
                                    {filteredServices.length === 0 && filteredBlogs.length === 0 && (
                                        <div className="py-20 text-center">
                                            <div className="text-4xl mb-4">🔍</div>
                                            <p className="text-gray-900 dark:text-gray-100 dark:text-gray-100 font-bold">No results found for "{query}"</p>
                                            <p className="text-gray-400 text-sm mt-1">Try different keywords or check your spelling.</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Navigation Hints */}
                        <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900/80 border-t border-gray-100 flex items-center gap-6 text-[11px] text-gray-400 font-bold tracking-tight">
                            <div className="flex items-center gap-1.5">
                                <span className="bg-white dark:bg-zinc-900 dark:bg-black px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 dark:text-gray-300 shadow-sm">ESC</span> Close
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="bg-white dark:bg-zinc-900 dark:bg-black px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 dark:text-gray-300 shadow-sm">↵</span> Select
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="bg-white dark:bg-zinc-900 dark:bg-black px-1.5 py-0.5 rounded border border-gray-200 text-gray-600 dark:text-gray-300 shadow-sm">↑↓</span> Navigate
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobalSearch;
