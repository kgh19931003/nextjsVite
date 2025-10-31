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

    // 개인정보 데이터
    const privacyData = [
        { id: 1, name: 'Name', value: '김근호' },
        { id: 2, name: 'Birth', value: '1993. 10. 03' },
        { id: 3, name: 'Addr', value: '부산시 북구 화명 양달로 80-11 102동 1401호' },
        { id: 4, name: 'E-mail', value: 'sasaa3865@naver.com' },
        { id: 5, name: 'Phone', value: '010 - 7615 - 3865' },
    ];

    // 스택 데이터
    const stackData = [
        { id: 1, name: 'Backend', value: ['php.png'], size: ['150'] },
        { id: 2, name: '자격증', value: ['certifi.png'], size: ['130'] },
        { id: 3, name: 'Version Control', value: ['github.png', 'jenkins.png'], size: ['170', '250'] },
        { id: 4, name: 'IDE Tool', value: ['phpstorm.png'], size: ['120'] },
        { id: 5, name: 'Flatform', value: ['docker.png'], size: ['170'] },
        { id: 6, name: 'Framework', value: ['ci4.png'], size: ['110'] },
    ];

    // Slider 설정
    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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
    }, [fullText]);

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
            {/* 히어로 배너 */}
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                    >
                        {t('Portfolio')}
                    </motion.h1>
                    <p className="text-lg md:text-xl font-light whitespace-pre-wrap leading-relaxed max-w-3xl">
                        {typedText}
                    </p>
                </div>
            </section>

            {/* 개인정보 섹션 */}
            <section className="w-full py-10 px-4">
                <div className="py-10 bg-white dark:bg-neutral-800 shadow-2xl rounded-xl max-w-4xl mx-auto">
                    <div className="text-center text-2xl font-bold mb-6">Personal Information</div>
                    <div className="px-6 space-y-4">
                        {privacyData.map((item) => (
                            <div key={item.id} className="flex border-b pb-3">
                                <div className="font-semibold w-32">{item.name}</div>
                                <div className="flex-1">{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 소개 섹션 */}
            <section className="w-full py-10 px-4">
                <div className="py-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl max-w-4xl mx-auto shadow-md">
                    <div className="px-6 text-center space-y-2">
                        <p>저는 PHP 개발자로 5년간 다양한 프로젝트를 수행하며 웹 개발의 기본기를 다져온 개발자 김근호 입니다.</p>
                        <p>PHP로 경력을 시작한 이후, 중소규모의 웹 서비스의 다양한 프로젝트를 경험하였으며</p>
                        <p>특히, 백엔드 아키텍처 설계, RESTful API</p>
                        <p>개발, 데이터베이스 설계 및 최적화에 강점을 가지며, 사용자 중심의 안정적인 서비스를 개발하는 데 주력해 왔습니다.</p>
                        <br />
                        <p>또한, 팀 내에서는 코드 리뷰와 협업</p>
                        <p>도구를 활용해 효율적인 협업 문화를 조성하는 데 기여했습니다.</p>
                    </div>
                </div>
            </section>

            {/* 스택 섹션 */}
            <section className="w-full py-10 px-4">
                <div className="py-10 mb-10 bg-white dark:bg-neutral-800 shadow-2xl rounded-xl max-w-4xl mx-auto">
                    <div className="text-center text-2xl font-bold mb-6">Skills & Tools</div>
                    <div className="px-6 space-y-4">
                        {stackData.map((item) => (
                            <div key={item.id} className="flex border-b pb-3">
                                <div className="font-semibold w-48">{item.name}</div>
                                <div className="flex-1 flex gap-4">
                                    {item.value.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`/content/${img}`}
                                            alt={img}
                                            style={{ width: `${item.size[idx]}px` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 포트폴리오 리스트 */}
            <section className="w-full py-10 px-4">
                <div className="text-center py-10 text-3xl font-bold">Portfolio List</div>

                {/* 매치업 랜딩페이지 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="w-full">
                            <Slider {...settings}>
                                <div><img src="/content/matchup/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/matchup/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/matchup/3.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>매치업 랜딩페이지</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div><a href="https://www.match-up.co.kr/" className="text-blue-500 hover:underline">match-up.co.kr</a></div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>PHP 백엔드, 프론트엔드(Jquery), 관리자 이미지 업로드 작업</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">개발환경</div>
                                <div>cafe24 Server, PHP 7.4</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>매치업 플랫폼을 홍보하는 랜딩 페이지를 작업했습니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 가자 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="w-full">
                            <Slider {...settings}>
                                <div><img src="/content/go/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/go/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/go/3.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>가자</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div>-</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">구글플레이 스토어</div>
                                <div>현재 게시 취소됨</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">앱 스토어</div>
                                <div>현재 게시 취소됨</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>PHP 백엔드, 프론트엔드(Jquery), 하이브리드앱 작업 및 배포(AOS, IOS)</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">개발환경</div>
                                <div>cafe24 Server, PHP 7.4</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>플랫폼에 등록된 상점을 들려 이용시 쿠폰과 스탬프를 지급하여 사용 할 수 있게 해주는 앱입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 칸타수학 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="w-full mb-6">
                            <Slider {...settings}>
                                <div><img src="/content/kanta/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/kanta/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/kanta/3.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/kanta/4.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/kanta/5.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>칸타수학 (교육영상 플랫폼)</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div><a href="https://softer084.cafe24.com" className="text-blue-500 hover:underline">softer084.cafe24.com</a></div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">구글플레이 스토어</div>
                                <div>스토어 게시취소</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>PHP 백엔드, 프론트엔드(Jquery), 하이브리드앱 작업 및 배포(AOS)</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">개발환경</div>
                                <div>AWS S3, cafe24 Server, PHP 7.4</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>강의영상과 시험문제를 온라인으로 학생들에게 제공하여 학습 효율을 높이는 플랫폼입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 주차실태조사 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-6 p-6">
                        <div className="w-full">
                            <Slider {...settings}>
                                <div><img src="/content/park/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/park/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/park/3.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/park/4.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/park/5.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>주차실태조사 (주차현황 조사 플랫폼)</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div>서비스 종료</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">구글플레이 스토어</div>
                                <div><a href="https://play.google.com/store/apps/details?id=com.wizmade.parkingsys" className="text-blue-500 hover:underline">플레이스토어 바로가기</a></div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">앱 스토어</div>
                                <div><a href="https://apps.apple.com/us/app/%EC%A3%BC%EC%B0%A8%EC%8B%A4%ED%83%9C%EC%A1%B0%EC%82%AC/id1582133805" className="text-blue-500 hover:underline">앱스토어 바로가기</a></div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>PHP 백엔드, 프론트엔드(Jquery), 하이브리드앱 작업 및 배포(IOS, AOS)</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">개발환경</div>
                                <div>AWS S3, AWS RDS, cafe24 Server, PHP 7.4</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>서울시 주차현황을 조사하는 플랫폼입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 롯데케미칼 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="w-full mb-6">
                            <Slider {...settings}>
                                <div><img src="/content/lotte/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/lotte/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/lotte/3.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>롯데케미칼</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div><a href="https://www.staron.com" className="text-blue-500 hover:underline">staron.com</a></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">사용언어</div>
                                    <div>PHP 7.x</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">프레임워크</div>
                                    <div>CodeIgniter 4.x</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">OS</div>
                                    <div>Linux</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">Server</div>
                                    <div>Nginx</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>유지보수 및 추가개발</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>인테리어 소재를 판매하는 사이트입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 영덕문화재단 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="w-full mb-6">
                            <Slider {...settings}>
                                <div><img src="/content/ydct/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/ydct/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/ydct/3.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/ydct/4.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>영덕문화재단</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div><a href="https://ydct.org" className="text-blue-500 hover:underline">ydct.org</a></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">사용언어</div>
                                    <div>PHP 7.x</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">프레임워크</div>
                                    <div>CodeIgniter 4.x</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">OS</div>
                                    <div>Linux</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">Server</div>
                                    <div>Nginx</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>유지보수 및 추가개발, 서버관리</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>영덕문화 관광재단에서 제공하는 사이트입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 선인 */}
                <div className="max-w-6xl mx-auto mb-16 bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="w-full mb-6">
                            <Slider {...settings}>
                                <div><img src="/content/sunin/1.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/sunin/2.png" alt="slide_img" className="w-full" /></div>
                                <div><img src="/content/sunin/3.png" alt="slide_img" className="w-full" /></div>
                            </Slider>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">프로젝트</div>
                                    <div>선인</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">URL</div>
                                    <div><a href="https://sib.kr" className="text-blue-500 hover:underline">sib.kr</a></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">사용언어</div>
                                    <div>PHP 7.x</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">프레임워크</div>
                                    <div>CodeIgniter 4.x</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="font-bold mb-1">OS</div>
                                    <div>Linux</div>
                                </div>
                                <div>
                                    <div className="font-bold mb-1">Server</div>
                                    <div>Nginx</div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">작업범위</div>
                                <div>유지보수 및 추가개발, 서버관리</div>
                            </div>
                            <div>
                                <div className="font-bold mb-1">플랫폼 설명</div>
                                <div>선인재단에서 관리하는 사이트입니다.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}