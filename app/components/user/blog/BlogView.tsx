'use client'

import React, {useMemo, useState} from 'react';
import {useParams, usePathname, useRouter} from "next/navigation";
import jsonData from "./blog.json"
import PageHeroAuto from "@/components/user/PageHeroAuto";


const BlogViewPage = () => {
    const { idx  } = useParams();
    // URL 파라미터 시뮬레이션 (실제로는 Next.js router에서 가져올 값)
    const [currentId, setCurrentId] = useState(idx); // 예시로 ID 1 설정
    const pathname = usePathname(); // 예: "/ko/about", "/en/home"

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);

    // 블로그 데이터 정의
    const rawPosts = [
        {
            type: "뉴스 기사",
            title: "아시아 최대 스타트업 축제 '넥스트라이즈 2025', 6월 26일 코엑스에서 개최",
            image: "/blog/20250626.jpg",
            date: "2025.06.26"
        },
        {
            type: "갓테크 소식",
            title: "2025년 하반기 IBK창공 혁신 창업기업 선정",
            image: "/blog/20250624.png",
            date: "2025.06.24"
        },
        {
            type: "뉴스 기사",
            title: "첨단산업 분야 경남형 스타트업 10곳 글로벌 날개 단다\n",
            image: "/blog/20250608.png",
            date: "2025.06.08"
        },
        {
            type: "뉴스 기사",
            title: "'AXIA EXPO 2025', 6월 4일 아이치 스카이 엑스포에서 성대히 개막",
            image: "/blog/20250603.jpg",
            date: "2025.06.04"
        },
        {
            type: "갓테크 소식",
            title: "2025년 가스터빈 소재·부품 품질평가 및 성능검증 플랫폼 개발사업 선정",
            image: "/blog/20250507.png",
            date: "2025.05.07"
        },
        {
            type: "갓테크 소식",
            title: "2025년 경남 원전기업 수요 맞춤형 패키지 지원사업 선정",
            image: "/blog/20250430.png",
            date: "2025.04.30"
        },
        {
            type: "갓테크 소식",
            title: "2025년 경남 우주산업 혁신생태계 조성 지원사업 선정",
            image: "/blog/20250415.png",
            date: "2025.04.15"
        },
        {
            type: "갓테크 소식",
            title: "2025년 에코스타트업 지원사업(창업기업 부문) 선정",
            image: "/blog/20250324.png",
            date: "2025.03.24"
        },
        {
            type: "갓테크 소식",
            title: "2025년 창업성공패키지 글로벌창업사관학교 6기 선정",
            image: "/blog/20250321.png",
            date: "2025.03.21"
        },
        {
            type: "뉴스 기사",
            title: "경남테크노파크, 4개 기업과 인재양성 협약",
            image: "/blog/20250224.jpg",
            date: "2025.02.24"
        },
        {
            type: "뉴스 기사",
            title: "산은, KDB 넥스트원 부산 2기 보육 시작",
            image: "/blog/20250203.jpg",
            date: "2025.02.03"
        },
        {
            type: "갓테크 소식",
            title: "KDB NextONE 부산 2기 선정",
            image: "/blog/20250124.png",
            date: "2025.01.24"
        },
        {
            type: "뉴스 기사",
            title: "적층제조, 생산성 향상·소재 다양화·적용산업 지속 확대",
            image: "https://framerusercontent.com/images/m5OUAcjbZxCgWRh45ehLolyw9Qg.jpg",
            date: "2025.01.15"
        },
        {
            type: "갓테크 소식",
            title: "2025년 신년회 및 새로운 비전 소개",
            image: "https://framerusercontent.com/images/wtrnkiWseZJykxvXCzihXthb3o.jpg",
            date: "2025.01.11"
        },
        {
            type: "뉴스 기사",
            title: "[3D프린팅연구조합 연재기고③]박기덕 ㈜갓테크 대표",
            image: "https://framerusercontent.com/images/YGQIN5rlHLfYGIuvj4bCCnEs.jpg",
            date: "2024.12.12"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제혁신센터, 혁신창업기업 투자유치 IR데모데이 성료··· 지역 창업 생태계 활성화 박차\n",
            image: "/blog/20241203.jpg",
            date: "2024.12.03"
        },
        {
            type: "갓테크 소식",
            title: "중소벤처기업부 팁스(TIPS) 창업기업 지원계획 선정",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=350&fit=crop",
            date: "2024.11.21"
        },
        {
            type: "뉴스 기사",
            title: "글로벌 적층제조, 대형·양산 부품 제작 위한 소재·장비·SW 지속 확장",
            image: "https://framerusercontent.com/images/k0wNs0A0rscSdfGqc8UVgsV0E.jpg",
            date: "2024.11.20"
        },
        {
            type: "뉴스 기사",
            title: "중부발전, '제7기 청년 에너지드림리그' 최종발표회",
            image: "https://framerusercontent.com/images/NwzJrstam3mZl5kidhJerWwm24.jpg",
            date: "2024.09.27"
        },
        {
            type: "갓테크 소식",
            title: "한국남동발전 KOEN 상생형 창업‧벤처기업 지원사업 선정",
            image: "/blog/20240917.png",
            date: "2024.09.17"
        },
        {
            type: "갓테크 소식",
            title: "수요중심형기술사업화지원사업(2차) 선정",
            image: "/blog/20240916.png",
            date: "2024.09.16"
        },
        {
            type: "갓테크 소식",
            title: "가스터빈 소재·부품 품질평가 및 성능검증 플랫폼 개발사업 기업지원 수혜기업 선정",
            image: "/blog/20240913.png",
            date: "2024.09.13"
        },
        {
            type: "뉴스 기사",
            title: "경남대, ‘스마트제조ICC 첨단방위부품 제조기술 연구회’ 개최",
            image: "/blog/20240626.jpg",
            date: "2024.06.26"
        },
        {
            type: "뉴스 기사",
            title: "한국투자액셀러레이터, 바른동행 5기 데모데이 개최",
            image: "https://framerusercontent.com/images/Z4Gzm39JAr4oE2d1UiL3CTdkzAU.jpg",
            date: "2024.06.21"
        },
        {
            type: "뉴스 기사",
            title: "‘우리 경제의 활력’과 ‘좋은 일자리’, 청년창업사관학교에서 시작된다!",
            image: "https://framerusercontent.com/images/1NDk2e1a8DXIlGGJ20iNcnbncc.png",
            date: "2024.05.16"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제혁신센터 동부거점 , ‘혁신 창업기업 액셀러레이팅 사업’ 본격 운영",
            image: "https://framerusercontent.com/images/HuR9whhaUSiRgKCP19mboejn9MQ.jpg",
            date: "2024.05.16"
        },
        {
            type: "뉴스 기사",
            title: "중부발전, 제7기 에너지드림리그 발대식 개최...\"총 8개팀 선발, 향후 사업화도 추진\"",
            image: "https://framerusercontent.com/images/dea5lzHq127KTwfhmzPNbIQZUCU.jpg",
            date: "2024.05.13"
        },
        {
            type: "뉴스 기사",
            title: "국립창원대 두산에너빌리티 등 7개 기업과 원전 R&D 협약 체결",
            image: "https://framerusercontent.com/images/0FKVwen021jYIR6JerwCTBYu24.jpg",
            date: "2024.05.10"
        },
        {
            type: "뉴스 기사",
            title: "자원 순환 통한 폐금속 재활용, 도시광산화사업 활성화",
            image: "https://framerusercontent.com/images/ywgmHogGsZqWIa93WCs3xrCz784.jpg",
            date: "2024.03.06"
        },
        {
            type: "뉴스 기사",
            title: "경남대 LINC3.0사업단-갓테크, 금속적층제조기술 업무협약 체결",
            image: "https://framerusercontent.com/images/R6byC3XZfOBP5VcbS9OEuwMC4Vo.jpg",
            date: "2024.01.30"
        },
        {
            type: "뉴스 기사",
            title: "교보생명, 청년창업가 육성하는 ‘임팩트투자’ 진행",
            image: "https://framerusercontent.com/images/vxynRMhVM6m0PafeIZl1le1JsQ.jpg",
            date: "2023.12.15"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제센터-두산에너빌리티-스타트업 9개사, 혁신성장 협력",
            image: "https://framerusercontent.com/images/gSnZ9DFsHMPnWGLpuethV4ayLYQ.jpg",
            date: "2023.07.05"
        }
    ];

    const blogPosts = rawPosts.map((post, index) => ({
        id: index + 1,
        content: jsonData[index].content,
        ...post
    }));



    // URL 파라미터로 받은 id와 매칭되는 블로그 찾기
    const currentBlog = blogPosts.find(post => post.id === Number(currentId));
    const router = useRouter()

    // 블로그 ID 변경 함수 (실제로는 router.push로 대체될 부분)
    const handleBlogChange = (newId: string) => {
        setCurrentId(newId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 목록으로 돌아가기 함수 (실제로는 router.back()으로 대체될 부분)
    const handleBackToList = () => {
        router.push(`/${currentLocale}/BlogList`)
    };

    // 블로그를 찾지 못한 경우
    if (!currentBlog) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">블로그를 찾을 수 없습니다</h1>
                    <p className="text-gray-600 mb-6">요청하신 블로그 포스트가 존재하지 않습니다.</p>
                    <button
                        onClick={handleBackToList}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                        블로그 목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    // 카테고리별 색상 설정
    const getCategoryColor = (type: string) => {
        switch (type) {
            case '갓테크 소식':
                return 'bg-green-100 text-[#56BC6F]';
            case '뉴스 기사':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/bloghero.png"/>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <button
                            onClick={handleBackToList}
                            className="flex items-center gap-2 text-[#56BC6F] hover:text-[#56BC6F] mb-4 transition-colors duration-200 cursor-pointer"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            목록으로 돌아가기
                        </button>

                        {/* Category Badge */}
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentBlog.type)}`}>
                              {currentBlog.type}
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                            {currentBlog.title}
                        </h1>

                        <div className="flex items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                    {currentBlog.date}
                </span>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-4xl mx-auto px-4 py-8">

                    {/* Hero Image */}
                    <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src={currentBlog.image}
                            alt={currentBlog.title}
                            className="w-full min-h-96 max-h-128 object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
                            }}
                        />
                    </div>

                    {/* Content */}
                    <article className="mb-12">
                        <div className="prose prose-lg max-w-none">
                            <div className="text-gray-700 leading-relaxed text-lg mb-8">
                                <pre className="text-xl leading-relaxed font-sans whitespace-pre-wrap">
                                {currentBlog.content}
                                </pre>
                            </div>

                            {/* 추가 콘텐츠 영역 */}
                            {/*
                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">주요 내용</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {currentBlog.content} 이와 관련하여 더 자세한 정보와 배경, 그리고 향후 전망에 대해 알아보겠습니다.
                                </p>
                            </div>
                            */}
                        </div>
                    </article>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">

                        <button
                            onClick={handleBackToList}
                            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105 shadow-lg cursor-pointer"
                        >
                            다른 글 보기
                        </button>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">관련 글</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogPosts
                                .filter(post => post.id !== currentBlog.id)
                                .slice(0, 3)
                                .map(post => (
                                    <div
                                        key={post.id}
                                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                                        onClick={() => handleBlogChange(post.id.toString())}
                                    >
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-48 object-cover rounded-t-xl"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop';
                                            }}
                                        />
                                        <div className="p-6">
                                            <div className="mb-2">
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.type)}`}>
                                                {post.type}
                                              </span>
                                            </div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-3 line-clamp-2" >
                                                {post.content}
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>{post.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default BlogViewPage;