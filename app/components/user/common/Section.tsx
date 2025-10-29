'use client';

import React from 'react';

interface SectionProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ title, subtitle, children, className = '' }: SectionProps) {
    return (
        <section className={`py-20 px-6 md:px-10 ${className}`}>
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 text-balance">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-4 text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto text-balance">
                        {subtitle}
                    </p>
                )}
                <div className="mt-12">{children}</div>
            </div>
        </section>
    );
}
