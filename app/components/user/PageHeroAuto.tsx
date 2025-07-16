'use client';

import { usePathname } from 'next/navigation';
import { pathTitleMap } from '@/lib/types/menuTitleMap';
import Breadcrumb from '@/components/user/common/Breadcrumb';
import RecycleIcon from '@/components/user/icon/RecycleIcon';

export default function PageHeroAuto({ backgroundImage }: { backgroundImage?: string }) {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const title = pathTitleMap[lastSegment] || '페이지';

    const bg = backgroundImage || '';

    return (
        <div
            className={`relative h-60 md:h-72 lg:h-60 mt-16 mb-15 flex items-center justify-center text-white bg-no-repeat bg-cover bg-center overflow-hidden`}
            style={bg ? { backgroundImage: `url(${bg})` } : {}}
        >

            {/* 어두운 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-b " />

            {/* 콘텐츠 */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-3xl md:text-4xl font-extrabold drop-shadow-md tracking-tight">
                    ♻ {title}
                </h1>
                <div className="mt-2 text-sm text-white/80">
                    <Breadcrumb />
                </div>
            </div>
        </div>
    );
}
