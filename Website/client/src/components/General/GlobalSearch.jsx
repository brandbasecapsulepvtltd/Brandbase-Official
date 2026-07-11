import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Briefcase, ChevronRight } from 'lucide-react';

const GlobalSearch = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const [data, setData] = useState({ services: [], categories: [], blogs: [], portfolios: [] });
    const [loading, setLoading] = useState(false);

    // Fetch search index via same-origin API route (avoids browser CORS to external API)
    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/search-index');
                if (!response.ok) {
                    throw new Error(`Search index error: ${response.status}`);
                }
                const payload = await response.json();
                setData({
                    services: payload.services || [],
                    categories: payload.categories || [],
                    blogs: payload.blogs || [],
                    portfolios: payload.portfolios || [],
                });
            } catch (error) {
                console.error('Search data unavailable:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);
    const getServiceUrl = (service) => {
        // Use the slug and category from the API response
        const category = service.category?.toLowerCase().replace(/\s+/g, '-') || 'services';
        const slug = service.slug || service.data?.hero?.headline?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

        if (category && slug) {
            return `/services/${category}/${slug}`;
        }
        return '/services';
    };

    // Function to generate URL for service categories
    const getCategoryUrl = (category) => {
        return `/services/${category.category}`;
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

    // Search only returns items that genuinely match the query (no loose fuzzy matching)
    const getSearchResults = (query) => {
        const trimmed = query.trim();
        if (!trimmed || trimmed.length < 2) {
            return { services: [], categories: [], blogs: [], portfolios: [] };
        }

        const lowerQuery = trimmed.toLowerCase();
        const queryTokens = lowerQuery.split(/\s+/).filter(Boolean);
        const MIN_SCORE = 40;

        const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const calculateScore = (text, type = 'general') => {
            if (!text) return 0;

            const lowerText = text.toString().toLowerCase().trim();
            const lowerQueryClean = lowerQuery.replace(/\s+/g, '-');
            let score = 0;

            if (lowerText === lowerQuery || lowerText === lowerQueryClean) {
                score = 100;
            } else if (lowerText.startsWith(lowerQuery) || lowerText.startsWith(lowerQueryClean)) {
                score = 80;
            } else if (new RegExp(`\\b${escapeRegExp(lowerQuery)}\\b`, 'i').test(lowerText)) {
                score = 60;
            } else if (lowerText.includes(lowerQuery) || lowerText.includes(lowerQueryClean)) {
                score = 40;
            } else if (queryTokens.length > 1) {
                const matchedTokens = queryTokens.filter(
                    (token) =>
                        lowerText.includes(token) ||
                        new RegExp(`\\b${escapeRegExp(token)}\\b`, 'i').test(lowerText)
                );
                if (matchedTokens.length === queryTokens.length) score = 50;
                else if (matchedTokens.length > 0) score = 35;
            }

            if (type === 'slug') return score * 2;
            if (type === 'category') return score * 1.5;
            if (type === 'title') return score * 1.2;
            return score;
        };

        const results = { services: [], categories: [], blogs: [], portfolios: [] };

        data.services.forEach(service => {
            let maxScore = 0;
            let bestMatch = '';

            // Check slug (highest priority)
            const slugScore = calculateScore(service.slug, 'slug');
            if (slugScore > maxScore) {
                maxScore = slugScore;
                bestMatch = 'slug';
            }

            // Check headline
            const headlineScore = calculateScore(service.data?.hero?.headline, 'title');
            if (headlineScore > maxScore) {
                maxScore = headlineScore;
                bestMatch = 'headline';
            }

            // Check category
            const categoryScore = calculateScore(service.category, 'category');
            if (categoryScore > maxScore) {
                maxScore = categoryScore;
                bestMatch = 'category';
            }

            // Check subHeadline (standard weight)
            const subHeadlineScore = calculateScore(service.data?.hero?.subHeadline, 'general');
            if (subHeadlineScore > maxScore) {
                maxScore = subHeadlineScore;
                bestMatch = 'subHeadline';
            }

            if (maxScore >= MIN_SCORE) {
                results.services.push({
                    ...service,
                    searchScore: maxScore,
                    matchType: bestMatch
                });
            }
        });

        // Search categories (array of strings)
        data.categories.forEach(categorySlug => {
            const score = calculateScore(categorySlug, 'category');

            if (score >= MIN_SCORE) {
                results.categories.push({
                    category: categorySlug, // Map string to 'category' property
                    _id: categorySlug, // Use string as ID
                    searchScore: score,
                    matchType: 'category'
                });
            }
        });

        // Search blogs
        data.blogs.forEach(blog => {
            let maxScore = 0;
            let bestMatch = '';

            // Check slug
            const slugScore = calculateScore(blog.metadata?.slug, 'slug');
            if (slugScore > maxScore) {
                maxScore = slugScore;
                bestMatch = 'slug';
            }

            // Check title
            const titleScore = calculateScore(blog.metadata?.title, 'title');
            if (titleScore > maxScore) {
                maxScore = titleScore;
                bestMatch = 'title';
            }

            // Check category
            const categoryScore = calculateScore(blog.metadata?.category, 'category');
            if (categoryScore > maxScore) {
                maxScore = categoryScore;
                bestMatch = 'category';
            }

            // Check description
            const descScore = calculateScore(blog.metadata?.description, 'general');
            if (descScore > maxScore) {
                maxScore = descScore;
                bestMatch = 'description';
            }

            if (maxScore >= MIN_SCORE) {
                results.blogs.push({
                    ...blog,
                    searchScore: maxScore,
                    matchType: bestMatch
                });
            }
        });

        // Search portfolios
        data.portfolios.forEach(portfolio => {
            let maxScore = 0;
            let bestMatch = '';

            const slugScore = calculateScore(portfolio.slug, 'slug');
            if (slugScore > maxScore) {
                maxScore = slugScore;
                bestMatch = 'slug';
            }

            // Check title
            const titleScore = calculateScore(portfolio.title || portfolio.name, 'title');
            if (titleScore > maxScore) {
                maxScore = titleScore;
                bestMatch = 'title';
            }

            if (maxScore >= MIN_SCORE) {
                results.portfolios.push({
                    ...portfolio,
                    searchScore: maxScore,
                    matchType: bestMatch
                });
            }
        });

        // Sort results by score (highest first) and limit to top 10 per category
        results.services.sort((a, b) => b.searchScore - a.searchScore).splice(10);
        results.categories.sort((a, b) => b.searchScore - a.searchScore).splice(10);
        results.blogs.sort((a, b) => b.searchScore - a.searchScore).splice(10);
        results.portfolios.sort((a, b) => b.searchScore - a.searchScore).splice(10);

        return results;
    };

    const searchResults = (data.services.length > 0 || data.categories.length > 0 || data.blogs.length > 0) ? getSearchResults(query) : { services: [], categories: [], blogs: [], portfolios: [] };

    const highlightText = (text, highlight) => {
        if (!text || !highlight.trim()) return text;
        const safeHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = text.split(new RegExp(`(${safeHighlight})`, 'gi'));
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
                            {['All', 'Categories', 'Services', 'Portfolios', 'Blogs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`mr-8 py-3 text-sm font-bold transition-all border-b-2 ${activeTab === tab
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-400 hover:text-gray-600 dark:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                    {(tab === 'Services' || tab === 'Categories' || tab === 'Blogs' || tab === 'Portfolios') && (
                                        <span className="ml-1.5 text-[10px] bg-gray-100 text-gray-500 dark:text-gray-400 px-1.5 py-0.5 rounded-full group-hover:bg-blue-50">
                                            {tab === 'Services' ? searchResults.services.length :
                                                tab === 'Categories' ? searchResults.categories.length :
                                                    tab === 'Portfolios' ? searchResults.portfolios.length :
                                                        searchResults.blogs.length}
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
                                    <p className="text-xs text-gray-400 mt-1 italic">Try &quot;exhibition&quot;, &quot;stall design&quot;, or &quot;marketing&quot;</p>
                                </div>
                            ) : query.trim().length < 2 ? (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">Type at least 2 characters to search</p>
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {/* 1. CATEGORIES (Highest Priority) */}
                                    {(activeTab === 'All' || activeTab === 'Categories') && searchResults.categories.map((category) => {
                                        const categoryUrl = `/services/${category.category}`;
                                        return (
                                            <a
                                                key={category._id || category.category}
                                                href={categoryUrl}
                                                onClick={() => handleResultClick(categoryUrl)}
                                                className="block no-underline text-inherit hover:no-underline"
                                            >
                                                <div className="flex items-center p-3.5 hover:bg-gray-50 dark:bg-zinc-900 rounded-2xl group cursor-pointer transition-all border border-transparent hover:border-gray-100">
                                                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mr-4 shadow-sm group-hover:scale-110 transition-transform">
                                                        <Briefcase className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Category</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                            <span className="text-xs text-gray-400 font-medium uppercase tracking-tighter">
                                                                Services
                                                            </span>
                                                        </div>
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">
                                                            {highlightText(category.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), query)}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            /services/{category.category}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-900 dark:bg-black p-2 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 transition-all">
                                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}

                                    {/* 2. SERVICES */}
                                    {(activeTab === 'All' || activeTab === 'Services') && searchResults.services.map((service) => {
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
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">
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

                                    {/* 3. PORTFOLIOS */}
                                    {(activeTab === 'All' || activeTab === 'Portfolios') && searchResults.portfolios.map((portfolio) => {
                                        // Assuming portfolio url structure
                                        const portfolioUrl = `/portfolio/${portfolio.slug}`;
                                        return (
                                            <a
                                                key={portfolio._id}
                                                href={portfolioUrl}
                                                onClick={() => handleResultClick(portfolioUrl)}
                                                className="block no-underline text-inherit hover:no-underline"
                                            >
                                                <div className="flex items-center p-3.5 hover:bg-gray-50 dark:bg-zinc-900 rounded-2xl group cursor-pointer transition-all border border-transparent hover:border-gray-100">
                                                    <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mr-4 shadow-sm group-hover:scale-110 transition-transform">
                                                        <Briefcase className="w-5 h-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-0.5">
                                                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Portfolio</span>
                                                        </div>
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">
                                                            {highlightText(portfolio.title || portfolio.name, query)}
                                                        </p>
                                                        <p className="text-xs text-gray-400 mt-1">
                                                            /portfolio/{portfolio.slug}
                                                        </p>
                                                    </div>
                                                    <div className="bg-white dark:bg-zinc-900 dark:bg-black p-2 rounded-lg opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 transition-all">
                                                        <ChevronRight className="w-4 h-4 text-blue-500" />
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}

                                    {/* 4. BLOGS */}
                                    {(activeTab === 'All' || activeTab === 'Blogs') && searchResults.blogs.map((blog) => {
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
                                                        <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">
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
                                    {(() => {
                                        const visible =
                                            activeTab === 'All'
                                                ? searchResults.services.length +
                                                  searchResults.categories.length +
                                                  searchResults.blogs.length +
                                                  searchResults.portfolios.length
                                                : activeTab === 'Services'
                                                  ? searchResults.services.length
                                                  : activeTab === 'Categories'
                                                    ? searchResults.categories.length
                                                    : activeTab === 'Portfolios'
                                                      ? searchResults.portfolios.length
                                                      : searchResults.blogs.length;
                                        if (visible > 0) return null;
                                        return (
                                            <div className="py-20 text-center">
                                                <div className="text-4xl mb-4" aria-hidden="true">🔍</div>
                                                <p className="text-gray-900 dark:text-gray-100 font-bold">
                                                    No results found for &quot;{query}&quot;
                                                </p>
                                                <p className="text-gray-400 text-sm mt-1">
                                                    Try different keywords or check your spelling.
                                                </p>
                                            </div>
                                        );
                                    })()}
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
