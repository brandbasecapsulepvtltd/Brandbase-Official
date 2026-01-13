'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Loader2, ArrowRight } from 'lucide-react';

const PortfolioList = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                // Fetch from the backend we just created
                const response = await fetch('https://api.brandbasecapsule.com/api/portfolios' + (filter !== 'all' ? `?category=${filter}` : ''), {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': '8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de' // Matches lib/api.js
                    }
                });
                const data = await res.json();
                setPortfolios(data.data || []);
            } catch (err) {
                console.error("Failed to fetch portfolios", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolios();
    }, [filter]);

    const categories = [
        { id: 'all', label: 'All Projects' },
        { id: 'web-development', label: 'Web Developemnt' },
        { id: 'app-development', label: 'App Development' },
        { id: 'branding', label: 'Branding' },
        { id: 'digital-marketing', label: 'Marketing' }
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 bg-white dark:bg-black">
                <Loader2 className="w-10 h-10 animate-spin text-[#FF6600]" />
            </div>
        );
    }

    return (
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-black w-full">
            <div className="max-w-7xl mx-auto">
                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border-2 ${filter === cat.id
                                ? 'bg-[#FF6600] text-white border-[#FF6600]'
                                : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-800 hover:border-[#FF6600] hover:text-[#FF6600]'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {portfolios.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No projects found.</div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode='popLayout'>
                            {portfolios.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={item._id}
                                    className="group relative bg-gray-50 dark:bg-zinc-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-zinc-800"
                                >
                                    {/* Image - Use hero.images[0] */}
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.hero.images[0] || item.hero.images}
                                            alt={item.hero.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <Link href={`/portfolio/${item.slug}`} className="bg-[#FF6600] text-white px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                                View Case Study
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="text-xs font-bold text-[#FF6600] uppercase tracking-wider mb-2">
                                            {item.category?.replace('-', ' ') || 'Portfolio'}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF6600] transition-colors">
                                            {item.hero.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                            {item.hero.description}
                                        </p>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-zinc-800">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                                {item.bento?.mainHeading || 'Explore Project'}
                                            </span>
                                            <Link href={`/portfolio/${item.slug}`} className="text-[#FF6600] hover:translate-x-1 transition-transform">
                                                <ArrowRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default PortfolioList;
