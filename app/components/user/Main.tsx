'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { swrFetcher } from '@/lib/function';
import { useSafeTranslations } from "@/lib/intl/useSafeTranslations";
import {PortfolioItemComponent} from "@/components/user/portfolio/careerBlock";


export default function Introduction() {
    const t = useSafeTranslations("main");
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useMemo(() => pathname?.split('/')[1], [pathname]);

    const [typedText, setTypedText] = useState('');
    const fullText = useMemo(() => {
        if (currentLocale === 'ko') {
            return '해당 페이지는 Cafe24 가상 호스팅 (Rocky Os), Docker Compose 와 Nextjs + kotlin BootSpring 구성으로 제작 되었습니다.';
        } else if (currentLocale === 'en') {
            return 'This page was created using Cafe24 virtual hosting (Rocky OS), Docker Compose, and Nextjs + Kotlin BootSpring.';
        } else {
            return '해당 페이지는 Cafe24 가상 호스팅 (Rocky Os), Docker Compose 와 Nextjs + kotlin BootSpring 구성으로 제작 되었습니다.';
        }
    }, [currentLocale]);

    const privacyData = [
        { id: 1, name: 'Name', value: '김근호', icon: '👤' },
        { id: 2, name: 'Birth', value: '1993. 10. 03', icon: '🎂' },
        { id: 3, name: 'Address', value: '부산시 북구 화명 양달로 80-11 102동 1401호', icon: '📍' },
        { id: 4, name: 'E-mail', value: 'sasaa3865@naver.com', icon: '📧' },
        { id: 5, name: 'Phone', value: '010 - 7615 - 3865', icon: '📱' },
    ];

    const stackData = [
        { id: 1, name: 'Backend', value: ['php.png', 'kotlin.png'], size: ['100', '85'], text: ['', ''] },
        { id: 2, name: '자격증', value: ['certifi.png'], size: ['100'], text: ['정보처리기사'] },
        { id: 3, name: 'Version Control', value: ['github.png', 'jenkins.png'], size: ['120', '140'], text: ['', ''] },
        { id: 4, name: 'IDE Tool', value: ['phpstorm.png', 'intellij.png'], size: ['80', '100'], text: ['', ''] },
        { id: 5, name: 'Platform', value: ['docker.png'], size: ['100'], text: [''] },
        { id: 6, name: 'Framework', value: ['ci4.png', 'boot_spring.png'], size: ['80', '150'], text: ['', ''] },
        { id: 7, name: 'Amazon Cloud', value: ['aws/ec2.png', 'aws/ecr.png', 'aws/ecs.png', 'aws/iam.png', 'aws/load_balancer.png', 'aws/rds.png', 'aws/s3.png'], size: ['90', '90', '90', '60', '120', '75', '75'], text: ['', '', '', '', '', '', ''] },
    ];


    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

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
    }, [fullText]);

    return (
        <main className="bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800 text-gray-900 dark:text-gray-100">
            {/* 히어로 배너 */}
            <section
                className="relative w-full h-screen text-white overflow-hidden"
                style={{
                    backgroundImage: "url('/main/banner/main_banner.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                <div className="absolute inset-0 flex items-center justify-center md:justify-start md:left-[10%]">
                    <div className="text-center md:text-left px-6">
                        <motion.h1
                            className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {t('Portfolio')}
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl text-gray-200"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            {typedText}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* 개인정보 섹션 */}
            <section className="w-full py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-neutral-700">
                        <div className="grid gap-6">
                            {privacyData.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-neutral-700/50 transition-all duration-300 group"
                                >
                                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                                    <div className="flex-1 flex items-center">
                                        <div className="font-bold text-lg w-32 text-gray-700 dark:text-gray-300">{t(item.name)}</div>
                                        <div className="flex-1 text-gray-600 dark:text-gray-400">{t(item.value)}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 스택 섹션 */}
            <section className="w-full py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Skills & Tools
                    </h2>
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-neutral-700">
                        <div className="grid gap-6">
                            {stackData.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-transparent dark:from-neutral-700/50 dark:to-transparent hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="font-bold text-lg min-w-[140px] text-gray-700 dark:text-gray-300">{t(item.name)}</div>
                                    <div className="flex-1 flex flex-wrap items-center gap-6">
                                        {item.value.map((img, i) => (
                                            <div key={i} className="bg-white dark:bg-neutral-600 p-3 rounded-xl shadow-md hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src={`/content/${img}`}
                                                    alt={img}
                                                    style={{ width: `${item.size[i]}px`, height: 'auto' }}
                                                    className="object-contain"
                                                />
                                                <div className='text-center pt-2'>
                                                    {item.text[i]}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* 포트폴리오 리스트 */}
            <section className="w-full py-20 px-4 bg-gradient-to-b from-gray-100 to-white dark:from-neutral-800 dark:to-neutral-900">
                <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Portfolio
                </h2>
                <PortfolioItemComponent
                    settings={settings}
                    t={t}
                />
            </section>
        </main>
    );
}