'use client';

import React, { useEffect, useRef, useState } from "react";
import PageHeroAuto from "@/components/user/PageHeroAuto";
import { useSafeTranslations } from "@/lib/intl/useSafeTranslations";

// ===== Type Definitions =====
type EventItem = { events: string[] };
type MonthMap = Record<string, EventItem[]>;
type MonthItem = { month: MonthMap };
type YearMap = Record<string, MonthItem[]>;
type YearItem = { year: YearMap };

// ===== Timeline Data =====
const historyData: YearItem[] = [
    {
        year: {
            "2025": [
                {
                    month: {
                        "06": [{ events: ["2025년 하반기 IBK창공 혁신 창업기업 선정"] }],
                    },
                },
                {
                    month: {
                        "05": [{ events: ["가스터빈 소재부품 품질평가 및 성능 검증 플랫폼 사업 수행", "경남 원전기업(SMR) 수요 맞춤형 패키지 지원사업 수행"] }],
                    },
                },
                {
                    month: {
                        "04": [{ events: ["글로벌청년창업사관학교 7기 선정 (미국)", "2025년 에코스타트업(창업기업 트랙) 국책과제 수행", "경남 우주산업 혁신생태계 조성 지원사업 수행"] }],
                    },
                },
                {
                    month: {
                        "03": [{ events: ["KDB NextONE 부산 2기 선정"] }],
                    },
                },
            ],
        },
    },
    {
        year: {
            "2024": [
                {
                    month: {
                        "11": [{ events: ["창업성장기술사업(TIPS) 선정"] }],
                    },
                },
                {
                    month: {
                        "10": [{ events: ["한전 KPS 스타트업 투게더 프로젝트 수행"] }],
                    },
                },
                {
                    month: {
                        "09": [{ events: ["가스터빈 소재부품 시제품 제작 사업 수행", "한국남동발전 KOEN 상생형 지원사업 수행"] }],
                    },
                },
                {
                    month: {
                        "08": [{ events: ["한국중부발전 에너지드림리그 최우수상"] }],
                    },
                },
                {
                    month: {
                        "05": [{ events: ["중소기업기술혁신개발사업(수출지향형) 국책과제 수행"] }],
                    },
                },
                {
                    month: {
                        "04": [{ events: ["한국투자액셀러레이터 SEED 투자 유치", "청년창업사관학교 14기 선정"] }],
                    },
                },
            ],
        },
    },
    {
        year: {
            "2023": [
                {
                    month: {
                        "12": [{ events: ["상생형 창업벤처기업(한전KPS 수요) 과제 수행", "상생형 창업젠처기업 지원사업 선정"] }],
                    },
                },
                {
                    month: {
                        "11": [{ events: ["창업진흥원 공모전 최우수상"] }],
                    },
                },
                {
                    month: {
                        "10": [{ events: ["두산에너빌리티 OI 과제 수행"] }],
                    },
                },
                {
                    month: {
                        "05": [{ events: [
                                "2023년 에코스타트업 국책과제 수행",
                            ] }],
                    },
                },
                {
                    month: {
                        "04": [{ events: [
                            "주식회사 갓테크 설립"
                            ] }],
                    },
                },
            ],
        },
    },
];

