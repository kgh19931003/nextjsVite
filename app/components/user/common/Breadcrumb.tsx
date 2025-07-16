'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { breadcrumbMap } from '@/lib/types/breadcrumbMap';

export default function Breadcrumb() {
    const pathname = usePathname(); // 예: /ko/user/history
    if (!pathname) return null;

    const segments = pathname.split('/').filter(Boolean); // ['ko', 'user', 'history']
    if (segments.length < 2) return null; // 최소 ['ko', 'user']

    const locale = segments[0];
    const crumbs = segments.slice(1).map((segment, index, arr) => {
        const href = '/' + [locale, ...segments.slice(1, index + 2)].join('/');
        const label = breadcrumbMap[segment] || segment;
        const isFirst = index === 0;
        const isLast = index === arr.length - 1;


        return (
            <span key={href}>
                <Link href={href} className="hover:underline text-white/90">
                    {label}
                </Link>
                {!isLast && <span className="mx-1 text-white/50">&gt;</span>}
            </span>
        );
    });

    return (
        <div className="text-sm">
            {crumbs}
        </div>
    );
}
