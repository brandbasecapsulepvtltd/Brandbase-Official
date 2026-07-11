import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ServiceCard = ({ number, title, description, icon, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="relative p-8 rounded-3xl overflow-hidden group bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 shadow-xl hover:shadow-2xl dark:shadow-none transition-all duration-300"
    >
        {/* Abstract background blobs for visual interest */}
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-100 dark:bg-orange-900/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-blue-50 dark:bg-blue-900/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-zinc-800 flex items-center justify-center text-orange-600 dark:text-orange-500 group-hover:scale-110 transition-transform duration-300">
                    {/* Clone icon to adjust size if needed */}
                    {React.cloneElement(icon, { size: 28 })}
                </div>
                <span className="text-4xl font-bold text-gray-100 dark:text-zinc-800 group-hover:text-orange-100 dark:group-hover:text-orange-900/20 transition-colors">
                    {number}
                </span>
            </div>

            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
                {title}
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="flex items-center text-sm font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors mt-auto cursor-pointer">
                <span>Explore Service</span>
                <ArrowUpRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
        </div>
    </motion.div>
);

const SeoServices = ({ title, subtitle, services }) => {
    return (
        <section className="py-32 bg-gray-50 dark:bg-zinc-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-orange-600 dark:text-orange-500 font-bold tracking-wider uppercase text-sm mb-4 block"
                        >
                            Our Expertise
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold heading-font text-gray-900 dark:text-white leading-tight"
                        >
                            {title}
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-md md:text-right"
                    >
                        {subtitle}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            index={index}
                            number={`0${index + 1}`}
                            {...service}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SeoServices;
