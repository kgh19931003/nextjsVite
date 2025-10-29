'use client';

import React, {useEffect, useMemo, useState} from 'react';
import PageHeroAuto from "@/components/user/PageHeroAuto";
import Image from "next/image";
import {useSafeTranslations} from "@/lib/intl/useSafeTranslations";
import {swrFetcher} from "@/lib/function";
import {usePathname} from "next/navigation";



interface alloyForm {
    idx: number;
    title: string;
    subtitle: string;
    thumbnail: string;
    content: string;
    type: string;
    firstSrc: string;
}

interface alloyAllTitle {
    allTitle: string[];
}

export default function AlloyIntroduction() {
    const t = useSafeTranslations("ni_alloy");
    const [selectedAlloy, setSelectedAlloy] = useState<string>();

    const pathname = usePathname();
    // 현재 언어(locale) 추출
    const currentLocale = useMemo(() => pathname?.split('/')[1], [pathname]);

    const [alloys, setAlloys] = useState<alloyForm[]>([]);
    const [allTitle, setAllTitle] = useState<string[]>([]);

    useEffect(() => {
        if (!currentLocale) return;
        async function fetchData() {
            try {
                const alloy_res = await swrFetcher(`/${currentLocale}/api/alloy/list?size=300&language=${currentLocale}`);
                setAlloys(alloy_res.contents ?? []);

                // contents 안의 title 값만 배열로 추출
                const titlesFromAlloys = (alloy_res.contents ?? []).map(
                    (item: alloyForm) => item.title
                );

                // 서버에서 내려온 allTitle + contents 의 title 을 합치기 (중복 제거 포함)
                const mergedTitles = Array.from(new Set([...(alloy_res.allTitle ?? []), ...titlesFromAlloys]));

                setAllTitle(mergedTitles)
                setSelectedAlloy(mergedTitles[0])
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [currentLocale]);


    return (
        <>
            <PageHeroAuto backgroundImage="/pageHero/powder.png" />
            <main className="max-w-6xl mx-auto my-0 mb-30 px-8 bg-white rounded  space-y-10">
                <header className="text-center space-y-4">

                </header>

                <section className="w-full py-10">
                    <div className="flex flex-wrap w-full justify-center text-sm font-bold text-[#234F3F]">Overview
                    </div>
                    <div className="flex flex-wrap w-full justify-center text-3xl font-bold text-black my-2">Ni Alloy
                    </div>
                    <div className="flex flex-wrap w-full justify-center text-base text-gray-500">
                        {t('니켈 기반 합금 분말은 극한의 고온 환경에서도 안정적인 기계적 강도와 우수한 내식·내산 화성을 제공하여')}
                    </div>
                    <div className="flex flex-wrap w-full justify-center text-base text-gray-500">
                        {t('고부하 조건에서의 신뢰성을 보장합니다. 이러한 특성에 따라 다양한 첨단 산업에서의 핵심 소재로 폭 넓게 사용되고 있습니다.')}
                    </div>
                    <div className="flex flex-wrap w-full justify-center text-base text-gray-500">
                        {t("갓테크에서 제공하는 'GT Metal Powder'는 합금 설게를 통해서 최적의 공정을 거쳐 제작된 AM에 적합한 수요 맞춤형 소재입니다.")}
                    </div>
                </section>

                {/* 탭 버튼 */}

                <nav className="flex flex-wrap justify-center gap-4 mb-16">
                    {allTitle.map((key) => {
                        const isActive = selectedAlloy === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setSelectedAlloy(key)}
                                type="button"
                                className={`px-6 py-3 text-lg font-semibold rounded-full   shadow-sm cursor-pointer
                                ${isActive
                                    ? 'bg-gradient-to-r from-[#234F3F] to-green-600 text-white shadow-md ring-2 ring-green-300 scale-[1.03]'
                                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-green-50 hover:border-green-400 hover:shadow-md'
                                }`}
                            >
                                {key}
                            </button>
                        );
                    })}
                </nav>

                {/*
                <nav className="flex  mb-6  border-b border-gray-300">
                    {(['939', '230', '718', '625'] as const).map((key) => {
                        const isActive = selectedAlloy === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setSelectedAlloy(key)}
                                type="button"
                                className={`px-4 py-1 text-xl font-medium transition
                                ${isActive
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                GT {key}
                            </button>
                        );
                    })}
                </nav>
                */}


                {/* 선택된 합금 정보 */}
                {alloys.length > 0 && alloys.some((data) => data.title === selectedAlloy) ? (
                    alloys
                    .filter((data) => data.title === selectedAlloy) // 선택된 탭만 필터링
                    .map((data) => (
                        <React.Fragment key={data.title}>
                            <section className="grid md:grid-cols-2 h-82 gap-0 items-center mb-20">
                                <div
                                    className="relative flex justify-center items-center h-80 max-h-80 rounded-md sm:max-w-full overflow-hidden">
                                    <Image
                                        loader={() => data.firstSrc}
                                        src={data.firstSrc}
                                        alt={data.title}
                                        fill
                                        className="object-contain rounded-md"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="justify-start item-start h-full">
                                    <h2 className="text-2xl font-bold text-[#234F3F] mb-7">{t(data.title)}</h2>
                                    <p
                                        className="text-base font-semibold mb-21"
                                        dangerouslySetInnerHTML={{
                                            __html: t(data.subtitle).replace(/\n/g, '<br/>')
                                        }}
                                    ></p>
                                    <p className="text-sm font-bold text-gray-400 mb-0">{t(data.type)}</p>
                                </div>
                            </section>

                            <section
                                className="gap-0 justify-center items-center pl-18 pr-18 mb-30 relative flex flex-col">
                                <p
                                    className="text-base mb-21"
                                    dangerouslySetInnerHTML={{__html: t(data.content) }}
                                ></p>
                            </section>
                        </React.Fragment>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-10">
                        {t('선택된 합금 정보가 없습니다.')}
                    </div>
                )}

            </main>
        </>
    );
}
