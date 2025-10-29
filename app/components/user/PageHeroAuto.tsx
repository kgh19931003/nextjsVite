'use client';

import { usePathname } from 'next/navigation';
import { pathTitleMap } from '@/lib/types/menuTitleMap';
import Breadcrumb from '@/components/user/common/Breadcrumb';
import React from 'react';
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";

export default function PageHeroAuto({ backgroundImage }: { backgroundImage?: string }) {
    const t = useSafeTranslations("menuTitle");
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    let key = '';

    if (segments.length >= 3) {
        const last = segments[segments.length - 1];
        const secondLast = segments[segments.length - 2];
        const thirdLast = segments[segments.length - 3];

        if (/^\d+$/.test(last)) {
            // 숫자인 경우, 앞의 두 세그먼트를 조합하여 key 생성
            key = `${thirdLast}${secondLast}`.toLowerCase(); // 예: "blog/view"
        } else {
            key = secondLast ? `${secondLast}${last}`.toLowerCase() : last.toLowerCase(); // 숫자가 아닌 경우에도 view 조합 가능
        }
    }
    else{
        key = segments[segments.length - 1];

    }

    //console.log("key : "+segments[segments.length - 2])

    const title = t(pathTitleMap[key]) || t('페이지');
    const bg = backgroundImage || '';

    const lowerSegments = segments.map(s => s.toLowerCase());

    const isBlog = lowerSegments.includes("blog");
    const isNiAlloy = lowerSegments.includes("nialloy");

    console.log(segments[segments.length - 1])

    return (
        <>

            <div
                className="relative w-full h-84 md:h-84 lg:h-96 mb-15 flex items-center justify-center text-white bg-no-repeat bg-cover bg-center overflow-hidden"
                style={bg ? {backgroundImage: `url(${bg})`} : {}}
            >
                {/* 어두운 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-b"/>

                {/* 콘텐츠 */}
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-3xl mb-4 md:text-4xl font-extrabold drop-shadow-md tracking-tight">
                        {/*title*/}
                        { /*isBlog  && <span>소식지</span>*/}
                    </h1>
                    <div className="mt-2 text-sm text-white/80">
                        {/*<Breadcrumb />*/}
                    </div>
                </div>
            </div>

            {/* 대제목 */}

            { !isBlog && !isNiAlloy &&
            <div
                className="max-w-6xl  mx-auto pb-4 pl-5 mb-0 text-3xl font-semibold mx-auto  text-gray-800 sm:hidden lg:block " >
                <span className="pl-3">{title}</span>
                <div className="max-w-6xl h-[3px] bg-gray-500  mx-auto mt-3 rounded-full shadow-md"/>
            </div>
            }


        </>
    );
}
