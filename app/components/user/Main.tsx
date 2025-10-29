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
            return '세계 최고 친환경 혁신 기술 기업\nThe Most Innovative Green Tech. & Engineering Company in the World';
        } else if (currentLocale === 'en') {
            return "The world's leading eco-friendly innovation technology company\nThe Most Innovative Green Tech. & Engineering Company in the World";
        } else {
            return '세계 최고 친환경 혁신 기술 기업\nThe Most Innovative Green Tech. & Engineering Company in the World';
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
                    src="/main/godtech_pr.mp4"
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
                        {t('주식회사 갓테크')}
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
                    backgroundImage: "url('/main/banner/main_banner_2.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute top-[30%] left-[10%]">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold mb-6"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1.5}}
                    >
                        {t('주식회사 갓테크')}
                    </motion.h1>
                    <p className="text-lg md:text-xl font-light whitespace-pre-wrap leading-relaxed max-w-3xl">
                        {typedText}
                    </p>
                </div>
            </section>

            {/* 2. product 섹션 */}
            <section className="w-full py-35">
                <div className="flex flex-wrap w-full justify-center text-sm font-bold text-green-500">Main Product
                </div>
                <div
                    className="flex flex-wrap w-full justify-center text-3xl font-bold text-black my-2">{t('오직 갓테크에서 제공하는')} Special
                    Metal Powder
                </div>
                <div
                    className="flex flex-wrap w-full justify-center text-sm text-gray-500">{t('세계적 고성능 합금 소재 분말을 갓테크를 통해서 만나보세요')}</div>
                <div className="flex flex-wrap w-full gap-8 justify-center items-center py-10">
                    <Bgimg title={t('GT 939')} description="VIGA, PREP | 40% Revert, 100% Virgin" url="/"
                           backgroundUrl="/main/alloy939.png" delay={0.1}/>
                    <Bgimg title={t('GT 230')} description="VIGA, PREP | 40% Revert, 100% Virgin" url="/"
                           backgroundUrl="/main/alloy230.png" delay={0.2}/>
                </div>
            </section>

            {/* 3. Reference 섹션 */}
            <section className="w-full py-18">
                <div className="flex flex-wrap w-full justify-center text-sm font-bold text-green-500">Reference</div>
                <div
                    className="flex flex-wrap w-full justify-center text-3xl font-bold text-black my-2">{t('진행중인 과정')}</div>
                <div
                    className="flex flex-wrap w-full justify-center text-sm text-gray-500">{t('고객 니즈가 반영된 성공적인 사례들을 소개합니다.')}</div>
                <div className="flex flex-wrap w-full gap-8 justify-center items-center py-20">
                    {performances && performances.length > 0 && (
                        performances.map((data) => (
                            <Bgimg2 key={data.firstSrc} category={data.category} title={data.title}
                                    description={data.subtitle} url="/powder/NiAlloy" backgroundUrl={data.firstSrc}/>
                        ))
                    )}

                    {/*
                    <Bgimg2 category="Material" title={t('Alloy 939 & 230')} description="VIGA 공법으로 제작되어, 제작 후 남는 폐잔재를 추가 잉곳 제작 시 지속적으로 재사용하여 최대 40% Revert 분말 제작을 목표" url="/powder/NiAlloy" backgroundUrl="/main/powder.png"/>
                    <Bgimg2 category="Repair" title={t('DED 3D 프린팅 보수')} description="기존 용접 또는 기타 방식으로 보수가 불가능하여 폐기되는 첨단 소재 부품을 DED 3D 프린팅을 통해 균일하고 정밀하게 보수 진행" url="/business/Repair" backgroundUrl="/main/repair.png"/>
                    <Bgimg2 category="Manufacturing" title={t('L-PBF 3D 프린팅 적층')} description="기존의 주조/단조 방식으로는 구현하기 어려운 복잡한 형상의 첨단 소재 부붐을 L-PBF 3D 프린팅을 통해 적층" url="/business/Manufacturing" backgroundUrl="/main/main2.png"/>
                    */}
                </div>
            </section>

            {/* 4. 뉴스/블로그 Marquee */}
            <section className="w-full py-16">
                {blogs && blogs.length > 0 && (
                    <Marquee direction="right" speed={30} gradient={false} className="w-full h-96">
                        {blogs.map((post) => (
                            <div
                                key={post.idx}
                                onClick={() => router.push(`/${currentLocale}/Blog/views/${post.idx}`)}
                                className="bg-white w-[270px] min-h-[316px] mx-5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col"
                            >
                                {/* 이미지 */}
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={post.thumbnail}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"/>
                                </div>

                                {/* 내용 */}
                                <div className="px-5 py-3 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`text-sm font-medium px-3 py-1 rounded-full ${
                                                post.category === '갓테크소식' || post.category === 'Godtech Announce'
                                                    ? 'text-[#56BC6F] bg-green-50'
                                                    : post.category === '뉴스기사' || post.category === 'News'
                                                        ? 'text-blue-800 bg-blue-100'
                                                        : 'text-gray-600 bg-gray-100'
                                            }`}
                                        >
                                          {post.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{post.regDate}</span>
                                    </div>
                                    <h2 className="text-base font-bold text-gray-900 mb-3 group-hover:text-[#C6C6C6] transition-colors duration-200 line-clamp-2">
                                        {post.title}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </Marquee>
                )}

            </section>
        </main>
    );
}
