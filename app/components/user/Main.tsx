'use client';

import React, { useMemo, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import Slider from 'react-slick';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
    const currentLocale = useMemo(() => pathname?.split('/')[1], [pathname]);

    const [typedText, setTypedText] = useState('');
    const fullText = useMemo(() => {
        if (currentLocale === 'ko') {
            return '해당 페이지는 Nextjs + kotlin BootSpring 구성으로 제작 되었습니다.';
        } else if (currentLocale === 'en') {
            return '해당 페이지는 Nextjs + kotlin BootSpring 구성으로 제작 되었습니다.';
        } else {
            return '해당 페이지는 Nextjs + kotlin BootSpring 구성으로 제작 되었습니다.';
        }
    }, [currentLocale]);

    const [blogs, setBlogs] = useState<blogForm[]>([]);
    const [performances, setPerformances] = useState<performanceForm[]>([]);

    const privacyData = [
        { id: 1, name: 'Name', value: '김근호', icon: '👤' },
        { id: 2, name: 'Birth', value: '1993. 10. 03', icon: '🎂' },
        { id: 3, name: 'Addr', value: '부산시 북구 화명 양달로 80-11 102동 1401호', icon: '📍' },
        { id: 4, name: 'E-mail', value: 'sasaa3865@naver.com', icon: '📧' },
        { id: 5, name: 'Phone', value: '010 - 7615 - 3865', icon: '📱' },
    ];

    const stackData = [
        { id: 1, name: 'Backend', value: ['php.png'], size: ['100'] },
        { id: 2, name: '자격증', value: ['certifi.png'], size: ['80'] },
        { id: 3, name: 'Version Control', value: ['github.png', 'jenkins.png'], size: ['100', '120'] },
        { id: 4, name: 'IDE Tool', value: ['phpstorm.png'], size: ['80'] },
        { id: 5, name: 'Platform', value: ['docker.png'], size: ['100'] },
        { id: 6, name: 'Framework', value: ['ci4.png'], size: ['80'] },
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
                                        <div className="font-bold text-lg w-32 text-gray-700 dark:text-gray-300">{item.name}</div>
                                        <div className="flex-1 text-gray-600 dark:text-gray-400">{item.value}</div>
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
                                    <div className="font-bold text-lg min-w-[140px] text-gray-700 dark:text-gray-300">{item.name}</div>
                                    <div className="flex-1 flex items-center gap-6">
                                        {item.value.map((img, i) => (
                                            <div key={i} className="bg-white dark:bg-neutral-600 p-3 rounded-xl shadow-md hover:scale-110 transition-transform duration-300">
                                                <img
                                                    src={`/content/${img}`}
                                                    alt={img}
                                                    style={{ width: `${item.size[i]}px`, height: 'auto' }}
                                                    className="object-contain"
                                                />
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
                    Portfolio List
                </h2>

                {/* 매치업 랜딩페이지 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/matchup/1.png" alt="매치업 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/matchup/2.png" alt="매치업 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/matchup/3.png" alt="매치업 3" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">Web Platform</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">매치업 랜딩페이지</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-500 font-bold min-w-[80px]">URL</span>
                                        <a href="https://www.match-up.co.kr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline transition-colors">match-up.co.kr</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-500 font-bold min-w-[80px]">작업범위</span>
                                        <span>PHP 백엔드, 프론트엔드(jQuery), 관리자 이미지 업로드</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-500 font-bold min-w-[80px]">개발환경</span>
                                        <span>cafe24 Server, PHP 7.4</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-blue-500 font-bold min-w-[80px]">설명</span>
                                        <span>매치업 플랫폼을 홍보하는 랜딩 페이지를 작업했습니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 가자 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                                <div className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-semibold mb-4 w-fit">Mobile App</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">가자</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-500 font-bold min-w-[100px]">스토어</span>
                                        <span className="text-gray-500">현재 게시 취소됨</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>PHP 백엔드, 프론트엔드(jQuery), 하이브리드앱 개발 및 배포(AOS, iOS)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-500 font-bold min-w-[100px]">개발환경</span>
                                        <span>cafe24 Server, PHP 7.4</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-purple-500 font-bold min-w-[100px]">설명</span>
                                        <span>플랫폼에 등록된 상점 방문 시 쿠폰과 스탬프를 지급하여 사용할 수 있게 해주는 앱입니다.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4 order-1 lg:order-2">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/go/1.png" alt="가자 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/go/2.png" alt="가자 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/go/3.png" alt="가자 3" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 칸타수학 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/kanta/1.png" alt="칸타수학 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/kanta/2.png" alt="칸타수학 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/kanta/3.png" alt="칸타수학 3" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/kanta/4.png" alt="칸타수학 4" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/kanta/5.png" alt="칸타수학 5" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-semibold mb-4">Education Platform</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">칸타수학</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold min-w-[100px]">URL</span>
                                        <a href="https://softer084.cafe24.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700 hover:underline transition-colors">softer084.cafe24.com</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>PHP 백엔드, 프론트엔드(jQuery), 하이브리드앱 개발 및 배포(AOS)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold min-w-[100px]">개발환경</span>
                                        <span>AWS S3, cafe24 Server, PHP 7.4</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-green-500 font-bold min-w-[100px]">설명</span>
                                        <span>강의영상과 시험문제를 온라인으로 학생들에게 제공하여 학습 효율을 높이는 교육 플랫폼입니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 주차실태조사 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                                <div className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold mb-4 w-fit">Survey App</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">주차실태조사</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold min-w-[100px]">스토어</span>
                                        <div className="flex flex-col gap-2">
                                            <a href="https://play.google.com/store/apps/details?id=com.wizmade.parkingsys" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-700 hover:underline transition-colors">Google Play</a>
                                            <a href="https://apps.apple.com/us/app/%EC%A3%BC%EC%B0%A8%EC%8B%A4%ED%83%9C%EC%A1%B0%EC%82%AC/id1582133805" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-700 hover:underline transition-colors">App Store</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>PHP 백엔드, 프론트엔드(jQuery), 하이브리드앱 개발 및 배포(iOS, AOS)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold min-w-[100px]">개발환경</span>
                                        <span>AWS S3, AWS RDS, cafe24 Server, PHP 7.4</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-orange-500 font-bold min-w-[100px]">설명</span>
                                        <span>서울시 주차현황을 조사하는 플랫폼입니다.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4 order-1 lg:order-2">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/park/1.png" alt="주차실태조사 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/park/2.png" alt="주차실태조사 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/park/3.png" alt="주차실태조사 3" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/park/4.png" alt="주차실태조사 4" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/park/5.png" alt="주차실태조사 5" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 롯데케미칼 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/lotte/1.png" alt="롯데케미칼 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/lotte/2.png" alt="롯데케미칼 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/lotte/3.png" alt="롯데케미칼 3" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold mb-4">E-Commerce</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">롯데케미칼 Staron</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500 font-bold min-w-[100px]">URL</span>
                                        <a href="https://www.staron.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700 hover:underline transition-colors">staron.com</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500 font-bold min-w-[100px]">기술스택</span>
                                        <span>PHP 7.x, CodeIgniter 4.x, Linux, Nginx</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>유지보수 및 추가개발</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-red-500 font-bold min-w-[100px]">설명</span>
                                        <span>인테리어 소재를 판매하는 사이트입니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 영덕문화재단 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full p-8 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                                <div className="inline-block px-4 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full text-sm font-semibold mb-4 w-fit">Culture Foundation</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">영덕문화재단</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-teal-500 font-bold min-w-[100px]">URL</span>
                                        <a href="https://ydct.org" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-700 hover:underline transition-colors">ydct.org</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-teal-500 font-bold min-w-[100px]">기술스택</span>
                                        <span>PHP 7.x, CodeIgniter 4.x, Linux, Nginx</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-teal-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>유지보수 및 추가개발, 서버관리</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-teal-500 font-bold min-w-[100px]">설명</span>
                                        <span>영덕문화 관광재단에서 제공하는 사이트입니다.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4 order-1 lg:order-2">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/ydct/1.png" alt="영덕문화재단 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/ydct/2.png" alt="영덕문화재단 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/ydct/3.png" alt="영덕문화재단 3" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/ydct/4.png" alt="영덕문화재단 4" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 선인 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto mb-20"
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 hover:shadow-3xl transition-all duration-500">
                        <div className="grid lg:grid-cols-2 gap-0">
                            <div className="w-full bg-gray-100 dark:bg-neutral-900 p-4">
                                <div className="rounded-2xl overflow-hidden shadow-lg">
                                    <Slider {...settings}>
                                        <div><img src="/content/sunin/1.png" alt="선인 1" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/sunin/2.png" alt="선인 2" className="w-full h-[400px] object-cover" /></div>
                                        <div><img src="/content/sunin/3.png" alt="선인 3" className="w-full h-[400px] object-cover" /></div>
                                    </Slider>
                                </div>
                            </div>
                            <div className="p-8 lg:p-12 flex flex-col justify-center">
                                <div className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-semibold mb-4">Foundation</div>
                                <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">선인재단</h3>
                                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                                    <div className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold min-w-[100px]">URL</span>
                                        <a href="https://sib.kr" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700 hover:underline transition-colors">sib.kr</a>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold min-w-[100px]">기술스택</span>
                                        <span>PHP 7.x, CodeIgniter 4.x, Linux, Nginx</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold min-w-[100px]">작업범위</span>
                                        <span>유지보수 및 추가개발, 서버관리</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-indigo-500 font-bold min-w-[100px]">설명</span>
                                        <span>선인재단에서 관리하는 사이트입니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}