// ===== Component =====
export default function Timeline() {
    const t = useSafeTranslations("timeline");
    const timelineRef = useRef<HTMLDivElement>(null);
    const [progressHeight, setProgressHeight] = useState(0);
    const [activeYears, setActiveYears] = useState<Record<string, boolean>>({});
    const yearRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
    const [yearLineHeights, setYearLineHeights] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!timelineRef.current) return;

        const newHeights: Record<string, number> = {};
        Object.entries(yearRefs.current).forEach(([year, el]) => {
            if (el) {
                // el.offsetHeight: 해당 연도 블록 전체 높이
                newHeights[year] = el.offsetHeight;
            }
        });

        setYearLineHeights(newHeights);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const el = timelineRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const totalHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollTop = windowHeight - rect.top - 300;
            const percent = Math.min(Math.max(scrollTop / totalHeight, 0), 1);
            setProgressHeight(percent * 100);

            const newActiveYears: Record<string, boolean> = {};

            Object.entries(yearRefs.current).forEach(([year, el]) => {
                if (!el) return;
                const offset = el.offsetTop;
                const yearPercent = (offset / totalHeight) * 100 - 2;
                newActiveYears[year] = percent * 100 >= yearPercent;
            });

            //setActiveYears(newActiveYears);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // 초기 실행

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/companyhero.jpg" />

            <section className="bg-white dark:bg-neutral-900 max-w-screen-xl sm:px-2 px-4 pb-20 mx-auto md:px-0 flex flex-col md:flex-row relative">
                <div className="hidden md:block md:w-3/6 mt-15 md:ml-12">
                    <div className=" top-30 ml-15 ">
                        <h2 className="text-2xl font-bold mb-2" style={{ color: "#56BC6F" }}>{t("갓테크가 걸어온 길")}</h2>
                        <div className="text-xl font-semibold">{t("작은 시작에서 끊임없는 도전과 성장을 통해")} </div>
                        <div className="text-xl font-semibold mb-6">{t("큰 미래를 만들어갑니다")}</div>

                        <img
                            src="/timeline/sticky.jpg"
                            alt=""
                            className="w-[350px] max-h-128 object-cover rounded"
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
                            }}
                        />
                    </div>
                </div>

                <div className="w-full mt-15 md:w-4/6">
                    <div ref={timelineRef} className="ml-6 flex flex-col relative bottom-7">
                        {/* 세로 라인 */}
                        <div className="absolute sm:left-29 left-3 top-10 w-1 bg-[#56BC6F]  z-0" style={{ height: "calc(100% - 100px)" }}>
                            <div
                                className="absolute w-full transition-all duration-600"
                                /*style={{ height: `${progressHeight}%`, backgroundColor: "#56BC6F" }}*/
                            />
                        </div>

                        {historyData.map((entry, index) => {
                            const year = Object.keys(entry.year)[0];
                            const months = entry.year[year];

                            const sortedMonths = [...months].sort((a, b) => {
                                const aMonth = Number(Object.keys(a.month)[0]);
                                const bMonth = Number(Object.keys(b.month)[0]);
                                return bMonth - aMonth;
                            });

                            return (
                                <div key={index} className={`${index === historyData.length - 1 ? "" : "mb-10"}`}>
                                    <h3
                                      ref={(el) => {
                                        yearRefs.current[year] = el;
                                      }}
                                      className={`text-2xl sm:text-4xl font-medium relative sm:left-3 sm:top-6 left-7 bottom-4 z-20 transition-colors duration-300 ${
                                        activeYears[year] ? "" : "text-black-500"
                                      }`}
                                      style={activeYears[year] ? { color: "#56BC6F" } : {}}
                                    >
                                      {year}
                                    </h3>


                                    <div className="flex flex-col relative sm:ml-16 ml-2">
                                        {sortedMonths.map((monthItem, mIdx) => {
                                            const monthKey = Object.keys(monthItem.month)[0];
                                            const eventGroups = monthItem.month[monthKey] || [];

                                            return (
                                                <div key={mIdx} className="flex items-start relative sm:ml-10 ml-0 mb-9">
                                                    <Circle />
                                                    <div className="relative bottom-1 sm:bottom-2 sm:left-4 left-0 sm:min-w-8 min-w-6 text-right sm:text-xl text-base font-semibold text-gray-800 dark:text-white">
                                                        {monthKey}
                                                    </div>
                                                    <div className="relative sm:bottom-1.5 sm:left-5 bottom-1 left-0 ml-3 flex flex-col text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {eventGroups.map((group, eIdx) =>
                                                            group.events.map((text, tIdx) => (
                                                                <div key={`${eIdx}-${tIdx}`} >{t(text)}</div>
                                                            ))
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}

// ===== Circle Component =====
function Circle() {
    const circleRef = useRef<HTMLDivElement>(null);
    const [isPast, setIsPast] = useState(false);

    useEffect(() => {
        /*
        const onScroll = () => {
            if (!circleRef.current) return;
            const rect = circleRef.current.getBoundingClientRect();
            setIsPast(window.innerHeight - rect.top - 260 > 0);
        };

        window.addEventListener("scroll", onScroll);
        onScroll();

        return () => window.removeEventListener("scroll", onScroll);

         */
    }, []);

    return (
        <div
            ref={circleRef}
            className="relative sm:min-w-3 sm:min-h-3 min-w-3 min-h-3 sm:left-2 rounded-full border-2 z-10 transition-colors duration-300"
            style={{
                borderColor: isPast ? "#56BC6F" : "#56BC6F",
                backgroundColor: "#ffffff",
            }}
        />
    );
}
