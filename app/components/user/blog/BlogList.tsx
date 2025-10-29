'use client'

import React, {useMemo, useState} from 'react';
import {usePathname, useRouter} from "next/navigation";
import jsonData from "@/components/user/blog/blog.json";
import PageHeroAuto from "@/components/user/PageHeroAuto";

const BlogMasonryList = () => {
    // 더미 블로그 데이터
    const rawPosts  = [
        {
            type: "갓테크 소식",
            title: "아시아 최대 스타트업 축제 '넥스트라이즈 2025', 6월 26일 코엑스에서 개최",
            image: "/blog/20250626.jpg",
            content: "한국무역협회는 6월 26일부터 27일까지 이틀간 한국산업은행과 함께 서울 강남구 코엑스에서 아시아 최대 스타트업 행사인 ‘넥스트라이즈 2025’(NextRise 2025)를 개최한다고 밝혔다.",
            date: "2025.06.26"
        },
        {
            type: "갓테크 소식",
            title: "2025년 하반기 IBK창공 혁신 창업기업 선정",
            image: "/blog/20250624.png",
            content: "IBK기업은행은 2025년 하반기 IBK창공(창업기업 부문)에 갓테크가 선정 되었음을 밝혔다.",
            date: "2025.06.24"
        },
        {
            type: "뉴스 기사",
            title: "첨단산업 분야 경남형 스타트업 10곳 글로벌 날개 단다\n",
            image: "/blog/20250608.png",
            content: "갓테크, 그린백스, 트윈위즈 등 경남에서 떠오르는 미래 유망 첨단산업 스타트업들이 본격적인 글로벌 진출을 위한 날개를 단다.",
            date: "2025.06.08"
        },
        {
            type: "뉴스 기사",
            title: "'AXIA EXPO 2025', 6월 4일 아이치 스카이 엑스포에서 성대히 개막",
            image: "/blog/20250603.jpg",
            content: "친환경 기술과 지속가능한 산업 혁신을 선도하는 ‘AXIA EXPO 2025’가 2025년 6월 4일(수), 일본 아이치현 Aichi Sky Expo에서 성대하게 개막했다.",
            date: "2025.06.04"
        },
        {
            type: "갓테크 소식",
            title: "2025년 가스터빈 소재·부품 품질평가 및 성능검증 플랫폼 개발사업 선정",
            image: "/blog/20250507.png",
            content: "재단법인 경남테크노파크 우주항공본부는 2025년 경남 우주산업 혁신생태계 조성 지원사업에 갓테크가 선정 되었음을 밝혔다. ",
            date: "2025.05.07"
        },
        {
            type: "갓테크 소식",
            title: "2025년 경남 원전기업 수요 맞춤형 패키지 지원사업 선정",
            image: "/blog/20250430.png",
            content: "재단법인 경남테크노파크 에너지바이오본부 원전산업팀은 2025년 경남 원전기업 수요 맞춤형 패키지 지원사업에 갓테크가 선정 되었음을 밝혔다.",
            date: "2025.04.30"
        },
        {
            type: "갓테크 소식",
            title: "2025년 경남 우주산업 혁신생태계 조성 지원사업 선정",
            image: "/blog/20250415.png",
            content: "재단법인 경남테크노파크 우주항공본부는 2025년 경남 우주산업 혁신생태계 조성 지원사업에 갓테크가 선정 되었음을 밝혔다. ",
            date: "2025.04.15"
        },
        {
            type: "갓테크 소식",
            title: "2025년 에코스타트업 지원사업(창업기업 부문) 선정",
            image: "/blog/20250324.png",
            content: "한국환경산업기술원은 2025년 에코스사트업 지원사업(창업기업 부문)에 갓테크가 선정되었음을 24일 밝혔다.",
            date: "2025.03.24"
        },
        {
            type: "갓테크 소식",
            title: "2025년 창업성공패키지 글로벌창업사관학교 6기 선정",
            image: "/blog/20250321.png",
            content: "글로벌창업사관학교에서는 2025년 창업성공패키지 글로벌창업사관학교 6기 최종 합격 대상자로 선정되었음을 21일 밝혔다.",
            date: "2025.03.21"
        },
        {
            type: "뉴스 기사",
            title: "경남테크노파크, 4개 기업과 인재양성 협약",
            image: "/blog/20250224.jpg",
            content: "경남테크노파크(원장 김정환, 이하 경남TP)는 24일 ‘지역에너지 클러스터 인재양성사업’에 신규로 참여를 희망하는 수요기업 4개사와 기업 수요맞춤형 전문인재 양성에 관한 MOU를 체결했다.",
            date: "2025.02.24"
        },
        {
            type: "뉴스 기사",
            title: "산은, KDB 넥스트원 부산 2기 보육 시작",
            image: "/blog/20250203.jpg",
            content: "한국산업은행(회장 강석훈)은 'KDB NextONE 부산 2기'에 참여할 15개 스타트업을 최종 선발하고 3일 오리엔테이션을 열었다고 밝혔다. KDB NextONE은 2020년 7월 시작한 초기 스타트업 보육 프로그램으로 작년 6월 지역 벤처생태계 활성화를 위해 'KDB NextONE 부산'을 개소했다.",
            date: "2025.02.03"
        },
        {
            type: "갓테크 소식",
            title: "KDB NextONE 부산 2기 선정",
            image: "/blog/20250124.png",
            content: "한국산업은행 지역기업종합지원센터 혁신플랫폼팀은 2025년 상반기 KDB NextONE 부산 2기 최종합격 대상자로 선정되었음을 24일 밝혔다.",
            date: "2025.01.24"
        },
        {
            type: "뉴스 기사",
            title: "적층제조, 생산성 향상·소재 다양화·적용산업 지속 확대",
            image: "https://framerusercontent.com/images/m5OUAcjbZxCgWRh45ehLolyw9Qg.jpg",
            content: "3D프린팅연구조합, ‘2024 폼넥스트 참관단’ 보고회 성료",
            date: "2025.01.15"
        },
        {
            type: "갓테크 소식",
            title: "2025년 신년회 및 새로운 비전 소개",
            image: "https://framerusercontent.com/images/wtrnkiWseZJykxvXCzihXthb3o.jpg",
            content: "1월 11일 부산 호메르스호텔에서  '2025년 가족 신년회 및 시무식'를 개최했다. 이날 신년회에는 임직원 가족 및 지인분들이 참석했다.",
            date: "2025.01.11"
        },
        {
            type: "뉴스 기사",
            title: "[3D프린팅연구조합 연재기고③]박기덕 ㈜갓테크 대표",
            image: "https://framerusercontent.com/images/YGQIN5rlHLfYGIuvj4bCCnEs.jpg",
            content: "필자는 2004년부터 학위 과정을 포함해 국내 조선해양 분야의 용접기술연구소와 산업용 가스터빈 개발센터를 거쳐 현재 적층제조 분야의 소재 및 공정을 연구하고 개발하는 ㈜갓테크의 대표를 맡고 있다.",
            date: "2024.12.12"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제혁신센터, 혁신창업기업 투자유치 IR데모데이 성료··· 지역 창업 생태계 활성화 박차\n",
            image: "/blog/20241203.jpg",
            content: "경남창조경제혁신센터는 양산의 G-Space@East 세미나실에서 개최된 ‘2024 경남혁신창업기업 액셀러레이팅 지원사업 스케일업 연합 IR데모데이&투자상담회’가 지난 11월 6일 성황리에 마무리됐다고 밝혔다.",
            date: "2024.12.03"
        },
        {
            type: "갓테크 소식",
            title: "중소벤처기업부 팁스(TIPS) 창업기업 지원계획 선정",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=350&fit=crop",
            content: "(사)한국엔젤투자협회 팁스평가팀은 2024년 팁스(TIPS) 창업기업 지원계획 통합 공고(중소벤처기업부 공고 제2024-187호)의 팁스(TIPS) 추천 창업기업 선정평가 최종 선정되었음을 21일 밝혔다.",
            date: "2024.11.21"
        },
        {
            type: "뉴스 기사",
            title: "글로벌 적층제조, 대형·양산 부품 제작 위한 소재·장비·SW 지속 확장",
            image: "https://framerusercontent.com/images/k0wNs0A0rscSdfGqc8UVgsV0E.jpg",
            content: "세계 적층제조 트렌드인 대형화와 양산화가 지속 발전하고 있는 가운데 이에 필요한 장비, 소재, 소프트웨어(SW) 등도 진일보하고 있는 것으로 나타났다.",
            date: "2024.11.20"
        },
        {
            type: "뉴스 기사",
            title: "중부발전, '제7기 청년 에너지드림리그' 최종발표회",
            image: "https://framerusercontent.com/images/NwzJrstam3mZl5kidhJerWwm24.jpg",
            content: "한국중부발전이 서울발전본부에서 청년들의 미래성장동력 육성을 위한 ‘청년도약을 향한 스프린트, 제 7기 청년 에너지드림리그’의 최종발표회를 개최했다.",
            date: "2024.09.27"
        },
        {
            type: "갓테크 소식",
            title: "한국남동발전 KOEN 상생형 창업‧벤처기업 지원사업 선정",
            image: "/blog/20240917.png",
            content: "한국생산성본부는 2024년 한국남동발전 KOEN 상생형 창업·벤처기업 지원사업 에 갓테크가 선정되었음을 6일 밝혔다.",
            date: "2024.09.17"
        },
        {
            type: "갓테크 소식",
            title: "수요중심형기술사업화지원사업(2차) 선정",
            image: "/blog/20240916.png",
            content: "(재)경남테크노파크에서는 2024년 수요중심형 기술사업화지원사업(2차)에 갓테크가 선정되었음을 2일 밝혔다.",
            date: "2024.09.16"
        },
        {
            type: "갓테크 소식",
            title: "가스터빈 소재·부품 품질평가 및 성능검증 플랫폼 개발사업 기업지원 수혜기업 선정",
            image: "/blog/20240913.png",
            content: "재단법인 경남테크노파크 지능기계본부 소재부품팀은 2024년 가스터빈 소재·부품 품질평가 및 성능검증 플랫폼 개발사업 기업지원 수혜기업에 갓테크가 선정되었음을 28일 밝혔다.",
            date: "2024.09.13"
        },
        {
            type: "뉴스 기사",
            title: "경남대, ‘스마트제조ICC 첨단방위부품 제조기술 연구회’ 개최",
            image: "/blog/20240626.jpg",
            content: "경남대학교 LINC3.0사업단은 지난 6월 21일 오후 1시 산학협력관 5층 산학협력세미나실에서 ‘2024년 스마트제조ICC 첨단방위부품 제조기술 연구회’를 개최했다.",
            date: "2024.06.26"
        },
        {
            type: "뉴스 기사",
            title: "한국투자액셀러레이터, 바른동행 5기 데모데이 개최",
            image: "https://framerusercontent.com/images/Z4Gzm39JAr4oE2d1UiL3CTdkzAU.jpg",
            content: "한국투자액셀러레이터(대표 백여현)는 스타트업 육성 프로그램 바른동행 5기 데모데이를 지난 20일 성공적으로 개최했다고 21일 밝혔다.",
            date: "2024.06.21"
        },
        {
            type: "뉴스 기사",
            title: "‘우리 경제의 활력’과 ‘좋은 일자리’, 청년창업사관학교에서 시작된다!",
            image: "https://framerusercontent.com/images/1NDk2e1a8DXIlGGJ20iNcnbncc.png",
            content: "중소벤처기업부(장관 오영주, 이하 중기부)는 16일(목), 청년창업사관학교 본교(경기 안산)에서 청년창업사관학교 입학식 겸 출정식을 개최했다고 밝혔습니다.",
            date: "2024.05.16"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제혁신센터 동부거점 , ‘혁신 창업기업 액셀러레이팅 사업’ 본격 운영",
            image: "https://framerusercontent.com/images/HuR9whhaUSiRgKCP19mboejn9MQ.jpg",
            content: "경남창조경제혁신센터(이동형 센터장)는 지난 8일과 13일 경남 동부권 창업지원거점(G-Space@East)에서 ‘혁신창업기업 액셀러레이팅 지원사업' 및 ‘입주기업 발굴&육성사업’의 최종 선정기업들과 오리엔테이션을 시작으로 올해 일정을 본격 운영한다.",
            date: "2024.05.16"
        },
        {
            type: "뉴스 기사",
            title: "중부발전, 제7기 에너지드림리그 발대식 개최...\"총 8개팀 선발, 향후 사업화도 추진\"",
            image: "https://framerusercontent.com/images/dea5lzHq127KTwfhmzPNbIQZUCU.jpg",
            content: "한국중부발전(중부발전)은 ‘청년도약을 향한 스프린트, 제 7기 청년 에너지드림리그 발대식'을 지난 10일 개최했습니다.",
            date: "2024.05.13"
        },
        {
            type: "뉴스 기사",
            title: "국립창원대 두산에너빌리티 등 7개 기업과 원전 R&D 협약 체결",
            image: "https://framerusercontent.com/images/0FKVwen021jYIR6JerwCTBYu24.jpg",
            content: "국립창원대 울산경남지역혁신플랫폼 스마트제조엔지니어링사업단은 '차세대 원전에너지 특화 인재 양성 산학연협의회 및 기업혁신클리닉'을 통해 발굴된 주제를 중심으로 두산에너빌리티, 주식회사 갓테크, 삼홍기계, 브라이트 주식회사, 피케이밸브앤엔지니어링, 대호아이앤티, 비에이치아이주식회사 등 원전 분야 관련 7개 기업과 R&D협약을 체결하고 본격적인 연구개발 협력에 나섰다고 10일 밝혔다.",
            date: "2024.05.10"
        },
        {
            type: "뉴스 기사",
            title: "자원 순환 통한 폐금속 재활용, 도시광산화사업 활성화",
            image: "https://framerusercontent.com/images/ywgmHogGsZqWIa93WCs3xrCz784.jpg",
            content: "자연환경 보호, 한정된 자원 낭비 및 쓰레기 발생 최소화, 온실 가스 감축을 목적으로 폐금속 자원을 재활용하는 도시광산화사업이 활성화되고 있다. 이런 때 자원 순환을 통해 지속 가능한 미래를 만들어가는 폐금속 재활용 전문기업 ㈜갓테크(GODTECH)(박기덕 대표)가 이목을 끈다.",
            date: "2024.03.06"
        },
        {
            type: "뉴스 기사",
            title: "경남대 LINC3.0사업단-갓테크, 금속적층제조기술 업무협약 체결",
            image: "https://framerusercontent.com/images/R6byC3XZfOBP5VcbS9OEuwMC4Vo.jpg",
            content: "경남대학교 LINC3.0사업단은 최근 산학협력관 5층 산학협력세미나실에서 갓테크와 업무협약을 체결했다.",
            date: "2024.01.30"
        },
        {
            type: "뉴스 기사",
            title: "교보생명, 청년창업가 육성하는 ‘임팩트투자’ 진행",
            image: "https://framerusercontent.com/images/vxynRMhVM6m0PafeIZl1le1JsQ.jpg",
            content: "교보생명은 ‘세상에 임팩트를 더하자! UP!’(이하 ‘임팩트업’)을 통해 지난 6년간 131개 팀을 육성하고 10만 명 이상의 취약계층에 양질의 서비스를 제공했다고 15일 밝혔다.",
            date: "2023.12.15"
        },
        {
            type: "뉴스 기사",
            title: "경남창조경제센터-두산에너빌리티-스타트업 9개사, 혁신성장 협력",
            image: "https://framerusercontent.com/images/gSnZ9DFsHMPnWGLpuethV4ayLYQ.jpg",
            content: "경남창조경제혁신센터는 두산에너빌리티, 스타트업인 한울항공기계와 ‘2023 대-스타 혁신성장 파트너스 업무협약’을 체결했다고 5일 밝혔다. ",
            date: "2023.07.05"
        }
    ];


    const blogPosts = rawPosts.map((post, index) => ({
        id: index + 1,
        ...post
    }));

    const [selectedTab, setSelectedTab] = useState<'전체' | '갓테크 소식' | '뉴스 기사'>('전체');
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = useMemo(() => {
        return pathname?.split('/')[1];
    }, [pathname]);


    const filteredPosts = useMemo(() => {
        if (selectedTab === '전체') return blogPosts;
        return blogPosts.filter(post => post.type === selectedTab);
    }, [selectedTab]);

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/bloghero.png"/>

            <div className="min-h-screen from-slate-50 to-gray-100">
                <main className="max-w-7xl mx-auto px-4 py-8">

                    {/* ✅ 탭 버튼 */}
                    <div className="flex gap-4 justify-center mb-8">
                        {['전체', '갓테크 소식', '뉴스 기사'].map(tab => {
                            const isActive = selectedTab === tab;

                            // 조건별 색상 클래스 설정
                            let activeClass = '';
                            if (isActive) {
                                if (tab === '전체') {
                                    activeClass = 'bg-gray-700 text-white shadow';
                                } else if (tab === '갓테크 소식') {
                                    activeClass = 'bg-[#56BC6F] text-white shadow';
                                } else if (tab === '뉴스 기사') {
                                    activeClass = 'bg-blue-600 text-white shadow';
                                }
                            } else {
                                activeClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200';
                            }

                            return (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedTab(tab as '전체' | '갓테크 소식' | '뉴스 기사')}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-pointer ${activeClass}`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>


                    {/* ✅ 카드 그리드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredPosts.map((post) => (
                            <div
                                key={post.id}
                                onClick={() => { router.push(`/${currentLocale}/Blog/view/${post.id}`) }}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group overflow-hidden flex flex-col"
                            >
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                </div>

                                <div className="p-6 flex flex-col justify-between flex-grow">
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            post.type === '갓테크 소식'
                              ? 'text-[#56BC6F] bg-green-50'
                              : post.type === '뉴스 기사'
                              ? 'text-blue-800 bg-blue-100'
                              : 'text-gray-600 bg-gray-100'
                          }`}
                        >
                          {post.type}
                        </span>

                                            <span className="text-sm text-gray-500">{post.date}</span>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#C6C6C6] transition-colors duration-200 line-clamp-2">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-600 leading-relaxed text-sm mb-4 line-clamp-3">
                                            {post.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-auto">
                                        <button className="text-[#56BC6F] font-medium text-sm hover:text-gray-400 transition-colors duration-200 flex items-center gap-1 group cursor-pointer">
                                            더 읽기
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        <div className="flex items-center gap-3 text-gray-400">
                                            <button className="hover:text-red-500 transition-colors duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </button>
                                            <button className="hover:text-[#56BC6F] transition-colors duration-200">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ✅ 게시물 없음 안내 */}
                    {filteredPosts.length === 0 && (
                        <div className="text-center text-gray-400 py-10">
                            게시물이 없습니다.
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default BlogMasonryList;
