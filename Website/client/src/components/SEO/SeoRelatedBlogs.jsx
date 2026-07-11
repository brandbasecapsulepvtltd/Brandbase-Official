'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, User, AlignLeft, Sparkles } from 'lucide-react';
import { api } from '@/lib/api';

const BlogCard = ({ title, slug, category, coverImage, createdAt, author }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -10 }}
        className="group relative bg-white dark:bg-white/[0.02] rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col h-full"
    >
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

        <Link href={`/blogs/${category}/${slug}`} className="block relative aspect-[16/10] overflow-hidden">
            <img
                src={coverImage || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"}
                alt={title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 z-20">
                <span className="px-4 py-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md text-orange-600 dark:text-orange-400 text-xs font-bold rounded-full uppercase tracking-wider border border-white/20 shadow-lg">
                    {category}
                </span>
            </div>
        </Link>

        <div className="p-8 flex flex-col flex-grow relative z-20 bg-white dark:bg-zinc-950/50 backdrop-blur-sm dark:backdrop-blur-none transition-colors duration-300">
            <div className="flex items-center text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-4 space-x-4">
                <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
                    {new Date(createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                    <User className="w-3.5 h-3.5 mr-1.5 text-orange-500" />
                    {author?.name || "Brandbase"}
                </div>
            </div>

            <Link href={`/blogs/${category}/${slug}`} className="block mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
                    {title}
                </h3>
            </Link>

            <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    Read Article
                </span>
                <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-white/5 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                    <ArrowUpRight className="w-5 h-5" />
                </div>
            </div>
        </div>
    </motion.div>
);

const SeoRelatedBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackBlogs = [
        {
            _id: '1',
            title: "Exhibition Stall Design Trends Mumbai 2026",
            slug: "exhibition-stall-design-trends-mumbai-2026",
            category: "exhibition",
            coverImage: "https://ik.imagekit.io/vinayak06/stalls/BlogsImages/Brandbase%20capsule%20stall%20(1).jpg",
            createdAt: "2026-01-15T12:00:00Z",
            author: { name: "Brandbase Team" }
        },
        // ... (other fallbacks can be kept or removed to keep it clean, let's keep it simple)
        {
            _id: '2',
            title: "How to Choose the Best Stall Design Company in Mumbai",
            slug: "how-to-choose-the-best-stall-design-company-in-mumbai",
            category: "exhibition",
            coverImage: "https://ik.imagekit.io/vinayak06/stalls/BlogsImages/lights%20(1).jpg",
            createdAt: "2026-01-10T12:00:00Z",
            author: { name: "Brandbase Team" }
        },
        {
            _id: '3',
            title: "Why Mumbai Brands Choose Brandbase Capsule for Custom Stall Design",
            slug: "why-mumbai-brands-choose-brandbase-capsule-for-custom-stall-design",
            category: "exhibition",
            coverImage: "https://ik.imagekit.io/vinayak06/stalls/BlogsImages/why_mumbai_choose_brandbase_capsule.jpg",
            createdAt: "2026-01-05T12:00:00Z",
            author: { name: "Brandbase Team" }
        }
    ];

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                // Fetch blogs with category 'exhibition'
                // Assuming api.getBlogsByCategory works, else we fallback
                const res = await api.getBlogsByCategory('exhibition');
                if (res && res.success && res.data && res.data.length > 0) {
                    // Normalize API data structure (nested metadata) to match component props
                    const normalizedBlogs = res.data.slice(0, 3).map(blog => ({
                        _id: blog._id,
                        title: blog.metadata?.title || "Untitled Blog",
                        slug: blog.metadata?.slug,
                        category: blog.metadata?.category || "exhibition",
                        coverImage: blog.metadata?.featuredImage, // API uses featuredImage
                        createdAt: blog.metadata?.publishDate || new Date().toISOString(), // API uses publishDate
                        author: blog.metadata?.author // API author object
                    }));
                    setBlogs(normalizedBlogs);
                } else {
                    setBlogs(fallbackBlogs);
                }
            } catch (error) {
                console.error("Failed to fetch related blogs, using fallback", error);
                setBlogs(fallbackBlogs);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Render skeleton or content
    // For SEO purposes, strict SSR is better, but this component is client-side.
    // We already have "best-stall-design-company-in-mumbai" page content server-side.
    // This adds extra value.

    return (
        <section className="py-32 relative overflow-hidden bg-white dark:bg-black">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="flex items-center gap-2 text-orange-500 font-bold tracking-widest uppercase text-sm mb-4">
                            <Sparkles className="w-4 h-4" />
                            <span>Industry Intelligence</span>
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
                            Latest Insights from <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">The Exhibition World</span>
                        </h2>
                    </div>

                    <Link
                        href="/blogs/category/exhibition"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-semibold hover:bg-zinc-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                    >
                        <span>View All Articles</span>
                        <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} {...blog} />
                    ))}
                    {loading && fallbackBlogs.map((blog) => (
                        <BlogCard key={blog._id} {...blog} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default SeoRelatedBlogs;
