'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideGem, LucideRecycle, LucideFlaskConical } from 'lucide-react';

const icons = [LucideRecycle, LucideGem, LucideFlaskConical];

interface FeatureItem {
    title: string;
    desc: string;
}

interface FeatureGridProps {
    items: FeatureItem[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
    return (
        <div className="grid gap-8 md:grid-cols-3">
            {items.map((item, index) => {
                const Icon = icons[index % icons.length];

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 flex flex-col items-start"
                    >
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mb-4">
                            <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </motion.div>
                );
            })}
        </div>
    );
}
