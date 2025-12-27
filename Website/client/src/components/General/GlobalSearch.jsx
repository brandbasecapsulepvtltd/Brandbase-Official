import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, X, FileText, Briefcase, ChevronRight, Loader2, Command } from 'lucide-react';

const GlobalSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [data, setData] = useState({ services: [], blogs: [] });
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);

    const API_KEY = "8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de";

    // Toggle Modal & Keyboard Shortcut (Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsModalOpen(prev => !prev);
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
                const headers = { 'Authorization': `Bearer ${API_KEY}` };
                const [servicesRes, blogsRes] = await Promise.all([
                    axios.get('https://brandbase.onrender.com/api/services', { headers }),
                    axios.get('https://brandbase.onrender.com/api/blogs', { headers })
                ]);
                setData({
                    services: servicesRes.data.data || [],
                    blogs: blogsRes.data.data || []
                });
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter Logic
    const filteredServices = data.services.filter(item =>
        item.data?.hero?.headline?.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
    );

    const filteredBlogs = data.blogs.filter(item =>
        item.metadata?.title?.toLowerCase().includes(query.toLowerCase()) ||
        item.metadata?.category?.toLowerCase().includes(query.toLowerCase())
    );

    const highlightText = (text, highlight) => {
        if (!highlight.trim()) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return parts.map((part, i) => 
            part.toLowerCase() === highlight.toLowerCase() ? 
            <span key={i} className="text-blue-600 font-bold underline decoration-blue-200">{part}</span> : part
        );
    };

    return (
        <>
            {/* 1. FLOATING TRIGGER BUTTON (Top Right) */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="fixed top-6 right-6 z-40 flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:shadow-xl hover:border-blue-400 transition-all group active:scale-95 mt-20"
            >
                <Search className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                <span className="hidden md:block text-sm font-medium text-gray-600">Search...</span>
                <kbd className="hidden md:flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-gray-400 bg-gray-100 rounded border border-gray-200">
                    <Command className="w-3 h-3" /> K
                </kbd>
            </button>

            {/* 2. SEARCH MODAL OVERLAY */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Search Container */}
                    <div 
                        ref={modalRef}
                        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 slide-in-from-top-4 duration-300"
                    >
                        {/* Search Input Area */}
                        <div className="flex items-center px-6 py-5 border-b border-gray-100">
                            <Search className="w-6 h-6 text-blue-500" />
                            <input
                                autoFocus
                                type="text"
                                className="flex-1 ml-4 outline-none text-xl text-gray-800 placeholder-gray-400"
                                placeholder="What are you looking for?"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                            ) : (
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex px-6 bg-gray-50/50 border-b border-gray-100">
                            {['All', 'Services', 'Blogs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`mr-8 py-3 text-sm font-bold transition-all border-b-2 ${
                                        activeTab === tab 
                                        ? 'border-blue-600 text-blue-600' 
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    {tab}
                                    <span className="ml-1.5 opacity-50 text-[10px] uppercase">
                                        {tab === 'Services' && filteredServices.length}
                                        {tab === 'Blogs' && filteredBlogs.length}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[65vh] overflow-y-auto p-4 custom-scrollbar">
                            {query.length === 0 ? (
                                <div className="py-10 text-center text-gray-400">
                                    <Command className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                    <p className="text-sm font-medium">Start typing to search across the platform</p>
                                </div>
                            ) : (
                                <>
                                    {/* SERVICES */}
                                    {(activeTab === 'All' || activeTab === 'Services') && filteredServices.map((service) => (
                                        <div key={service._id} className="flex items-center p-3 hover:bg-blue-50 rounded-2xl group cursor-pointer transition-all mb-1">
                                            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                                                <Briefcase className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest px-1.5 py-0.5 bg-purple-50 rounded">Service</span>
                                                    <span className="text-xs text-gray-400 font-medium">{service.category}</span>
                                                </div>
                                                <p className="text-[15px] font-semibold text-gray-800 mt-0.5">
                                                    {highlightText(service.data?.hero?.headline || 'Service', query)}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}

                                    {/* BLOGS */}
                                    {(activeTab === 'All' || activeTab === 'Blogs') && filteredBlogs.map((blog) => (
                                        <div key={blog._id} className="flex items-center p-3 hover:bg-blue-50 rounded-2xl group cursor-pointer transition-all mb-1">
                                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-1.5 py-0.5 bg-blue-50 rounded">Blog</span>
                                                    <span className="text-xs text-gray-400 font-medium">{blog.metadata?.readTime}</span>
                                                </div>
                                                <p className="text-[15px] font-semibold text-gray-800 mt-0.5">
                                                    {highlightText(blog.metadata?.title, query)}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 translate-x-0 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}

                                    {/* Empty State */}
                                    {filteredServices.length === 0 && filteredBlogs.length === 0 && (
                                        <div className="py-20 text-center">
                                            <p className="text-gray-400 font-medium">No results for "{query}"</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        
                        {/* Footer Tips */}
                        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-[11px] text-gray-400 font-medium">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1"><span className="bg-white px-1.5 py-0.5 rounded border shadow-sm text-gray-500">ESC</span> to close</span>
                                <span className="flex items-center gap-1"><span className="bg-white px-1.5 py-0.5 rounded border shadow-sm text-gray-500">↑↓</span> to navigate</span>
                            </div>
                            <span className="text-blue-500 font-bold uppercase tracking-tighter">BrandBase Search</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GlobalSearch;