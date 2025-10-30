'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Bgimg from '@/components/user/common/Bgimg';
import Bgimg2 from '@/components/user/common/Bgimg2';
import { swrFetcher } from '@/lib/function';

import { useSafeTranslations } from "@/lib/intl/useSafeTranslations";

interface blogForm {
    idx: number;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    category: string;
    regDate: string;
}


interface performanceForm {
    idx: number;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    category: string;
    regDate: string;
    firstSrc: string;
}

export default function Introduction() {
    const t = useSafeTranslations("main");
    const router = useRouter();
    const pathname = usePathname();
    // 현재 언어(locale) 추출
    const currentLocale = useMemo(() => pathname?.split('/')[1], [pathname]);

    const [typedText, setTypedText] = useState('');
    const fullText = useMemo(() => {
        if (currentLocale === 'ko') {
            return 'Nextjs + kotlin BootSpring 프로젝트';
        } else if (currentLocale === 'en') {
            return "Nextjs + kotlin BootSpring 프로젝트";
        } else {
            return 'Nextjs + kotlin BootSpring 프로젝트';
        }
    }, [currentLocale]);

    const [blogs, setBlogs] = useState<blogForm[]>([]);
    const [performances, setPerformances] = useState<performanceForm[]>([]);


    // 타이핑 효과
    useEffect(() => {
        let index = 0;

        const timer = setInterval(() => {
            const nextChar = fullText.charAt(index);
            if (index >= fullText.length) {
                clearInterval(timer);
                return;
            }
            setTypedText((prev) => prev + nextChar);
            index++;
        }, 50);

        return () => clearInterval(timer);
    }, []);

    // 블로그 데이터 불러오기
    useEffect(() => {
        if (!currentLocale) return;
        async function fetchData() {
            try {
                const blog_res = await swrFetcher(`/${currentLocale}/api/blog/list?size=300&language=${currentLocale}`);
                const performance_res = await swrFetcher(`/${currentLocale}/api/performance/list?size=300&language=${currentLocale}`);
                setBlogs(blog_res.contents);
                setPerformances(performance_res.contents);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [currentLocale]);


    return (
        <main className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100">

            {/* 1. 히어로 배너 */}
            {/*}
            <section className="relative w-full h-[800px] text-white overflow-hidden">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    src="/main/Portfolio_pr.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />

                <div className="absolute inset-0 bg-black/40"/>

                <div className="absolute top-[30%] left-[10%] z-10">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold mb-6"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1.5}}
                    >
                        {t('Portfolio')}
                    </motion.h1>
                    <p className="text-lg md:text-xl font-light whitespace-pre-wrap leading-relaxed max-w-3xl">
                        {typedText}
                    </p>
                </div>
            </section>
            */}

            <section
                className="relative w-full h-[800px] text-white"
                style={{
                    backgroundImage: "url('/main/banner/main_banner.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute top-[30%] left-[20%]">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold mb-6"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1.5}}
                    >
                        {t('Portfolio')}
                    </motion.h1>
                    <p className="text-lg md:text-xl font-light whitespace-pre-wrap leading-relaxed max-w-3xl">
                        {typedText}
                    </p>
                </div>
            </section>

            {/* 2. product 섹션 */}
            <section className="w-full py-35">

            </section>

            {/* 3. Reference 섹션 */}
            <section className="w-full py-18">

            </section>


        </main>
    );
}
