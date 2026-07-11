'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonTable = () => {
    const comparisonData = [
        {
            feature: "Design Quality",
            others: "Standard/Template based",
            brandbase: "Premium & Custom Built",
            brandbaseBetter: true
        },
        {
            feature: "Fabrication Finish",
            others: "Variable/Unreliable",
            brandbase: "High-precision Craftsmen",
            brandbaseBetter: true
        },
        {
            feature: "Project Management",
            others: "Fragmented/Stressful",
            brandbase: "End-to-End Managed",
            brandbaseBetter: true
        },
        {
            feature: "On-site Support",
            others: "Limited/On-call",
            brandbase: "Dedicated 24/7 Support",
            brandbaseBetter: true
        },
        {
            feature: "Technology Integration",
            others: "Basic/Rare",
            brandbase: "Advanced AV & Interactive",
            brandbaseBetter: true
        }
    ];

    return (
        <section className="py-12 px-4 md:px-8">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800">
                <div className="p-8 border-b border-gray-100 dark:border-zinc-800">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">The Brandbase Advantage</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Why leading brands choose us for their exhibitions.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-zinc-800/50">
                                <th className="py-4 px-6 font-bold text-gray-900 dark:text-white">Aspect</th>
                                <th className="py-4 px-6 font-bold text-gray-500 dark:text-gray-400">Others Stall Company</th>
                                <th className="py-4 px-6 font-bold text-[#FF6600]">BrandBase Capsule</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                            {comparisonData.map((row, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                                    <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <X size={16} className="text-red-500 shrink-0" />
                                            {row.others}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-gray-900 dark:text-white font-semibold">
                                        <div className="flex items-center gap-2">
                                            <Check size={18} className="text-[#FF6600] shrink-0" />
                                            {row.brandbase}
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default ComparisonTable;
